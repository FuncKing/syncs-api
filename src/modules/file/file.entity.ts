import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';

import { SharedUsers } from './dto/sharedUsers';

@Entity()
export class File extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  ownerUser: string;

  @Column()
  name: string;

  @Column()
  size: number;

  @Column()
  path: string;

  @Column()
  type: string;

  @Column({ nullable: true, default: [] })
  @Type(() => SharedUsers)
  sharedUsers: SharedUsers[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;

  async delete() {
    this.deletedAt = new Date();
    await this.save();
  }
}
