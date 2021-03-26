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

  // constructor(ownerUser: string,file: any) {
  //   super();
    
  //   this.ownerUser = ownerUser;
  //   this.name = file.filename;
  //   this.size = file.length;
  //   this.path = `${new Date().getTime()}-${this.name}`;
  // }
}
