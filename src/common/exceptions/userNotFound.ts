import { HttpException, HttpStatus } from '@nestjs/common';

export default class UserNotFoundException extends HttpException {
  constructor(extraErrorMessage?: string) {
    super(
      `User not found ${extraErrorMessage ? extraErrorMessage : ''}!`,
      HttpStatus.BAD_REQUEST
    );
  }
}
