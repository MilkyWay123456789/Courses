import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { Permission, PermissionSchema } from './permission.schema';
import { Role, RoleSchema } from '../role/role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema },
    { name: Role.name, schema: RoleSchema }
  ])],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}