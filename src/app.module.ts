import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TokenModule } from './modules/token/token.module';
import { Token } from './modules/token/token.entity';
import { AuthenticationMiddleware } from './common/middleware/authentication';

/* eslint-disable @typescript-eslint/no-var-requires */
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
  }
}
