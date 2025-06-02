import { Response } from 'express';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { ProjectService } from './project.service';
import { ProjectRequest } from './dto/projectRequest';
export declare class ProjectController {
    private readonly responseTemplate;
    private readonly projectService;
    constructor(responseTemplate: ResponseTemplate, projectService: ProjectService);
    getAllInformations(page: number, limit: number, res: Response): Promise<Response<any, Record<string, any>>>;
    createUser(projectRequest: ProjectRequest, file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    getProjectById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProject(id: number, projectRequest: ProjectRequest, file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteProject(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
