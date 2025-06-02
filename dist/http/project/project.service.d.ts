import { ProjectRepository } from './entity/project.repository';
import { Project } from './entity/project.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProjectRequest } from './dto/projectRequest';
import { ConfigService } from '@nestjs/config';
export declare class ProjectService {
    private readonly projectRepository;
    private readonly configService;
    constructor(projectRepository: ProjectRepository, configService: ConfigService);
    getAllProject(page: number, limit: number): Promise<Pagination<Project>>;
    getProjectById(id: number): Promise<Project>;
    createProject(projectRequest: ProjectRequest, file: Express.Multer.File): Promise<any>;
    updateProject(id: number, projectRequest: ProjectRequest, file: Express.Multer.File): Promise<Project>;
    deleteProject(id: number): Promise<void>;
}
