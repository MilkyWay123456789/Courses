import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get("GetRole")
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get('GetRoleByID/:id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Post("AddRole")
  async create(@Body() CreateRoleDto: CreateRoleDto) {
    return this.rolesService.create(CreateRoleDto);
  }

  @Put('UpdateRole/:id')
  async update(
    @Param('id') id: string,
    @Body() CreateRoleDto: CreateRoleDto,
  ) {
    return this.rolesService.update(id, CreateRoleDto);
  }

  @Delete('DeleteRole/:id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(id);
  }
}
