import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-status.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ApplicationsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async apply(dto: CreateApplicationDto, userId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
      include: { employer: true },
    });

    if (!job) throw new NotFoundException('Job not found');
    if (job.status !== 'ACTIVE') throw new NotFoundException('Job is no longer active');

    const existing = await this.prisma.application.findUnique({
      where: { userId_jobId: { userId, jobId: dto.jobId } },
    });

    if (existing) {
      throw new ConflictException('You have already applied to this job');
    }

    const application = await this.prisma.application.create({
      data: {
        userId,
        jobId: dto.jobId,
        coverLetter: dto.coverLetter,
        cvUrl: dto.cvUrl,
        answers: dto.answers ? JSON.stringify(dto.answers) : undefined,
      },
      include: {
        job: {
          select: { title: true, employer: { select: { companyName: true, userId: true } } },
        },
      },
    });

    await this.notificationsService.create({
      userId,
      title: 'Prihláška odoslaná',
      message: `Tvoja prihláška na pozíciu "${job.title}" bola úspešne odoslaná.`,
      type: 'success',
      link: `/jobs/${job.id}`,
    });

    await this.notificationsService.create({
      userId: job.employer.userId,
      title: 'Nová prihláška',
      message: `Niekto sa prihlásil na tvoju pozíciu "${job.title}".`,
      type: 'info',
      link: `/dashboard/employer/jobs/${job.id}/applications`,
    });

    return application;
  }

  async findByCandidate(userId: string) {
    return this.prisma.application.findMany({
      where: { userId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            location: true,
            type: true,
            minSalary: true,
            maxSalary: true,
            skills: true,
            employer: {
              select: { companyName: true, companyLogo: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByJob(jobId: string, userId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { employer: true },
    });

    if (!job) throw new NotFoundException('Job not found');
    if (job.employer.userId !== userId) {
      throw new ForbiddenException('You can only view applications for your own jobs');
    }

    return this.prisma.application.findMany({
      where: { jobId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatarUrl: true,
            candidateProfile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(
    applicationId: string,
    dto: UpdateApplicationStatusDto,
    userId: string,
  ) {
    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: { include: { employer: true } }, user: true },
    });

    if (!application) throw new NotFoundException('Application not found');
    if (application.job.employer.userId !== userId) {
      throw new ForbiddenException('You can only update applications for your own jobs');
    }

    const updated = await this.prisma.application.update({
      where: { id: applicationId },
      data: {
        status: dto.status,
        feedback: dto.feedback,
      },
    });

    const statusMessages: Record<string, string> = {
      REVIEWED: 'Tvoja prihláška sa práve prezerá.',
      ACCEPTED: 'Gratulujeme! Tvoja prihláška bola prijatá.',
      REJECTED: `Tvoja prihláška bola zamietnutá.${dto.feedback ? ` Feedback: ${dto.feedback}` : ''}`,
    };

    if (statusMessages[dto.status]) {
      await this.notificationsService.create({
        userId: application.userId,
        title: `Stav prihlášky: ${dto.status === 'ACCEPTED' ? 'Prijatá' : dto.status === 'REJECTED' ? 'Zamietnutá' : 'Prezerá sa'}`,
        message: statusMessages[dto.status],
        type: dto.status === 'ACCEPTED' ? 'success' : dto.status === 'REJECTED' ? 'error' : 'info',
        link: `/dashboard/candidate`,
      });
    }

    return updated;
  }

  async getCandidateStats(userId: string) {
    const [total, reviewed, accepted, rejected] = await Promise.all([
      this.prisma.application.count({ where: { userId } }),
      this.prisma.application.count({ where: { userId, status: 'REVIEWED' } }),
      this.prisma.application.count({ where: { userId, status: 'ACCEPTED' } }),
      this.prisma.application.count({ where: { userId, status: 'REJECTED' } }),
    ]);

    return { total, reviewed, accepted, rejected };
  }
}
