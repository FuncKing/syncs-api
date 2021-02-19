import { HttpException, HttpStatus } from '@nestjs/common';

export default class UserAlreadyExistException extends HttpException {
  constructor() {
    super('User already exist!', HttpStatus.FORBIDDEN);
  }
}
