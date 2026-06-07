import { Controller, Get, Patch, Post, Body, Param, UseGuards } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { UpdateEmployerProfileDto } from './dto/update-employer.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('employers')
export class EmployersController {
  constructor(private employersService: EmployersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYER')
  async getProfile(@CurrentUser('sub') userId: string) {
    return this.employersService.getProfile(userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYER')
  async updateProfile(
    @CurrentUser('sub') userId: string,
    @Body() dto: UpdateEmployerProfileDto,
  ) {
    return this.employersService.updateProfile(userId, dto);
  }

  @Get('public/:id')
  async getPublicProfile(@Param('id') id: string) {
    return this.employersService.getPublicProfile(id);
  }
}
