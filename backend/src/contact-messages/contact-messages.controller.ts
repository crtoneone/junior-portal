import { Controller, Post, Body } from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';

@Controller('contact-messages')
export class ContactMessagesController {
  constructor(private service: ContactMessagesService) {}

  @Post()
  async create(@Body() dto: CreateContactMessageDto) {
    return this.service.create(dto);
  }
}
