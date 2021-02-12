import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE,
      entities: [User],
      synchronize: (process.env.DATABASE_SYNCHRONIZE.toLowerCase() === 'true' ),
    }),
    UserModule
  ],/*
  controllers: [AppController],
  providers: [AppService],*/
})
export class AppModule {}
