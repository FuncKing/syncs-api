import { Controller, Get } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
//import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';

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
}
