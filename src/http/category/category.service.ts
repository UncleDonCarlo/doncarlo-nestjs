import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRequest } from './dto/categoryRequest';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entity/category.entity';
import { Not } from 'typeorm';
import { CategoryRepository } from './entity/category.repository';
import { InformationRepository } from '../information/entity/information.repository';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: CategoryRepository,
        @Inject("InformationRepository")
        private readonly informationRepository: InformationRepository,
    ) { }

    async createCategory(categoryRequest: CategoryRequest): Promise<any> {
        const { name } = categoryRequest;
        const existingCategory = await this.categoryRepository.createQueryBuilder('category')
            .where('category.name = :name', { name })
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (existingCategory) {
            throw new BadRequestException('Category is already exist');
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

    async getCateogryById(id: number): Promise<any> {
        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :id', { id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return {
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        }
    }

    async getAllCategories(page:number, limit:number): Promise<Pagination<Categories>> {
        const queryBuilder = this.categoryRepository.createQueryBuilder('category');
        queryBuilder.where('category.deletedAt IS NULL');

        return paginate<Categories>(queryBuilder, { page, limit });
    }

    async modifyCategory(id: number, categoryRequest: CategoryRequest): Promise<any> {
        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :id', { id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const { name } = categoryRequest;

        // const existingCategory = await this.categoryRepository.findOne({
        //     where: { name, deletedAt: null, id: Not(id) },
        // });

        const existingCategory = await this.categoryRepository.createQueryBuilder('category')
            .where('category.name = :name', { name })
            .andWhere('category.deletedAt IS NULL')
            .andWhere('category.id != :id', { id })
            .getOne();

        if (existingCategory) {
            throw new BadRequestException('Category is already exist');
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

    async deleteCategory(id: number): Promise<any> {
        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :id', { id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (!category) {
            throw new NotFoundException('Category was not found');
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
                if (cat.id === id) return null;
                return cat;
            });
            await this.informationRepository.save(information);
        }

        return {
            "Delete Category ": category.name + " Succesfully"
        }
    }

}
