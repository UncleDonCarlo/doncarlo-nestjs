"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_repository_1 = require("./entity/project.repository");
const project_entity_1 = require("./entity/project.entity");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const config_1 = require("@nestjs/config");
let ProjectService = class ProjectService {
    constructor(projectRepository, configService) {
        this.projectRepository = projectRepository;
        this.configService = configService;
    }
    async getAllProject(page, limit) {
        const queryBuilder = this.projectRepository.createQueryBuilder('project');
        queryBuilder.where('project.deletedAt IS NULL');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async getProjectById(id) {
        const project = await this.projectRepository
            .createQueryBuilder('project')
            .where('project.id = :id', { id: id })
            .andWhere('project.deletedAt IS NULL')
            .getOne();
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async createProject(projectRequest, file) {
        const existingProject = await this.projectRepository
            .createQueryBuilder('project')
            .where('project.name = :name', { name: projectRequest.name })
            .andWhere('project.deletedAt IS NULL')
            .getOne();
        if (existingProject) {
            throw new common_1.BadRequestException('Project with this name already exists');
        }
        const newproject = this.projectRepository.create({
            name: projectRequest.name,
            description: projectRequest.description,
            imgPath: file?.filename
                ? this.configService.get('ENDPOINT_URL') + "/assets/" + file?.filename
                : null,
        });
        return this.projectRepository.save(newproject);
    }
    async updateProject(id, projectRequest, file) {
        const project = await this.getProjectById(id);
        project.name = projectRequest.name;
        project.description = projectRequest.description;
        project.href = projectRequest.href;
        project.imgPath = file?.filename
            ? this.configService.get('ENDPOINT_URL') + "/assets/" + file?.filename
            : null;
        return this.projectRepository.save(project);
    }
    async deleteProject(id) {
        const project = await this.getProjectById(id);
        project.deletedAt = new Date();
        await this.projectRepository.save(project);
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [project_repository_1.ProjectRepository,
        config_1.ConfigService])
], ProjectService);
//# sourceMappingURL=project.service.js.map