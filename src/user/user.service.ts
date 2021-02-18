import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findOne(where: any): Promise<User> {
    return this.userRepository.findOne(where);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(_user: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = _user.email;
    user.setPassword(_user.password); 
    user.selected_plan = 2
    user.is_account_active = false
    await user.save();
    return user
  }
  
}
