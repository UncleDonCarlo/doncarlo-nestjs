import { Response } from 'express';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { InformationRequest } from './dto/informationRequest';
import { InformationService } from './information.service';
import { PutPublishRequest } from './dto/putIsPublishRequest';
export declare class InformationController {
    private readonly responseTemplate;
    private readonly informationService;
    constructor(responseTemplate: ResponseTemplate, informationService: InformationService);
    createUser(informationRequest: InformationRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllInformations(page: number, limit: number, res: Response): Promise<Response<any, Record<string, any>>>;
    putIsPublishInformations(PutPublishRequest: PutPublishRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    modifyInformation(id: number, InformationRequest: InformationRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteInformation(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
