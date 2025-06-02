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
exports.InformationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const information_entity_1 = require("./entity/information.entity");
const information_repository_1 = require("./entity/information.repository");
const category_repository_1 = require("../category/entity/category.repository");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const schedule_1 = require("@nestjs/schedule");
let InformationService = class InformationService {
    constructor(informationRepository, categoryRepository) {
        this.informationRepository = informationRepository;
        this.categoryRepository = categoryRepository;
    }
    async createInformation(informationRequest) {
        const { message, category_id } = informationRequest;
        const existingInformation = await this.informationRepository.createQueryBuilder('information')
            .where('information.message = :message', { message })
            .andWhere('information.deletedAt IS NULL')
            .getOne();
        if (existingInformation) {
            throw new common_1.BadRequestException('Information already exists');
        }
        const newInformation = new information_entity_1.Information();
        newInformation.message = message;
        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :category_id', { category_id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();
        if (!category) {
            throw new common_1.BadRequestException('Category not found');
        }
        const savedInformation = await this.informationRepository.save(newInformation);
        savedInformation.categories = [category];
        await this.informationRepository.save(savedInformation);
        return {
            id: savedInformation.id,
            message: savedInformation.message,
            createdAt: savedInformation.createdAt,
            updatedAt: savedInformation.updatedAt,
        };
    }
    async getAllInformation(page, limit) {
        const queryBuilder = this.informationRepository.createQueryBuilder('information');
        queryBuilder.where('information.deletedAt IS NULL');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async updatePublish(putPublishRequest) {
        const { id, isPublish } = putPublishRequest;
        const existingInformation = await this.informationRepository.createQueryBuilder('information')
            .where('information.id = :id', { id })
            .andWhere('information.deletedAt IS NULL')
            .getOne();
        if (!existingInformation) {
            throw new common_1.NotFoundException(`Information ID was not found.`);
        }
        existingInformation.isPublish = isPublish;
        await this.informationRepository.save(existingInformation);
        return "Updated information Status Successfully!";
    }
    async modifyInformation(id, informationRequest) {
        const { message, category_id } = informationRequest;
        const information = await this.informationRepository.createQueryBuilder('information')
            .where('information.id = :id', { id })
            .andWhere('information.deletedAt IS NULL')
            .getOne();
        if (!information) {
            throw new common_1.NotFoundException('Information not found');
        }
        const existingInformation = await this.informationRepository.createQueryBuilder('information')
            .where('information.message = :message', { message })
            .andWhere('information.deletedAt IS NULL')
            .andWhere('information.id != :id', { id })
            .getOne();
        if (existingInformation) {
            throw new common_1.BadRequestException('Information is already exist');
        }
        const existingcategory = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :category_id', { category_id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();
        if (!existingcategory) {
            throw new common_1.NotFoundException('Category not found');
        }
        information.message = message;
        information.categories = [existingcategory];
        information.updatedAt = new Date();
        console.log(information);
        await this.informationRepository.save(information);
        return {
            id: information.id,
            message: information.message,
            createdAt: information.createdAt,
            isPublish: information.isPublish,
            updatedAt: information.updatedAt,
            category: information.categories.map(cat => ({
                id: cat.id,
                name: cat.name,
            })),
        };
    }
    async deleteInformation(id) {
        const information = await this.informationRepository.createQueryBuilder('information')
            .where('information.id = :id', { id })
            .andWhere('information.deletedAt IS NULL')
            .getOne();
        if (!information) {
            throw new common_1.NotFoundException('Information was not found');
        }
        information.deletedAt = new Date();
        await this.informationRepository.save(information);
        return {
            "Delete Category ": information.message + " Succesfully"
        };
    }
    async fetchDataFromApi() {
        try {
            const response = await fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'string',
                    password: 'string',
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        }
        catch (error) {
            console.error('Failed to fetch data from API', error);
        }
    }
    handleInterval() {
        console.log('Fetching data from API at 3:01 PM');
        this.fetchDataFromApi();
    }
};
exports.InformationService = InformationService;
__decorate([
    (0, schedule_1.Cron)('17 21 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InformationService.prototype, "handleInterval", null);
exports.InformationService = InformationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(information_entity_1.Information)),
    __param(1, (0, common_1.Inject)("CategoryRepository")),
    __metadata("design:paramtypes", [information_repository_1.InformationRepository,
        category_repository_1.CategoryRepository])
], InformationService);
//# sourceMappingURL=information.service.js.map