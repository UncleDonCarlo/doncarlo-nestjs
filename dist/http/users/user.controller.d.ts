import { UserService } from './user.service';
import { Response } from 'express';
import { UserRequest } from './dto/userRequest';
import { LoginRequest } from './dto/loginRequest';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
export declare class UserController {
    private readonly userService;
    private readonly responseTemplate;
    constructor(userService: UserService, responseTemplate: ResponseTemplate);
    createUser(userData: UserRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginRequest: LoginRequest, res: Response): Promise<Response<any, Record<string, any>>>;
    getUser(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUsers(res: Response): Promise<Response<any, Record<string, any>>>;
}
