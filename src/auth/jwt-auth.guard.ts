// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context) {
    console.log('🔐 JwtAuthGuard được gọi');
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    console.log('📦 handleRequest:', { err, user, info });
    return user; // return user nếu không có lỗi
  }
}
