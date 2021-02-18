import * as AllValidator from 'class-validator';
import { DrivePlan } from '../drive.plan.entity';

export class CreateUserDto {
  @AllValidator.IsString()
  readonly email: string;

  @AllValidator.IsString()
  readonly password: string;
}
