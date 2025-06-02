import { Repository } from 'typeorm';
import { UserDetail } from './userDetail.entity';
export declare class UserDetailRepository extends Repository<UserDetail> {
    findByUserId(id: number): Promise<UserDetail | undefined>;
}
