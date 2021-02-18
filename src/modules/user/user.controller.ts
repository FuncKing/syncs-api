import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
//import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Users' })
  @ApiResponse({ status: 200, description: 'The found record', type: [User] })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne({ id });
  }

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: 'Succefully Created' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
