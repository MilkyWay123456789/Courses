// modules/course/course.schema.ts
import { Schema } from 'mongoose';

export const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  teacher: String,
  lessons: [String],
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});
