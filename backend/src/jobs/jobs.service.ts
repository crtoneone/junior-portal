import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

const arrayFields = ['skills', 'requirements', 'responsibilities'] as const;

function serialize(dto: any) {
  const data = { ...dto };
  for (const field of arrayFields) {
    if (data[field] !== undefined) {
      data[field] = JSON.stringify(data[field]);
    }
  }
  return data;
}

function deserialize(job: any) {
  if (!job) return job;
  for (const field of arrayFields) {
    if (typeof job[field] === 'string') {
      try { job[field] = JSON.parse(job[field]); } catch { job[field] = []; }
    }
  }
  return job;
}

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: {
    search?: string;
    type?: string;
    isRemote?: boolean;
    location?: string;
    skills?: string[];
    minSalary?: number;
    maxSalary?: number;
    page?: number;
    limit?: number;
  }) {
    const where: any = {
      status: 'ACTIVE',
    };

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { description: { contains: filters.search } },
      ];
    }

    if (filters.type) where.type = filters.type;
    if (filters.isRemote !== undefined) where.isRemote = filters.isRemote;
    if (filters.location) {
      where.location = { contains: filters.location };
    }
    if (filters.skills?.length) {
      where.skills = {
        contains: filters.skills[0],
      };
    }
    if (filters.minSalary) where.minSalary = { gte: filters.minSalary };
    if (filters.maxSalary) where.maxSalary = { lte: filters.maxSalary };

    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        include: {
          employer: {
            select: {
              companyName: true,
              companyLogo: true,
              location: true,
            },
          },
          _count: {
            select: { applications: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.job.count({ where }),
    ]);

    return {
      jobs: jobs.map(deserialize),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        employer: {
          select: {
            companyName: true,
            companyLogo: true,
            companySize: true,
            industry: true,
            description: true,
            website: true,
            location: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    return deserialize(job);
  }

  async create(dto: CreateJobDto, employerId: string) {
    const employer = await this.prisma.employerProfile.findUnique({
      where: { userId: employerId },
    });

    if (!employer) {
      throw new ForbiddenException('Only employers can create jobs');
    }

    const job = await this.prisma.job.create({
      data: {
        ...serialize(dto),
        employerId: employer.id,
      },
    });

    return deserialize(job);
  }

  async update(id: string, dto: UpdateJobDto, userId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { employer: true },
    });

    if (!job) throw new NotFoundException('Job not found');
    if (job.employer.userId !== userId) {
      throw new ForbiddenException('You can only update your own jobs');
    }

    const updated = await this.prisma.job.update({
      where: { id },
      data: serialize(dto),
    });

    return deserialize(updated);
  }

  async delete(id: string, userId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: { employer: true },
    });

    if (!job) throw new NotFoundException('Job not found');
    if (job.employer.userId !== userId) {
      throw new ForbiddenException('You can only delete your own jobs');
    }

    return this.prisma.job.update({
      where: { id },
      data: { status: 'CLOSED' },
    });
  }

  async findByEmployer(userId: string) {
    const employer = await this.prisma.employerProfile.findUnique({
      where: { userId },
    });

    if (!employer) {
      throw new ForbiddenException('Only employers can view this');
    }

    const jobs = await this.prisma.job.findMany({
      where: { employerId: employer.id },
      include: {
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return jobs.map(deserialize);
  }

  async getStats(userId: string) {
    const employer = await this.prisma.employerProfile.findUnique({
      where: { userId },
    });

    if (!employer) return null;

    const [totalJobs, activeJobs, totalApplications] = await Promise.all([
      this.prisma.job.count({
        where: { employerId: employer.id },
      }),
      this.prisma.job.count({
        where: { employerId: employer.id, status: 'ACTIVE' },
      }),
      this.prisma.application.count({
        where: {
          job: { employerId: employer.id },
        },
      }),
    ]);

    return { totalJobs, activeJobs, totalApplications };
  }
}
