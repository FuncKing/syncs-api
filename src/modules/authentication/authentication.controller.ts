import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { User } from '../user/user.entity';
import { LoginUserDto, MeDto, RegisterUserDto } from './dto';

@Controller('authentications')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  login(@Body() user: LoginUserDto): Promise<string> {
    return this.authenticationService.login(user);
  }

  @Post('register')
  register(@Body() user: RegisterUserDto): Promise<User> {
    return this.authenticationService.register(user);
  }

  @Post('me')
  getUser(@Body() token: MeDto): Promise<User> {
    return this.authenticationService.userInfo(token.tokenValue);
  }
}
