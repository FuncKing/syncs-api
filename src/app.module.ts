import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthenticationModule } from './authentication/authentication.module';
import { TokenModule } from './token/token.module';
import { Token } from './token/token.entity';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE,
      synchronize: process.env.DATABASE_SYNCHRONIZE.toLowerCase() === 'true',
      entities: [User, Token],
    }),
    UserModule,
    AuthenticationModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
