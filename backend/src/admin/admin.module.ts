import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ContactMessagesModule } from '../contact-messages/contact-messages.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [ContactMessagesModule, NotificationsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
