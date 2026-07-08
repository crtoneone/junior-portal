import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { UpdateCandidateProfileDto } from './dto/update-candidate.dto';

function parseProfile(profile: any) {
  if (!profile) return profile;
  if (typeof profile.skills === 'string') {
    try { profile.skills = JSON.parse(profile.skills); } catch { profile.skills = []; }
  }
  return profile;
}

@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.candidateProfile.findUnique({
      where: { userId },
      include: { user: { select: { id: true, email: true, firstName: true, lastName: true, avatarUrl: true } } },
    });

    if (!profile) throw new NotFoundException('Profile not found');
    return parseProfile(profile);
  }

  async updateProfile(userId: string, dto: UpdateCandidateProfileDto) {
    const data: any = { ...dto };
    if (data.skills !== undefined) {
      data.skills = JSON.stringify(data.skills);
    }

    const profile = await this.prisma.candidateProfile.update({
      where: { userId },
      data,
    });

    return parseProfile(profile);
  }

  async saveCv(userId: string, cvData: any) {
    const profile = await this.prisma.candidateProfile.findUnique({
      where: { userId },
    });

    if (!profile) throw new NotFoundException('Profile not found');

    return this.prisma.savedCv.create({
      data: {
        candidateId: profile.id,
        cvData: typeof cvData === 'string' ? cvData : JSON.stringify(cvData),
        isDefault: true,
      },
    });
  }

  async getSavedCvs(userId: string) {
    const profile = await this.prisma.candidateProfile.findUnique({
      where: { userId },
    });

    if (!profile) return [];

    return this.prisma.savedCv.findMany({
      where: { candidateId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateCv(cvId: string, userId: string, cvData: any) {
    const profile = await this.prisma.candidateProfile.findUnique({
      where: { userId },
    });

    if (!profile) throw new NotFoundException('Profile not found');

    const existing = await this.prisma.savedCv.findFirst({
      where: { id: cvId, candidateId: profile.id },
    });

    if (!existing) throw new NotFoundException('CV not found');

    return this.prisma.savedCv.update({
      where: { id: cvId },
      data: {
        cvData: typeof cvData === 'string' ? cvData : JSON.stringify(cvData),
      },
    });
  }

  async deleteCv(cvId: string, userId: string) {
    const profile = await this.prisma.candidateProfile.findUnique({
      where: { userId },
    });

    if (!profile) throw new NotFoundException('Profile not found');

    const existing = await this.prisma.savedCv.findFirst({
      where: { id: cvId, candidateId: profile.id },
    });

    if (!existing) throw new NotFoundException('CV not found');

    await this.prisma.savedCv.delete({ where: { id: cvId } });
    return { deleted: true };
  }

  async toggleSaveJob(userId: string, jobId: string) {
    const existing = await this.prisma.savedJob.findUnique({
      where: { userId_jobId: { userId, jobId } },
    });

    if (existing) {
      await this.prisma.savedJob.delete({ where: { id: existing.id } });
      return { saved: false };
    }

    await this.prisma.savedJob.create({ data: { userId, jobId } });
    return { saved: true };
  }

  async getSavedJobs(userId: string) {
    return this.prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: {
            employer: {
              select: { companyName: true, companyLogo: true, location: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRecommendedJobs(userId: string) {
    const profile = await this.prisma.candidateProfile.findUnique({
      where: { userId },
    });

    if (!profile || !profile.skills) {
      return this.prisma.job.findMany({
        where: { status: 'ACTIVE' },
        include: { employer: { select: { companyName: true, companyLogo: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      });
    }

    const candidateSkills: string[] = typeof profile.skills === 'string'
      ? JSON.parse(profile.skills)
      : profile.skills || [];

    const jobs = await this.prisma.job.findMany({
      where: { status: 'ACTIVE' },
      include: {
        employer: { select: { companyName: true, companyLogo: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return jobs
      .map((job) => {
        const jobSkills = this.parseSkills(job.skills);
        const match = this.calculateMatch(candidateSkills, jobSkills, profile.experience || 0, job.minSalary, job.maxSalary);
        return { ...job, matchScore: match.score, matchDetails: match.details };
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }

  async getMatchForJob(userId: string, jobId: string) {
    const [profile, job] = await Promise.all([
      this.prisma.candidateProfile.findUnique({ where: { userId } }),
      this.prisma.job.findUnique({ where: { id: jobId } }),
    ]);

    if (!profile || !job) {
      return { score: 0, details: { skillMatch: 0, experienceMatch: 0, salaryFit: 0 } };
    }

    const candidateSkills: string[] = typeof profile.skills === 'string'
      ? JSON.parse(profile.skills)
      : profile.skills || [];

    const jobSkills = this.parseSkills(job.skills);
    return this.calculateMatch(candidateSkills, jobSkills, profile.experience || 0, job.minSalary, job.maxSalary);
  }

  private parseSkills(skills: any): string[] {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
      try { return JSON.parse(skills); } catch { return skills.split(',').map(s => s.trim()).filter(Boolean); }
    }
    return [];
  }

  private calculateMatch(
    candidateSkills: string[],
    jobSkills: string[],
    candidateExperience: number,
    jobMinSalary?: number | null,
    jobMaxSalary?: number | null,
  ) {
    const normalizedCandidate = candidateSkills.map((s) => s.toLowerCase().trim());
    const normalizedJob = jobSkills.map((s) => s.toLowerCase().trim());

    const matched = normalizedJob.filter((js) =>
      normalizedCandidate.some((cs) => cs === js || cs.includes(js) || js.includes(cs)),
    );
    const skillMatch = normalizedJob.length > 0 ? matched.length / normalizedJob.length : 0;

    const idealExperience = 2;
    let experienceMatch = 1;
    if (candidateExperience < 1) {
      experienceMatch = 0.8;
    } else if (candidateExperience <= idealExperience) {
      experienceMatch = 1;
    } else {
      experienceMatch = Math.max(0.5, 1 - (candidateExperience - idealExperience) * 0.1);
    }

    const score = Math.round(skillMatch * 0.7 * 100 + experienceMatch * 0.3 * 100);

    return {
      score: Math.min(100, score),
      details: {
        skillMatch: Math.round(skillMatch * 100),
        matchedSkills: matched,
        missingSkills: normalizedJob.filter((js) => !matched.includes(js)),
        experienceMatch: Math.round(experienceMatch * 100),
      },
    };
  }
}
