import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { EmailService } from '../common/email.service';

@Injectable()
export class SavedSearchesService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async create(data: {
    email: string;
    userId?: string;
    query?: string;
    type?: string;
    isRemote?: boolean;
    location?: string;
    skills?: string;
    minSalary?: number;
    maxSalary?: number;
    frequency?: string;
  }) {
    return this.prisma.savedSearch.create({ data });
  }

  async findByUser(userId: string) {
    return this.prisma.savedSearch.findMany({
      where: { userId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string, userId: string) {
    await this.prisma.savedSearch.updateMany({
      where: { id, userId },
      data: { isActive: false },
    });
    return { deleted: true };
  }

  async processNewJob(job: any) {
    const searches = await this.prisma.savedSearch.findMany({
      where: { isActive: true },
    });

    for (const search of searches) {
      let match = true;

      if (search.query && !job.title.toLowerCase().includes(search.query.toLowerCase()) && !job.description.toLowerCase().includes(search.query.toLowerCase())) {
        match = false;
      }
      if (search.type && job.type !== search.type) match = false;
      if (search.isRemote !== null && search.isRemote !== undefined && job.isRemote !== search.isRemote) match = false;
      if (search.location && !job.location.toLowerCase().includes(search.location.toLowerCase())) match = false;
      if (search.minSalary && (job.minSalary || 0) < search.minSalary) match = false;

      if (match) {
        const link = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/jobs/${job.id}`;
        await this.emailService.sendJobAlert(search.email, [{
          title: job.title,
          company: job.employer?.companyName || '',
          location: job.location,
          link,
        }]);
      }
    }
  }
}
