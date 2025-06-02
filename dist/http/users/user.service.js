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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const userResponse_1 = require("./dto/userResponse");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entity/user/user.entity");
const userDetail_entity_1 = require("./entity/userDetail/userDetail.entity");
const userRepository_1 = require("./entity/user/userRepository");
const userDetailRepository_1 = require("./entity/userDetail/userDetailRepository");
const userTestRepository_1 = require("./entity/user/userTestRepository");
const jwt = require("jsonwebtoken");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, userTestRepository, userDetailRepository, jwtService) {
        this.userRepository = userRepository;
        this.userTestRepository = userTestRepository;
        this.userDetailRepository = userDetailRepository;
        this.jwtService = jwtService;
    }
    async createUser(userData) {
        const { email, password, firstName, lastName, phoneNo } = userData;
        const existingUser = await this.userRepository.findOne({ where: { email, deletedAt: null } });
        if (existingUser) {
            throw new common_1.BadRequestException('Email address is already taken');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = this.userRepository.create({
            email,
            password: hashedPassword,
        });
        await this.userRepository.save(newUser);
        const newUserDetail = this.userDetailRepository.create({
            user: newUser,
            firstName,
            lastName,
            phoneNo,
        });
        await this.userDetailRepository.save(newUserDetail);
        return {
            id: newUser.id,
            email: newUser.email,
            firstName: newUserDetail.firstName,
            lastName: newUserDetail.lastName,
            phoneNo: newUserDetail.phoneNo,
        };
    }
    async login(loginRequest) {
        const { email, password } = loginRequest;
        const existingUser = await this.userRepository.findOne({ where: { email, deletedAt: null } });
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            throw new common_1.BadRequestException('Invalid credentials');
        }
        const payload = { email: existingUser.email, id: existingUser.id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '1h' });
        return { accessToken, refreshToken };
    }
    async getUserById(id) {
        const user = await this.userRepository.findOne({ where: { id, deletedAt: null } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const userDetails = await this.userDetailRepository.findOne({ where: { user: { id, deletedAt: null } } });
        if (!userDetails) {
            throw new common_1.NotFoundException('User details not found');
        }
        return new userResponse_1.UserResponse(user.id, user.email, userDetails.firstName, userDetails.lastName, userDetails.phoneNo);
    }
    async getAllUsers() {
        const usersWithDetails = await this.userDetailRepository.find({
            relations: ['user'],
            where: {
                deletedAt: null,
            },
        });
        if (!usersWithDetails || usersWithDetails.length === 0) {
            throw new common_1.NotFoundException('Users not found');
        }
        console.log(usersWithDetails);
        return usersWithDetails.map(userDetail => ({
            id: userDetail.user.id,
            email: userDetail.user.email,
            firstName: userDetail.firstName,
            lastName: userDetail.lastName,
            phoneNo: userDetail.phoneNo,
        }));
    }
    async verifyToken(token) {
        try {
            return jwt.verify(token, 'SysTemDonUncle32');
        }
        catch (error) {
            throw new Error('Invalid token');
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(userDetail_entity_1.UserDetail)),
    __metadata("design:paramtypes", [userRepository_1.UserRepository,
        userTestRepository_1.default,
        userDetailRepository_1.UserDetailRepository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map