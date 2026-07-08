import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateGuestApplicationDto } from './dto/create-guest-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async apply(@Body() dto: CreateApplicationDto, @CurrentUser('sub') userId: string) {
    return this.applicationsService.apply(dto, userId);
  }

  @Post('guest')
  async guestApply(@Body() dto: CreateGuestApplicationDto) {
    return this.applicationsService.guestApply(dto);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async getMyApplications(@CurrentUser('sub') userId: string) {
    return this.applicationsService.findByCandidate(userId);
  }

  @Get('my/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async getMyStats(@CurrentUser('sub') userId: string) {
    return this.applicationsService.getCandidateStats(userId);
  }

  @Get('job/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYER')
  async getJobApplications(
    @Param('jobId') jobId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.applicationsService.findByJob(jobId, userId);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYER')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateApplicationStatusDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.applicationsService.updateStatus(id, dto, userId);
  }
}
