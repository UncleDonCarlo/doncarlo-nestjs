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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const response_template_1 = require("../../utils/responseTemplate/response.template");
const auth_guard_1 = require("../../guards/auth/auth.guard");
const project_service_1 = require("./project.service");
const projectRequest_1 = require("./dto/projectRequest");
const projectBody_1 = require("./dto/projectBody");
const fileInterceptor_1 = require("../../utils/fileInterceptor");
let ProjectController = class ProjectController {
    constructor(responseTemplate, projectService) {
        this.responseTemplate = responseTemplate;
        this.projectService = projectService;
    }
    async getAllInformations(page, limit, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.projectService.getAllProject(page, limit)));
    }
    async createUser(projectRequest, file, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.projectService.createProject(projectRequest, file)));
    }
    async getProjectById(id, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.projectService.getProjectById(id)));
    }
    async updateProject(id, projectRequest, file, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.projectService.updateProject(id, projectRequest, file)));
    }
    async deleteProject(id, res) {
        return res.status(200).json(await this.responseTemplate.createResponseTemplate(() => this.projectService.deleteProject(id)));
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getAllInformations", null);
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, common_1.UseInterceptors)((0, fileInterceptor_1.FileImageUploadInterceptor)('img')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(projectBody_1.CreateProjectSwaggerSchema),
    (0, swagger_1.ApiOperation)({ summary: 'Create a Project', description: 'This endpoint creates a new project and returns the response.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [projectRequest_1.ProjectRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "createUser", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectById", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    (0, common_1.UseInterceptors)((0, fileInterceptor_1.FileImageUploadInterceptor)('img')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)(projectBody_1.CreateProjectSwaggerSchema),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Project', description: 'This endpoint updates an existing project and returns the response.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, projectRequest_1.ProjectRequest, Object, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "updateProject", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)('accessToken'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
exports.ProjectController = ProjectController = __decorate([
    (0, swagger_1.ApiTags)('projects'),
    (0, common_1.Controller)('projects'),
    __metadata("design:paramtypes", [response_template_1.ResponseTemplate,
        project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map