import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from './entity/project.repository';
import { Project } from './entity/project.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ProjectRequest } from './dto/projectRequest';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: ProjectRepository,
        private readonly configService: ConfigService
    ) { }

    async getAllProject(page: number, limit: number): Promise<Pagination<Project>> {
        const queryBuilder = this.projectRepository.createQueryBuilder('project');
        queryBuilder.where('project.deletedAt IS NULL');

        return paginate<Project>(queryBuilder, { page, limit });
    }

    async getProjectById(id: number): Promise<Project> {
        const project = await this.projectRepository
        .createQueryBuilder('project')
        .where('project.id = :id', { id: id })
        .andWhere('project.deletedAt IS NULL')
        .getOne();

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        return project;
    }

    async createProject(projectRequest: ProjectRequest,file: Express.Multer.File): Promise<any> {
        const existingProject = await this.projectRepository
        .createQueryBuilder('project')
        .where('project.name = :name', { name: projectRequest.name })
        .andWhere('project.deletedAt IS NULL')
        .getOne();

        if (existingProject) {
            throw new BadRequestException('Project with this name already exists');
        }

        const newproject = this.projectRepository.create({
            name: projectRequest.name,
            description: projectRequest.description,
            imgPath: file?.filename 
                ? this.configService.get<string>('ENDPOINT_URL') + "/assets/" + file?.filename
                : null,
        });

        return this.projectRepository.save(newproject);
    }

    async updateProject(id: number, projectRequest: ProjectRequest,file: Express.Multer.File): Promise<Project> {
        const project = await this.getProjectById(id);

        project.name = projectRequest.name;
        project.description = projectRequest.description;
        project.href = projectRequest.href;
        project.imgPath = file?.filename 
            ? this.configService.get<string>('ENDPOINT_URL') + "/assets/" + file?.filename
            : null;

        return this.projectRepository.save(project);
    }

    async deleteProject(id: number): Promise<void> {
        const project = await this.getProjectById(id);

        project.deletedAt = new Date();

        await this.projectRepository.save(project);
    }


}
