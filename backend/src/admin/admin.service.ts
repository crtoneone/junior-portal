import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ContactMessagesService } from '../contact-messages/contact-messages.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private contactMessagesService: ContactMessagesService,
    private notificationsService: NotificationsService,
  ) {}

  async getDashboardStats() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalUsers, totalCandidates, totalEmployers, totalAdmins,
      totalJobs, activeJobs, closedJobs,
      totalApplications, pendingApplications,
      usersLast30, jobsLast30, applicationsLast30,
      usersLast7, jobsLast7,
      unreadMessages,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'CANDIDATE' } }),
      this.prisma.user.count({ where: { role: 'EMPLOYER' } }),
      this.prisma.user.count({ where: { role: 'ADMIN' } }),
      this.prisma.job.count(),
      this.prisma.job.count({ where: { status: 'ACTIVE' } }),
      this.prisma.job.count({ where: { status: 'CLOSED' } }),
      this.prisma.application.count(),
      this.prisma.application.count({ where: { status: 'PENDING' } }),
      this.prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      this.prisma.job.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      this.prisma.application.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      this.prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      this.prisma.job.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      this.prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
    ]);

    return {
      totalUsers, totalCandidates, totalEmployers, totalAdmins,
      totalJobs, activeJobs, closedJobs,
      totalApplications, pendingApplications,
      usersLast30, jobsLast30, applicationsLast30,
      usersLast7, jobsLast7,
      unreadMessages,
    };
  }

  async getUsers(page = 1, limit = 20, search?: string, role?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
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
          isActive: true,
          createdAt: true,
          _count: {
            select: {
              applications: true,
              notifications: true,
            },
          },
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { users, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isVerified: true,
        isActive: true,
        avatarUrl: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        candidateProfile: true,
        employerProfile: true,
        _count: {
          select: {
            applications: true,
            notifications: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUserRole(id: string, role: string) {
    const validRoles = ['CANDIDATE', 'EMPLOYER', 'ADMIN'];
    if (!validRoles.includes(role)) throw new NotFoundException('Invalid role');
    return this.prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, email: true, role: true },
    });
  }

  async toggleUserActive(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      where: { id },
      data: { isActive: !user.isActive },
      select: { id: true, email: true, isActive: true },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    if (user.role === 'ADMIN') throw new NotFoundException('Cannot delete admin');
    await this.prisma.user.delete({ where: { id } });
    return { deleted: true };
  }

  async verifyEmployer(userId: string) {
    const profile = await this.prisma.employerProfile.update({
      where: { userId },
      data: { isVerified: true },
    });

    await this.notificationsService.create({
      userId,
      title: 'Profil overený',
      message: 'Tvoj zamestnávateľský profil bol overený administrátorom.',
      type: 'success',
      link: '/dashboard/employer/profile',
    });

    return profile;
  }

  async unverifyEmployer(userId: string) {
    const profile = await this.prisma.employerProfile.update({
      where: { userId },
      data: { isVerified: false },
    });

    await this.notificationsService.create({
      userId,
      title: 'Overenie zrušené',
      message: 'Overenie tvojho zamestnávateľského profilu bolo zrušené.',
      type: 'warning',
      link: '/dashboard/employer/profile',
    });

    return profile;
  }

  async getJobs(page = 1, limit = 20, status?: string, search?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
      ];
    }

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          employer: {
            select: {
              companyName: true,
              user: { select: { email: true } },
            },
          },
          _count: { select: { applications: true } },
        },
      }),
      this.prisma.job.count({ where }),
    ]);

    return { jobs, total, page, totalPages: Math.ceil(total / limit) };
  }

  async getJob(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        employer: {
          select: {
            companyName: true,
            companyLogo: true,
            companySize: true,
            industry: true,
            location: true,
            website: true,
            isVerified: true,
            user: { select: { email: true, firstName: true, lastName: true } },
          },
        },
        applications: {
          include: {
            user: { select: { id: true, firstName: true, lastName: true, email: true } },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async updateJobStatus(id: string, status: string) {
    const validStatuses = ['ACTIVE', 'CLOSED', 'DRAFT'];
    if (!validStatuses.includes(status)) throw new NotFoundException('Invalid status');
    return this.prisma.job.update({
      where: { id },
      data: { status },
    });
  }

  async deleteJob(id: string) {
    await this.prisma.job.delete({ where: { id } });
    return { deleted: true };
  }

  async getSkills() {
    return this.prisma.skill.findMany({ orderBy: { name: 'asc' } });
  }

  async createSkill(name: string, category?: string) {
    const existing = await this.prisma.skill.findUnique({ where: { name } });
    if (existing) throw new ConflictException('Skill already exists');
    return this.prisma.skill.create({ data: { name, category } });
  }

  async updateSkill(id: string, name?: string, category?: string) {
    const data: any = {};
    if (name) data.name = name;
    if (category !== undefined) data.category = category;
    return this.prisma.skill.update({ where: { id }, data });
  }

  async deleteSkill(id: string) {
    await this.prisma.skill.delete({ where: { id } });
    return { deleted: true };
  }

  async getContactMessages(page = 1, limit = 20, status?: string) {
    return this.contactMessagesService.findAll(page, limit, status);
  }

  async getContactMessageStats() {
    return this.contactMessagesService.getStats();
  }

  async getContactMessage(id: string) {
    return this.contactMessagesService.findOne(id);
  }

  async markContactMessageRead(id: string) {
    return this.contactMessagesService.markAsRead(id);
  }

  async replyContactMessage(id: string, reply: string) {
    return this.contactMessagesService.reply(id, reply);
  }
}
