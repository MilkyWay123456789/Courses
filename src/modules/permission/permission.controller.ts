import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionsService: PermissionService) {}


  @Get('GetPermissionByGroupId/:groupId')
    async findByGroupId(@Param('groupId') groupId: string) {
        return this.permissionsService.findByGroupId(groupId);
    }
  //Update permission
  @Put('UpdatePermissions/:roleid')
  async updatePermissions(
    @Param('roleid') roleid: string,
    @Body() body: CreatePermissionDto[],
  ): Promise<any> {
    // Xóa quyền cũ theo roleId
    await this.permissionsService.remove(roleid);
  
    // Thêm danh sách quyền mới
    return this.permissionsService.createMany(body);
  }  

}
