import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service'
import { LoginUserDto, RegisterUserDto  } from './dto'

@Controller('authentication')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService ) {}

    @Post('login')
    login(@Body() user: LoginUserDto): Promise<string> { // token geri döncek
        return this.authenticationService.login(user)
    }

    @Post('register')
    register(@Body() user: RegisterUserDto): Promise<string> { // token geri döncek
        return this.authenticationService.register(user)
    }

    @Get('me')
    getUser(@Body() id: string): Promise<string> { // user geri döncek
        return this.authenticationService.userInfo(id)
    }
}
