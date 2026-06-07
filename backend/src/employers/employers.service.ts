import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UpdateEmployerProfileDto } from './dto/update-employer.dto';

@Injectable()
export class EmployersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.employerProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true },
        },
      },
    });

    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(userId: string, dto: UpdateEmployerProfileDto) {
    return this.prisma.employerProfile.update({
      where: { userId },
      data: dto,
    });
  }

  async getPublicProfile(employerId: string) {
    const profile = await this.prisma.employerProfile.findUnique({
      where: { id: employerId },
      include: {
        jobs: {
          where: { status: 'ACTIVE' },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!profile) throw new NotFoundException('Employer not found');
    return profile;
  }
}
