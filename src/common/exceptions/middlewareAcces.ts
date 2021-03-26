import { HttpException, HttpStatus } from '@nestjs/common';

export default class MiddlewareAccessException extends HttpException {
  constructor() {
    super('You must be login to access here.', HttpStatus.UNAUTHORIZED);
  }
}
