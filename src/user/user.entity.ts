import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DrivePlan } from './drive.plan.entity';
import Encryption from '../encryption';

@Entity()
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty({ example: 'mymail@mail.com', description: 'email address' })
  email: string;

  @Column('enum', { enum: DrivePlan, nullable: true })
  selected_plan: DrivePlan;

  @Column()
  @ApiProperty({ example: 'asd230kd212', description: 'encoded password' })
  password_hash: string;

  @Column()
  @ApiProperty({ example: 'asdasdasd90', description: 'encoded password' })
  password_salt: string;

  @Column({ type: 'boolean', nullable: true })
  @ApiProperty({ example: 'true', description: 'paranoid delete bool' })
  is_account_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  setPassword(password: string): void {
    const encryption: Encryption = new Encryption(password);
    this.password_salt = encryption.salt;
    this.password_hash = encryption.hashed;
  }

  checkPassword(password: string): boolean {
    const encryption: Encryption = new Encryption(password, this.password_salt);

    return this.password_hash === encryption.hashed;
  }
}
