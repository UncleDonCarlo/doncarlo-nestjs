import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';

@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }
  
}
