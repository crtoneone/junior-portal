import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../common/prisma.service';
import { EmailService } from '../common/email.service';
import { NotificationsService } from '../notifications/notifications.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    private emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: dto.role,
        phone: dto.phone,
      },
    });

    if (dto.role === 'CANDIDATE') {
      await this.prisma.candidateProfile.create({
        data: { userId: user.id },
      });
    } else if (dto.role === 'EMPLOYER') {
      await this.prisma.employerProfile.create({
        data: {
          userId: user.id,
          companyName: dto.companyName || '',
        },
      });
    }

    await this.notificationsService.create({
      userId: user.id,
      title: 'Vitaj v DajFleku!',
      message: dto.role === 'CANDIDATE'
        ? 'Vitaj! Začni vyplnením svojho profilu a CV, potom sa môžeš hlásiť na ponuky.'
        : 'Vitaj! Vyplň profil svojej firmy a pridaj prvé pracovné ponuky.',
      type: 'info',
      link: dto.role === 'CANDIDATE' ? '/profile' : '/dashboard/employer/profile',
    });

    return this.generateTokens(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account is blocked');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      await this.prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });

      return this.generateTokens(storedToken.user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }

  async getProfile(userId: string) {
    return this.usersService.findById(userId);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: 'Ak email existuje, bol odoslaný resetovací odkaz.' };
    }

    await this.prisma.passwordResetToken.updateMany({
      where: { userId: user.id, usedAt: null },
      data: { usedAt: new Date() },
    });

    const token = this.jwtService.sign(
      { sub: user.id, type: 'password-reset' },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1h' },
    );

    await this.prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000),
      },
    });

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;
    await this.emailService.sendPasswordReset(dto.email, resetLink);

    return { message: 'Ak email existuje, bol odoslaný resetovací odkaz.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const stored = await this.prisma.passwordResetToken.findUnique({
      where: { token: dto.token },
    });

    if (!stored || stored.usedAt || stored.expiresAt < new Date()) {
      throw new BadRequestException('Neplatný alebo expirovaný token');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: stored.userId },
        data: { passwordHash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: stored.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return { message: 'Heslo bolo úspešne zmenené.' };
  }

  async getGoogleAuthUrl() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) throw new BadRequestException('Google login not configured');
    const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/google/callback`;
    return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
  }

  async handleGoogleCallback(code: string) {
    if (!code) throw new BadRequestException('No code provided');
    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      if (!clientId || !clientSecret) throw new Error('Google login not configured');

      const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/google/callback`;
      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok) throw new Error(tokenData.error_description || 'Google auth failed');

      const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profile = await profileRes.json();

      return this.findOrCreateSocialUser(profile.email, profile.given_name || '', profile.family_name || '', profile.name || profile.email.split('@')[0]);
    } catch (err: any) {
      throw new BadRequestException(err.message || 'Google login failed');
    }
  }

  async getLinkedinAuthUrl() {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) throw new BadRequestException('LinkedIn login not configured');
    const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/linkedin/callback`;
    return `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
  }

  async handleLinkedinCallback(code: string) {
    if (!code) throw new BadRequestException('No code provided');
    try {
      const clientId = process.env.LINKEDIN_CLIENT_ID;
      const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
      if (!clientId || !clientSecret) throw new Error('LinkedIn login not configured');

      const redirectUri = `${process.env.BACKEND_URL || 'http://localhost:4000'}/api/auth/linkedin/callback`;
      const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok) throw new Error(tokenData.error_description || 'LinkedIn auth failed');

      const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profile = await profileRes.json();

      return this.findOrCreateSocialUser(profile.email, profile.given_name || '', profile.family_name || '', profile.name || profile.email.split('@')[0]);
    } catch (err: any) {
      throw new BadRequestException(err.message || 'LinkedIn login failed');
    }
  }

  private async findOrCreateSocialUser(email: string, firstName: string, lastName: string, displayName: string) {
    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      const randomPassword = await bcrypt.hash(Math.random().toString(36).slice(2) + Date.now().toString(36), 12);
      user = await this.prisma.user.create({
        data: {
          email,
          passwordHash: randomPassword,
          firstName: firstName || displayName || email.split('@')[0],
          lastName: lastName || '',
          role: 'CANDIDATE',
        },
      });
      await this.prisma.candidateProfile.create({
        data: { userId: user.id },
      });
      await this.notificationsService.create({
        userId: user.id,
        title: 'Vitaj v DajFleku!',
        message: 'Účet bol vytvorený cez sociálnu sieť. Vyplň si profil a začni sa hlásiť na ponuky.',
        type: 'info',
        link: '/profile',
      });
    }

    return this.generateTokens(user);
  }

  private async generateTokens(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt,
      },
    });

    const { passwordHash, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }
}
