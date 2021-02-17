import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity'
//import { Token } from '../token/token.entity'
import { LoginUserDto, RegisterUserDto } from './dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthenticationService {
    constructor( private readonly userService: UserService ){}

    async login(user : LoginUserDto): Promise<string> {
        return 
    }

    async register(user : RegisterUserDto): Promise<string> {
       // await //this.userRepository.create(user)
        return 
    }

    async userInfo(id : string): Promise<string> {
        const user = await this.userService.findOne(id);
        return user.email
    }
}
