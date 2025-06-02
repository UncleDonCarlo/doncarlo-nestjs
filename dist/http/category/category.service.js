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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const category_entity_1 = require("./entity/category.entity");
const category_repository_1 = require("./entity/category.repository");
const information_repository_1 = require("../information/entity/information.repository");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let CategoryService = class CategoryService {
    constructor(categoryRepository, informationRepository) {
        this.categoryRepository = categoryRepository;
        this.informationRepository = informationRepository;
    }
    async createCategory(categoryRequest) {
        const { name } = categoryRequest;
        const existingCategory = await this.categoryRepository.createQueryBuilder('category')
            .where('category.name = :name', { name })
            .andWhere('category.deletedAt IS NULL')
            .getOne();
        if (existingCategory) {
            throw new common_1.BadRequestException('Category is already exist');
        }
        const newCategory = this.categoryRepository.create({
            name,
        });
        await this.categoryRepository.save(newCategory);
        return {
            id: newCategory.id,
            name: newCategory.name,
            createdAt: newCategory.createdAt,
            updatedAt: newCategory.updatedAt,
        };
    }
    async getCateogryById(id) {
        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :id', { id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        return {
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }
    async getAllCategories(page, limit) {
        const queryBuilder = this.categoryRepository.createQueryBuilder('category');
        queryBuilder.where('category.deletedAt IS NULL');
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, { page, limit });
    }
    async modifyCategory(id, categoryRequest) {
        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :id', { id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();
        if (!category) {
            throw new common_1.NotFoundException('Category not found');
        }
        const { name } = categoryRequest;
        const existingCategory = await this.categoryRepository.createQueryBuilder('category')
            .where('category.name = :name', { name })
            .andWhere('category.deletedAt IS NULL')
            .andWhere('category.id != :id', { id })
            .getOne();
        if (existingCategory) {
            throw new common_1.BadRequestException('Category is already exist');
        }
        category.name = name;
        category.updatedAt = new Date();
        await this.categoryRepository.save(category);
        return {
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        };
    }
    async deleteCategory(id) {
        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :id', { id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();
        if (!category) {
            throw new common_1.NotFoundException('Category was not found');
        }
        const informations = await this.informationRepository.createQueryBuilder('information')
            .leftJoinAndSelect('information.categories', 'category')
            .where('category.id = :id', { id })
            .andWhere('information.deletedAt IS NULL')
            .getMany();
        category.deletedAt = new Date();
        await this.categoryRepository.save(category);
        for (const information of informations) {
            information.categories = information.categories.map(cat => {
                if (cat.id === id)
                    return null;
                return cat;
            });
            await this.informationRepository.save(information);
        }
        return {
            "Delete Category ": category.name + " Succesfully"
        };
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Categories)),
    __param(1, (0, common_1.Inject)("InformationRepository")),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        information_repository_1.InformationRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map