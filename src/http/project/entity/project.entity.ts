import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ default: null, nullable: false })
  name: string;

  @Column({ type: 'longtext', nullable: false, default: null, })
  description: string;

  @Column({ type: 'longtext', nullable: false, default: null })
  href: string;

  @Column({ type: 'longtext', nullable: false, default: null })
  imgPath: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: null, nullable: true })
  deletedAt: Date;
}
