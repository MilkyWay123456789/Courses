// src/users/users.service.ts
import { Injectable, Inject, NotFoundException, BadRequestException  } from '@nestjs/common';
import {CACHE_MANAGER} from '@nestjs/cache-manager'; 
import { Cache } from 'cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import * as bcrypt from 'bcrypt';
import { User } from './user.type';

@Injectable()
export class UsersService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel('User') private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new this.userModel(dto);
    return user.save();
  }

  //Hàm get all user và phân trang
  async findAll(page = 1, limit = 10, keyword?: string): Promise<{ data: User[]; total: number }> {
    const skip = (page - 1) * limit;
    const key = `users:${page}:${limit}:${keyword ?? ''}`;

    // 🔍 Kiểm tra cache
    const cached = await this.cacheManager.get<{ data: User[]; total: number }>(key);
    if (cached) {
      console.log('🧠 Cache hit:', key);
      return cached;
    }

    console.log('🚀 Cache miss:', key);

    // 🔍 Query DB
    const filter = keyword
      ? {
          $or: [
            { email: { $regex: keyword, $options: 'i' } },
            { name: { $regex: keyword, $options: 'i' } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);

    const result = { data, total };

    // 💾 Lưu vào Redis
    await this.cacheManager.set(key, result, 60); // TTL = 60s

    return result;
  }
   

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  //Hàm update user
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, ...updateData } = updateUserDto;
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }
  // Xóa user
  async remove(id: string): Promise<void> {
    //Xoá user theo id
    await this.userModel.findByIdAndDelete(id).exec();
  }

  //Hàm change password
  async changePassword(dto: ChangePasswordDto) {
    const user = await this.userModel.findById(dto.id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }
}
