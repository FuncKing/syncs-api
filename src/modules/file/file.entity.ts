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
  path: string

  @Column()
  type: string

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date;

  async delete(){
    this.deletedAt = new Date();
    await this.save();
  }
}
