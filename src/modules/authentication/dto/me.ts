import { IsString } from 'class-validator';
import { User } from 'src/modules/user/user.entity';

export class MeDto {
  readonly user: User;
}
