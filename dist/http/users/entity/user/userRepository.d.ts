import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    findByEmail(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    findByEmailRawQuery(email: string): Promise<User>;
}
