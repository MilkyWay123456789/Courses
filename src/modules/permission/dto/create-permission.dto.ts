import { IsString} from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  roleId: string;
  groupId: string;
  enable: boolean;
}