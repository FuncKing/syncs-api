import { IsString } from 'class-validator';
import { inherits } from 'util';
import { CreateUserDto } from '../../user/dto/create-user';

export class RegisterUserDto extends CreateUserDto {}
