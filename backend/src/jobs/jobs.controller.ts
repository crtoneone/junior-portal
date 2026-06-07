import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('jobs')
export class JobsController {
  constructor(private jobsService: JobsService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('type') type?: string,
    @Query('isRemote') isRemote?: string,
    @Query('location') location?: string,
    @Query('skills') skills?: string,
    @Query('minSalary') minSalary?: string,
    @Query('maxSalary') maxSalary?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.jobsService.findAll({
      search,
      type,
      isRemote: isRemote === 'true' ? true : isRemote === 'false' ? false : undefined,
      location,
      skills: skills?.split(','),
      minSalary: minSalary ? parseInt(minSalary) : undefined,
      maxSalary: maxSalary ? parseInt(maxSalary) : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.jobsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYER')
  async create(@Body() dto: CreateJobDto, @CurrentUser('sub') userId: string) {
    return this.jobsService.create(dto, userId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateJobDto,
    @CurrentUser('sub') userId: string,
  ) {
    return this.jobsService.update(id, dto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @CurrentUser('sub') userId: string) {
    return this.jobsService.delete(id, userId);
  }

  @Get('employer/mine')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYER')
  async getMyJobs(@CurrentUser('sub') userId: string) {
    return this.jobsService.findByEmployer(userId);
  }

  @Get('employer/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYER')
  async getStats(@CurrentUser('sub') userId: string) {
    return this.jobsService.getStats(userId);
  }
}
