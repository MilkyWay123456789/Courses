import { IsString, IsNumber, IsArray, IsOptional, IsMongoId } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  teacher?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })  // 👈 validate từng phần tử là MongoId
  students?: string[];

  @IsOptional()
  @IsArray()
  lessons?: string[];
}
