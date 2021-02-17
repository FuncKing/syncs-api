import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service'
import { User } from '../user/user.entity'
import { LoginUserDto, RegisterUserDto } from './dto'

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('login')
  login(@Body() user: LoginUserDto): Promise<string> {
    return this.authenticationService.login(user)
  }

  @Post('register')
  register(@Body() user: RegisterUserDto): Promise<User> {
    return this.authenticationService.register(user)
  }

  @Post('me')
  getUser(@Body() req: any): Promise<User> {
    return this.authenticationService.userInfo(req.id)
  }
}
