import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ required: true, unique: true })
  roleId: string;

  @Prop({ required: true, unique: true })
  groupId: string;
  @Prop()
  enabled: boolean;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);