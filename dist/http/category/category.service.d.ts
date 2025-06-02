import { CategoryRequest } from './dto/categoryRequest';
import { Categories } from './entity/category.entity';
import { CategoryRepository } from './entity/category.repository';
import { InformationRepository } from '../information/entity/information.repository';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly informationRepository;
    constructor(categoryRepository: CategoryRepository, informationRepository: InformationRepository);
    createCategory(categoryRequest: CategoryRequest): Promise<any>;
    getCateogryById(id: number): Promise<any>;
    getAllCategories(page: number, limit: number): Promise<Pagination<Categories>>;
    modifyCategory(id: number, categoryRequest: CategoryRequest): Promise<any>;
    deleteCategory(id: number): Promise<any>;
}
