import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/user.entity';
import Encryption from 'src/encryption';

@Entity()
export class Token extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  userId: string;

  @Column()
  @ApiProperty({ example: 'asdsadasd1231es', description: 'token value' })
  value: string;

  @Column()
  expiredAt: Date;

  @Column()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Column()
  @UpdateDateColumn({ type: 'timestamp', nullable: true, default: null })
  updatedAt?: Date;

  @Column()
  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  @ApiProperty({ example: '', description: '' })
  deletedAt: Date;

  generateToken(user: User): void {
    const expireDays = 30;
    const key = `token-${user.email}-${new Date()}`;
    const encryption: Encryption = new Encryption(key);
    const now: Date = new Date();
    now.setDate(now.getDate() + expireDays);

    this.userId = user.id.toString();
    this.value = encryption.hashed;
    this.expiredAt = now;
  }

  isExpired(): boolean {
    return new Date().getTime() > this.expiredAt.getTime() ? true : false
  }
}
