// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CourseModule } from './modules/course/course.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { RolesModule } from './modules/role/role.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CourseModule,
    UsersModule,
    AuthModule,
    RolesModule
  ],
})
export class AppModule {}
