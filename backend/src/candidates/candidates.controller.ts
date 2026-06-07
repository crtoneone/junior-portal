import { Controller, Get, Patch, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { UpdateCandidateProfileDto } from './dto/update-candidate.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('candidates')
export class CandidatesController {
  constructor(private candidatesService: CandidatesService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async getProfile(@CurrentUser('sub') userId: string) {
    return this.candidatesService.getProfile(userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async updateProfile(
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateCandidateProfileDto,
  ) {
    return this.candidatesService.updateProfile(userId, dto);
  }

  @Post('cv/save')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async saveCv(@CurrentUser('sub') userId: string, @Body('cvData') cvData: any) {
    return this.candidatesService.saveCv(userId, cvData);
  }

  @Get('cv')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async getSavedCvs(@CurrentUser('sub') userId: string) {
    return this.candidatesService.getSavedCvs(userId);
  }

  @Post('saved-jobs/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async toggleSaveJob(
    @CurrentUser('sub') userId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.candidatesService.toggleSaveJob(userId, jobId);
  }

  @Get('saved-jobs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async getSavedJobs(@CurrentUser('sub') userId: string) {
    return this.candidatesService.getSavedJobs(userId);
  }

  @Get('recommended')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async getRecommended(@CurrentUser('sub') userId: string) {
    return this.candidatesService.getRecommendedJobs(userId);
  }

  @Get('match/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CANDIDATE')
  async getMatch(
    @CurrentUser('sub') userId: string,
    @Param('jobId') jobId: string,
  ) {
    return this.candidatesService.getMatchForJob(userId, jobId);
  }
}
