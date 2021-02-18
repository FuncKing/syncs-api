import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Token extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  @ApiProperty({ example: 'asdsadasd1231es', description: 'token value' })
  value: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', nullable: true, default : null   })
  updatedAt?: Date

  @Column()
  @DeleteDateColumn({ type: 'timestamp', nullable: true, default : null   })
  @ApiProperty({ example: '', description: '' })
  deletedAt : Date;
}