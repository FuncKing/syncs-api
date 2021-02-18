import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity'
import { LoginUserDto, RegisterUserDto } from './dto'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthenticationService {
	constructor(private readonly userService: UserService) { }

	async login(user: LoginUserDto): Promise<string> {
		return
	}

	async register(user: RegisterUserDto): Promise<any> {
		const isExist = await this.userService.findOne({ email: user.email })
		if (isExist) {
			return 'User already exist!'
		}
		return await this.userService.create(user)
	}

	async userInfo(id: string): Promise<User> {
		return await this.userService.findById(id);
	}
}
