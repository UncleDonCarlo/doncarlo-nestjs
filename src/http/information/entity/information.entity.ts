import { Categories } from 'src/http/category/entity/category.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity('informations')
export class Information {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  message: string;

  @Column({ default: true, nullable: false })
  isPublish: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ default: null, nullable: true })
  deletedAt: Date;

  @ManyToMany(() => Categories, { cascade: true })
  @JoinTable({
    name: 'categories_information',
    joinColumn: { name: 'information_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Categories[];
}
