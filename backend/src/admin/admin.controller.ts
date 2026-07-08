import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboardStats();
  }

  @Get('users')
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
    @Query('role') role?: string,
  ) {
    return this.adminService.getUsers(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
      search,
      role,
    );
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.adminService.getUser(id);
  }

  @Patch('users/:id/role')
  async updateUserRole(@Param('id') id: string, @Body('role') role: string) {
    return this.adminService.updateUserRole(id, role);
  }

  @Patch('users/:id/toggle-active')
  async toggleUserActive(@Param('id') id: string) {
    return this.adminService.toggleUserActive(id);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(id);
  }

  @Post('verify-employer/:userId')
  async verifyEmployer(@Param('userId') userId: string) {
    return this.adminService.verifyEmployer(userId);
  }

  @Post('unverify-employer/:userId')
  async unverifyEmployer(@Param('userId') userId: string) {
    return this.adminService.unverifyEmployer(userId);
  }

  @Get('jobs')
  async getJobs(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.adminService.getJobs(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
      status,
      search,
    );
  }

  @Get('jobs/:id')
  async getJob(@Param('id') id: string) {
    return this.adminService.getJob(id);
  }

  @Patch('jobs/:id/status')
  async updateJobStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.adminService.updateJobStatus(id, status);
  }

  @Delete('jobs/:id')
  async deleteJob(@Param('id') id: string) {
    return this.adminService.deleteJob(id);
  }

  @Get('skills')
  async getSkills() {
    return this.adminService.getSkills();
  }

  @Post('skills')
  async createSkill(@Body('name') name: string, @Body('category') category?: string) {
    return this.adminService.createSkill(name, category);
  }

  @Patch('skills/:id')
  async updateSkill(@Param('id') id: string, @Body('name') name?: string, @Body('category') category?: string) {
    return this.adminService.updateSkill(id, name, category);
  }

  @Delete('skills/:id')
  async deleteSkill(@Param('id') id: string) {
    return this.adminService.deleteSkill(id);
  }

  @Get('contact-messages')
  async getContactMessages(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    return this.adminService.getContactMessages(
      page ? parseInt(page) : 1,
      limit ? parseInt(limit) : 20,
      status,
    );
  }

  @Get('contact-messages/stats')
  async getContactMessageStats() {
    return this.adminService.getContactMessageStats();
  }

  @Get('contact-messages/:id')
  async getContactMessage(@Param('id') id: string) {
    return this.adminService.getContactMessage(id);
  }

  @Patch('contact-messages/:id/read')
  async markContactMessageRead(@Param('id') id: string) {
    return this.adminService.markContactMessageRead(id);
  }

  @Post('contact-messages/:id/reply')
  async replyContactMessage(@Param('id') id: string, @Body('reply') reply: string) {
    return this.adminService.replyContactMessage(id, reply);
  }
}
