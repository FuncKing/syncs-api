import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {makeSha512} from '../encryption/index' ;

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const hash =  makeSha512(pass, user.password_salt);
    if (user && user.password_hash === hash) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}