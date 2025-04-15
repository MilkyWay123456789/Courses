import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Online Course API')
    .setDescription('API cho hệ thống đăng ký khóa học online')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // đường dẫn: http://localhost:3000/api

   // Sử dụng ValidationPipe để tự động validate DTO
   app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
