import { Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async login(user: LoginUserDto): Promise<any> {
    const isExist = await this.userService.findOne({
      email: user.email,
    });

    if (
      !isExist ||
      (isExist !== undefined ? !isExist.checkPassword(user.password) : false)
    ) {
      return 'User not found!';
    }
    return await this.tokenService.create(isExist);
  }

  async register(user: RegisterUserDto): Promise<any> {
    const isExist = await this.userService.findOne({ email: user.email });
    if (isExist) {
      return 'User already exist!';
    }
    return await this.userService.create(user);
  }

  async userInfo(tokenValue: string): Promise<any> {
    const token = await this.tokenService.findOne({ value: tokenValue });
    
    if (
      !token ||
      (token !== undefined? token.isExpired() : false)
      ) {
      return 'User not found, token is expired or you do not have a permission';
    }
    const user = await this.userService.findById(token.userId);
    return user;
  }
}
