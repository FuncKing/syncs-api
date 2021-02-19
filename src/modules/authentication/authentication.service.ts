import { Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import {
  UserNotFoundException,
  UserAlreadyExistException,
} from '../../common/exceptions';
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
      throw new UserNotFoundException();
    }
    return await this.tokenService.create(isExist);
  }

  async register(user: RegisterUserDto): Promise<User> {
    const isExist = await this.userService.findOne({ email: user.email });
    if (isExist) {
      throw new UserAlreadyExistException();
    }
    return await this.userService.create(user);
  }

  async userInfo(tokenValue: string): Promise<User> {
    const token = await this.tokenService.findOne({ value: tokenValue });

    if (!token || (token !== undefined ? token.isExpired() : false)) {
      throw new UserNotFoundException(
        ', token is expired or you do not have a permission'
      );
    }
    const user = await this.userService.findById(token.userId);
    return user;
  }
}
