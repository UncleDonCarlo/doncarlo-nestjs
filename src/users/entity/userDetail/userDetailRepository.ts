import { EntityRepository, Repository } from 'typeorm';
import { UserDetail } from './userDetail.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
// @CustomRepository(UserDetail)
export class UserDetailRepository extends Repository<UserDetail> {
  
  async findByUserId(id: number): Promise<UserDetail | undefined> {
    return await this.query(`SELECT * FROM user_detail WHERE userId = ${id}`);
  }
}