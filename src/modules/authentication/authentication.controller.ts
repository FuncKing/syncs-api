import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { User } from '../user/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto';
import { Token } from '../token/token.entity';

@Controller('/authentications')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  login(@Body() user: LoginUserDto): Promise<Token> {
    return this.authenticationService.login(user);
  }

  @Post('/register')
  register(@Body() user: RegisterUserDto): Promise<User> {
    return this.authenticationService.register(user);
  }

  @Get('/me')
  getUser(@Request() req): Promise<User> {
    return this.authenticationService.userInfo(req.user);
  }
}
