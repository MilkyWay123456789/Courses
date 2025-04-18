import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from './permission.schema';
import { Role } from '../role/role.schema';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name) private PermissionModel: Model<Permission>,
    @InjectModel(Role.name) private RoleModel: Model<Role>,
) {}

//Get danh sách theo group
async findByGroupId(groupId: string): Promise<Permission[]> {
  return this.PermissionModel.find({ groupId }).exec();
}

  
  // Tạo Permission mới
  async createMany(permissions: CreatePermissionDto[]): Promise<any> {
    return this.PermissionModel.insertMany(permissions);
}

  // Xóa Permission
  async remove(roleid: string): Promise<void> {
    await this.PermissionModel.deleteMany({ groupId: roleid }).exec();
  }
}
