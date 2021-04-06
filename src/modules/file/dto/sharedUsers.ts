import { IsBoolean, IsString } from 'class-validator';

export class SharedUsers {
  @IsString()
  readonly userId: string;

  @IsBoolean()
  public isEditor: boolean;
}
