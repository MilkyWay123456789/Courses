import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CourseService {
  constructor(@InjectModel('Course') private readonly courseModel: Model<any>) {}

  async create(courseDto: any) {
    const newCourse = new this.courseModel(courseDto);
    return await newCourse.save();
  }

  async findAll() {
    return await this.courseModel.find();
  }

  async findById(id: string) {
    return await this.courseModel.findById(id);
  }

  async update(id: string, updateDto: any) {
    return await this.courseModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async delete(id: string) {
    return await this.courseModel.findByIdAndDelete(id);
  }
}
