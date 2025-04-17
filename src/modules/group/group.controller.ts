import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { Group } from './group.schema';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupsService: GroupService) {}

  @Get("Getgroup")
  async findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @Get('GetgroupByID/:id')
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @Post("Addgroup")
  async create(@Body() CreateGroupDto: CreateGroupDto) {
    return this.groupsService.create(CreateGroupDto);
  }

  @Put('Updategroup/:id')
  async update(
    @Param('id') id: string,
    @Body() CreateGroupDto: CreateGroupDto,
  ) {
    return this.groupsService.update(id, CreateGroupDto);
  }

  @Delete('Deletegroup/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.groupsService.remove(id);
  }
}
