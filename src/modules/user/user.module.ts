// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { UsersService } from './user.service';
import { UserController } from './user.controller'; // Import the User type if needed

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UserController], // Add your controllers here if needed
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
