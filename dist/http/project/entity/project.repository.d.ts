import { DataSource, Repository } from 'typeorm';
import { Project } from './project.entity';
export declare class ProjectRepository extends Repository<Project> {
    private dataSource;
    constructor(dataSource: DataSource);
}
