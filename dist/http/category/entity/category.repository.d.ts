import { DataSource, Repository } from 'typeorm';
import { Categories } from './category.entity';
export declare class CategoryRepository extends Repository<Categories> {
    private dataSource;
    constructor(dataSource: DataSource);
    findAll(): Promise<Categories[]>;
}
