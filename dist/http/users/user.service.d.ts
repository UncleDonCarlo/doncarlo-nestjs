import { UserResponse } from './dto/userResponse';
import { UserRequest } from './dto/userRequest';
import { LoginRequest } from './dto/loginRequest';
import { UserRepository } from './entity/user/userRepository';
import { UserDetailRepository } from './entity/userDetail/userDetailRepository';
import UserTestRepository from './entity/user/userTestRepository';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userRepository;
    private readonly userTestRepository;
    private readonly userDetailRepository;
    private jwtService;
    constructor(userRepository: UserRepository, userTestRepository: UserTestRepository, userDetailRepository: UserDetailRepository, jwtService: JwtService);
    createUser(userData: UserRequest): Promise<UserResponse>;
    login(loginRequest: LoginRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUserById(id: number): Promise<UserResponse>;
    getAllUsers(): Promise<UserResponse[]>;
    verifyToken(token: string): Promise<string | jwt.JwtPayload>;
}
