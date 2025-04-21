// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(dto: CreateUserDto): Promise<User> {
    const user = new this.userModel(dto);
    return user.save();
  }

  //Hàm get all user và phân trang
  async findAll(
    page: number = 1,
    limit: number = 10,
    keyword?: string
  ): Promise<{ data: User[]; total: number }> {
    const skip = (page - 1) * limit;
  
    const filter = keyword
      ? {
          $or: [
            { email: { $regex: keyword, $options: 'i' } },
            { name: { $regex: keyword, $options: 'i' } }, // Nếu schema có field name
          ],
        }
      : {};
  
    const [data, total] = await Promise.all([
      this.userModel.find(filter).skip(skip).limit(limit).exec(),
      this.userModel.countDocuments(filter).exec(),
    ]);
  
    return { data, total };
  }
   

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}
