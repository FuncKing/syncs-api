import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { table } from 'console';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async login(user: LoginUserDto): Promise<string> {
    const isExist = await this.userService.findOne({
      email: user.email,
    });

    if (
      !isExist ||
      (isExist !== undefined ? !isExist.checkPassword(user.password) : false)
    ) {
      return 'User not found!';
    }
    const userId: string = (await isExist).password_hash.toString();
    const token = await this.tokenService.create(userId);
    console.table(token);
    return token.value;
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
