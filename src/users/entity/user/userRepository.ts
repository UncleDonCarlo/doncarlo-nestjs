import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(private dataSource: DataSource){
    super(User, dataSource.createEntityManager());
  }
  
  public async findByEmail(email: string): Promise<User> {
    return await this.createQueryBuilder()
      .where('user.email = :email', { email })
      .getOne();
  }

  async findById(id: number): Promise<User> {
    return await this.createQueryBuilder()
      .where('user.id = :id', { id })
      .getOne();
  }
  
  async findByEmailRawQuery(email: string): Promise<User> {
    return await this.query('SELECT * FROM users WHERE email = ?', [email]);
  }
}
