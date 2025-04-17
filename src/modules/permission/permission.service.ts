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

  // Lấy Permission theo role
  async findByGroupId(groupId: string): Promise<{ roles: Role[] }> {
    // Tìm tất cả các permission liên quan đến groupId
    const permissions = await this.PermissionModel.find({ groupId }).exec();
  
    // Lấy tất cả các roleId từ permission
    const roleIds = permissions.map(permission => permission.roleId);
  
    // Tìm tất cả các role dựa trên các roleId tìm được
    const roles = await this.RoleModel.find({ _id: { $in: roleIds } }).exec();
  
    return {
      roles, // Trả về danh sách các role
    };
  }
  
  
  
  // Tạo Permission mới
  async create(CreatePermissionDto: CreatePermissionDto): Promise<Permission> {
    const createdPermission = new this.PermissionModel(CreatePermissionDto);
    return createdPermission.save();
  }

  // Xóa Permission
  async remove(roleid: string): Promise<void> {
    await this.PermissionModel.findByIdAndDelete(roleid).exec();
  }
}
