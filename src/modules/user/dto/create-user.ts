import * as AllValidator from 'class-validator';

export class CreateUserDto {
  @AllValidator.IsString()
  readonly email: string;

  @AllValidator.IsString()
  readonly password: string;
}
