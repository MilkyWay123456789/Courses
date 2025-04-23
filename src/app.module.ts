// src/app.module.ts
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'; 
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CourseModule } from './modules/course/course.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/user/user.module';
import { RolesModule } from './modules/role/role.module'; 
import { GroupModule } from './modules/group/group.module'; 
import { PermissionModule } from './modules/permission/permission.module'; 
import * as redisStore from 'cache-manager-ioredis';

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
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost', // hoặc host Redis của bạn
        port: 6379,
        ttl: 60, // seconds
      }),
    }),
    CourseModule,
    UsersModule,
    AuthModule,
    RolesModule,
    GroupModule,
    PermissionModule
  ],
})
export class AppModule {}
