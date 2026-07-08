import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Injectable()
export class ContactMessagesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContactMessageDto) {
    return this.prisma.contactMessage.create({
      data: {
        name: dto.name,
        email: dto.email,
        subject: dto.subject,
        message: dto.message,
      },
    });
  }

  async findAll(page = 1, limit = 20, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (status) where.status = status;

    const [messages, total] = await Promise.all([
      this.prisma.contactMessage.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.contactMessage.count({ where }),
    ]);

    return { messages, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: string) {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }

  async markAsRead(id: string) {
    const message = await this.findOne(id);
    if (message.status === 'UNREAD') {
      return this.prisma.contactMessage.update({
        where: { id },
        data: { status: 'READ' },
      });
    }
    return message;
  }

  async reply(id: string, reply: string) {
    await this.findOne(id);
    return this.prisma.contactMessage.update({
      where: { id },
      data: { reply, status: 'REPLIED', repliedAt: new Date() },
    });
  }

  async getStats() {
    const [unread, total] = await Promise.all([
      this.prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
      this.prisma.contactMessage.count(),
    ]);
    return { unread, total };
  }
}
