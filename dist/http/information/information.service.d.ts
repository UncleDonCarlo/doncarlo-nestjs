import { Information } from './entity/information.entity';
import { InformationRepository } from './entity/information.repository';
import { InformationRequest } from './dto/informationRequest';
import { CategoryRepository } from '../category/entity/category.repository';
import { PutPublishRequest } from './dto/putIsPublishRequest';
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class InformationService {
    private readonly informationRepository;
    private readonly categoryRepository;
    constructor(informationRepository: InformationRepository, categoryRepository: CategoryRepository);
    createInformation(informationRequest: InformationRequest): Promise<any>;
    getAllInformation(page: number, limit: number): Promise<Pagination<Information>>;
    updatePublish(putPublishRequest: PutPublishRequest): Promise<any>;
    modifyInformation(id: number, informationRequest: InformationRequest): Promise<any>;
    deleteInformation(id: number): Promise<any>;
    fetchDataFromApi(): Promise<void>;
    handleInterval(): void;
}
