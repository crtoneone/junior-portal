import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SavedSearchesService } from './saved-searches.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('saved-searches')
export class SavedSearchesController {
  constructor(private savedSearchesService: SavedSearchesService) {}

  @Post()
  async create(@Body() body: any) {
    return this.savedSearchesService.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMy(@CurrentUser('sub') userId: string) {
    return this.savedSearchesService.findByUser(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @CurrentUser('sub') userId: string) {
    return this.savedSearchesService.delete(id, userId);
  }
}
