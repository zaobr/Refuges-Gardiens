import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,PUT,POST,DELETE',
  });
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  await app.listen(process.env.APP_PORT);
}
bootstrap();
