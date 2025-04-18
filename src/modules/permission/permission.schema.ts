import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ required: true })
  roleId: string;

  @Prop({ required: true })
  groupId: string;
  @Prop()
  enable: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);