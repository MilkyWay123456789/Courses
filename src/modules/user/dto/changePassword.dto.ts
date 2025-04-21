// src/users/dto/change-password.dto.ts
import { MinLength } from 'class-validator';

export class ChangePasswordDto {  
  id: string; 
  oldPassword: string;
  @MinLength(6)
  newPassword: string;
}
