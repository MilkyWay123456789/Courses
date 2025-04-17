import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guard/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('courses') // Tên nhóm hiển thị trên Swagger UI
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post("AddCourse")
  create(@Body() body: any) {
    return this.courseService.create(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') 
  @Get("GetCourse")
  findAll() {
    return this.courseService.findAll();
  }

  @Get('GetCourseByID/:id')
  findOne(@Param('id') id: string) {
    return this.courseService.findById(id);
  }

  @Put('UpdateCourse/:id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.courseService.update(id, body);
  }

  @Delete('DeleteCourse/:id')
  delete(@Param('id') id: string) {
    return this.courseService.delete(id);
  }
}
