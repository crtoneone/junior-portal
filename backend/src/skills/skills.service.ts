import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async search(query: string) {
    return this.prisma.skill.findMany({
      where: {
        name: { contains: query },
      },
      orderBy: { name: 'asc' },
      take: 20,
    });
  }
}
