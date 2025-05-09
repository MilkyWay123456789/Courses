// src/users/user.type.ts
import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name : string;
  role: string;
}
