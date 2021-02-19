import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { User } from '../user/user.entity';
import { Token } from '../token/token.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async login(user: LoginUserDto): Promise<Token> {
    const isExist = await this.userService.findOne({
      email: user.email,
    });

    if (
      !isExist ||
      (isExist !== undefined ? !isExist.checkPassword(user.password) : false)
    ) {
      throw new HttpException(
        {
          error: 'User not found!',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return await this.tokenService.create(isExist);
  }

  async register(user: RegisterUserDto): Promise<User> {
    const isExist = await this.userService.findOne({ email: user.email });
    if (isExist) {
      throw new HttpException(
        {
          error: 'User already exist!',
        },
        HttpStatus.FORBIDDEN
      );
    }
    return await this.userService.create(user);
  }

  async userInfo(userId: string): Promise<User> {
    return await this.userService.findById(userId);
  }
}
