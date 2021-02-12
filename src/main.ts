//import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();