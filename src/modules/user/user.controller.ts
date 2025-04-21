import { Controller, Get, Query, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema'; 
import { UpdateUserDto } from './dto/updateUser.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
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

  //Hàm UpdateUser
  @Put('UpdateUser')
    async updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.userService.updateUser(updateUserDto);
    }

  //Hàm DeleteUser
  @Delete('DeleteUser/:id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }

   //Hàm change password
   @Put('ChangePassword')
  async changePassword(@Body() dto: ChangePasswordDto) {
    return this.userService.changePassword(dto);
  }
}
