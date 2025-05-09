import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from './role.schema';
import { Permission } from '../permission/permission.schema';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>) {}

  // Lấy tất cả roles
  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  // Lấy role theo id
  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    
    if (!role) {
      throw new Error('Role not found'); 
    }
  
    return role;
  }
  

  // Tạo role mới
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  // Cập nhật role
  // roles.service.ts
async update(id: string, createRoleDto: CreateRoleDto): Promise<Role> {
    const updatedRole = await this.roleModel.findByIdAndUpdate(id, createRoleDto, { new: true }).exec();
    
    if (!updatedRole) {
      throw new Error('Role not found');
    }
    
    return updatedRole;
  }
  
  
  // Xóa role
  async remove(id: string): Promise<void> {
    //Xóa permission theo roleId
    await this.permissionModel.deleteMany({ roleId: id }).exec(); 
    //Xóa role
    await this.roleModel.findByIdAndDelete(id).exec();
  }
}
