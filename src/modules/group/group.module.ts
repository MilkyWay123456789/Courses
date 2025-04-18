import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group, GroupSchema } from './group.schema';
import { Permission, PermissionSchema } from '../permission/permission.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema },
    { name: Permission.name, schema: PermissionSchema },
  ])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}