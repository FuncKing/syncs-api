import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { Token } from 'src/token/token.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
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
    const userId: string = (await isExist).id.toString();
    return await this.tokenService.create(userId);
  }

  async register(user: RegisterUserDto): Promise<any> {
    const isExist = await this.userService.findOne({ email: user.email });
    if (isExist) {
      return 'User already exist!';
    }
    return await this.userService.create(user);
  }

  async userInfo(id: string): Promise<User> {
    return await this.userService.findById(id);
  }
}
