import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity'; // Assuming this is the correct path to your User entity

@Entity('usersDetails')
export class UserDetail {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // Specify the foreign key column name
  user: User;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNo: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: null, nullable: true })
  deletedAt: Date;
}
