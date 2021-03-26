import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fmp from 'fastify-multipart';

import { AppModule } from './app.module';

/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // const options = new DocumentBuilder()
  //   .setTitle('User example')
  //   .setDescription('The user API description')
  //   .setVersion('1.0')
  //   .addTag('user')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);
  
  app.register(fmp)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
