import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from 'interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,   // Transforma automaticamente os dados para o tipo correto
    whitelist: true,   // Remove propriedades desconhecidas (não declaradas no DTO)
    forbidNonWhitelisted: true,  // Lança erro caso propriedades não permitidas sejam fornecidas
  }));

  app.enableCors();
  app.useGlobalInterceptors(new LoggingInterceptor())


  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()} 🚀`);
}
bootstrap();
