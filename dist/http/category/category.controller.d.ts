import { Response } from 'express';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { CategoryRequest } from './dto/categoryRequest';
import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    private readonly responseTemplate;
    constructor(categoryService: CategoryService, responseTemplate: ResponseTemplate);
    createUser(categoryRequest: CategoryRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getCategoryById(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllCategories(page: number, limit: number, res: Response): Promise<Response<any, Record<string, any>>>;
    modifyCategory(id: number, categoryRequest: CategoryRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteCategory(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
