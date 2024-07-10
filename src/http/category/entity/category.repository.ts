import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Categories } from './category.entity';

@Injectable()
export class CategoryRepository extends Repository<Categories> {
  constructor(private dataSource: DataSource) {
    super(Categories, dataSource.createEntityManager());
  }

  async findAll(): Promise<Categories[]> {
    return this.createQueryBuilder('category')
      .where('category.deletedAt IS NULL')
      .getMany();
  }
  
}
