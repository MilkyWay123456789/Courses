import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema'; 

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('GetAllUsers')
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('keyword') keyword?: string,
  ): Promise<{ data: User[]; total: number }> {
    return this.userService.findAll(Number(page), Number(limit), keyword);
  }
}
