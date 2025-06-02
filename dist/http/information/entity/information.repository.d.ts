import { DataSource, Repository } from 'typeorm';
import { Information } from './information.entity';
export declare class InformationRepository extends Repository<Information> {
    private dataSource;
    constructor(dataSource: DataSource);
}
