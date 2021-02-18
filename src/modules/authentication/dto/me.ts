import { IsString } from 'class-validator';

export class MeDto {
  @IsString()
  readonly tokenValue: string;
}
