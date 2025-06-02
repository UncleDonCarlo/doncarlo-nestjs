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
        private readonly configService: ConfigService,
    ) { }

    async getAllProject(page: number, limit: number): Promise<Pagination<Project>> {
        const queryBuilder = this.projectRepository.createQueryBuilder('project');
        queryBuilder.where('project.deletedAt IS NULL');

        return paginate<Project>(queryBuilder, { page, limit });
    }

    async createProject(projectRequest: ProjectRequest,file: Express.Multer.File): Promise<any> {
        const existingProject = await this.projectRepository.findOne({
            where: { name: projectRequest.name }
        })

        if (existingProject) {
            throw new BadRequestException('Project with this name already exists');
        }
        if (!projectRequest.name || !projectRequest.description) {
            throw new BadRequestException('Name and description are required');
        }
        if (file && !file.mimetype.startsWith('image/')) {
            throw new BadRequestException('File must be an image');
        }

        const newproject = this.projectRepository.create({
            name: projectRequest.name,
            description: projectRequest.description,
            imgPath: this.configService.get<string>('ENDPOINT_URL') + "/assets/" + file?.filename || null,
        });

        return this.projectRepository.save(newproject);
    }


}
