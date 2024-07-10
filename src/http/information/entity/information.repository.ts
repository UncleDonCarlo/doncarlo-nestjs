import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Information } from './information.entity';

@Injectable()
export class InformationRepository extends Repository<Information> {
  constructor(private dataSource: DataSource) {
    super(Information, dataSource.createEntityManager());
  }
  
}
