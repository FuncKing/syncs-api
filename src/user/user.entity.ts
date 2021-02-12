import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty({ example: 'Mert Can', description: 'name' })
  name: string;

  @Column()
  @ApiProperty({ example: 'Yılmaz', description: 'surname' })
  surname: string;

  @Column()
  @ApiProperty({ example: 'mymail@mail.com', description: 'email address' })
  email: string;

  @Column()
  @ApiProperty({ example: 'asd230kd212', description: 'encoded password' })
  password_hash: string;

  @Column()
  @ApiProperty({ example: 'asdasdasd90', description: 'encoded password' })
  password_salt: string

  @Column()
  @ApiProperty({ example: 'true', description: 'paranoid delete bool' })
  isAccountActive: boolean;
}
