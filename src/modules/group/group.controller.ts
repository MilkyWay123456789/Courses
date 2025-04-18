import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.schema';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupsService: GroupService) {}

  @Get('GetGroup')
  async findAll(@Query('keyword') keyword?: string): Promise<Group[]> {
    return this.groupsService.findAll(keyword);
  }

  @Get('GetGroupByID/:id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @Post("AddGroup")
  async create(@Body() CreateGroupDto: CreateGroupDto) {
    return this.groupsService.create(CreateGroupDto);
  }

  @Put('UpdateGroup/:id')
  async update(
    @Param('id') id: string,
    @Body() CreateGroupDto: CreateGroupDto,
  ) {
    return this.groupsService.update(id, CreateGroupDto);
  }

  @Delete('DeleteGroup/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.groupsService.remove(id);
  }
}
