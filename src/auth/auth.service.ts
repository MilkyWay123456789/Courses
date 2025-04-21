// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../modules/user/user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Inject UserService
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  // Kiểm tra tính hợp lệ của user (email, password)
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // Tìm user qua email
    if (user && await bcrypt.compare(pass, user.password)) { // Kiểm tra password
      const { password, ...result } = user.toObject(); // Xóa mật khẩu trước khi trả về
      return result;
    }
    return null;
  }

  // Đăng nhập: validate user, tạo và trả về JWT token
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password); // Xác thực thông tin người dùng
    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu'); // Nếu không hợp lệ
    }

    const payload = { sub: user._id, email: user.email, role: user.role }; // Payload chứa thông tin cần thiết
    return {
      access_token: this.jwtService.sign(payload), // Tạo token JWT
      user,
    };
  }

  // Đăng ký: tạo user mới
  async register(email: string, password: string, name: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email đã tồn tại'); // Kiểm tra email đã tồn tại
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa password
    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
      name,
      role: 'user', 
    }); 

    const payload = { sub: newUser._id, email: newUser.email, role: newUser.role };
    return {
      access_token: this.jwtService.sign(payload), // Tạo và trả về JWT token
      user: newUser, // Trả về thông tin người dùng
    };
  }

  // Generate token cho user
  generateToken(user: User) {
    const payload = { sub: user._id, email: user.email };
    return this.jwtService.sign(payload); // Tạo JWT từ payload
  }
}
