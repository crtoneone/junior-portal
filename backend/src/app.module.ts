import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma.module';
import { GlobalJwtModule } from './common/global-jwt.module';
import { EmailModule } from './common/email.module';
import { HealthController } from './common/health.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';
import { CandidatesModule } from './candidates/candidates.module';
import { EmployersModule } from './employers/employers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { ContactMessagesModule } from './contact-messages/contact-messages.module';
import { SkillsModule } from './skills/skills.module';
import { SavedSearchesModule } from './saved-searches/saved-searches.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    GlobalJwtModule,
    EmailModule,
    AuthModule,
    UsersModule,
    JobsModule,
    ApplicationsModule,
    CandidatesModule,
    EmployersModule,
    NotificationsModule,
    AdminModule,
    ContactMessagesModule,
    SkillsModule,
    SavedSearchesModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
