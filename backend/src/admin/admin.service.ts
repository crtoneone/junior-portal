import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalUsers, totalCandidates, totalEmployers, totalJobs, totalApplications] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.user.count({ where: { role: 'CANDIDATE' } }),
        this.prisma.user.count({ where: { role: 'EMPLOYER' } }),
        this.prisma.job.count(),
        this.prisma.application.count(),
      ]);

    return {
      totalUsers,
      totalCandidates,
      totalEmployers,
      totalJobs,
      totalApplications,
    };
  }

  async getUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          isVerified: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return { users, total, page, totalPages: Math.ceil(total / limit) };
  }

  async verifyEmployer(userId: string) {
    return this.prisma.employerProfile.update({
      where: { userId },
      data: { isVerified: true },
    });
  }

  async closeJob(jobId: string) {
    return this.prisma.job.update({
      where: { id: jobId },
      data: { status: 'CLOSED' },
    });
  }
}
