import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseSchema } from './course.schema';
import { AuthModule } from 'src/auth/auth.module'; // 👈 import AuthModule vào

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    AuthModule, 
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
