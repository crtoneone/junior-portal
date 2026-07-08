import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshTokens(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@CurrentUser('sub') userId: string) {
    return this.authService.getProfile(userId);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  @Get('google')
  async googleAuth(@Req() _req: Request, @Res() res: Response) {
    const url = await this.authService.getGoogleAuthUrl();
    return res.redirect(url);
  }

  @Get('google/callback')
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string | undefined;
    const result = await this.authService.handleGoogleCallback(code || '');
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/social?token=${result.accessToken}&refreshToken=${result.refreshToken}`);
  }

  @Get('linkedin')
  async linkedinAuth(@Req() _req: Request, @Res() res: Response) {
    const url = await this.authService.getLinkedinAuthUrl();
    return res.redirect(url);
  }

  @Get('linkedin/callback')
  async linkedinCallback(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string | undefined;
    const result = await this.authService.handleLinkedinCallback(code || '');
    return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/social?token=${result.accessToken}&refreshToken=${result.refreshToken}`);
  }
}
