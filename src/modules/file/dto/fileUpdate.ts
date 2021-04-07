import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { SharedUsers } from './sharedUsers';

export class FileUploadDTO {
  @IsString()
  readonly name: string;

  @IsArray()
  @ValidateNested()
  @Type(() => SharedUsers)
  readonly sharedUsers: SharedUsers[];
}
