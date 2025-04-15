import { IsString, IsNumber, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  name: string;
}
