import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './group.schema';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  // Lấy tất cả groups
  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  // Lấy group theo id
  async findOne(id: string): Promise<Group> {
    const group = await this.groupModel.findById(id).exec();
    
    if (!group) {
      throw new Error('group not found'); 
    }
  
    return group;
  }
  

  // Tạo group mới
  async create(CreateGroupDto: CreateGroupDto): Promise<Group> {
    const createdgroup = new this.groupModel(CreateGroupDto);
    return createdgroup.save();
  }

  // Cập nhật group
async update(id: string, CreateGroupDto: CreateGroupDto): Promise<Group> {
    const updatedgroup = await this.groupModel.findByIdAndUpdate(id, CreateGroupDto, { new: true }).exec();
    
    if (!updatedgroup) {
      throw new Error('group not found');
    }
    
    return updatedgroup;
  }
  
  
  // Xóa group
  async remove(id: string): Promise<void> {
    await this.groupModel.findByIdAndDelete(id).exec();
  }
}
