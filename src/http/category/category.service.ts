import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRequest } from './dto/categoryRequest';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from './entity/category.entity';
import { Not } from 'typeorm';
import { CategoryRepository } from './entity/category.repository';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Categories)
        private readonly categoryRepository: CategoryRepository,
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

    async getAllCategories(): Promise<any[]> {
        const categories = await this.categoryRepository.createQueryBuilder('category')
        .where('category.deletedAt IS NULL')
        .getMany();

        // const categories = await this.categoryRepository.findAll();

        if (!categories || categories.length === 0) {
            throw new NotFoundException('Categories not found');
        }

        return categories.map(category => ({
            id: category.id,
            name: category.name,
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        }));
    }

    async modifyCategory(id: number, categoryRequest: CategoryRequest): Promise<any>{
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

    async deleteCategory(id:number): Promise<any>{
        const category = await this.categoryRepository.createQueryBuilder('category')
        .where('category.id = :id', { id })
        .andWhere('category.deletedAt IS NULL')
        .getOne();

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        category.deletedAt = new Date();
        await this.categoryRepository.save(category);

        return {
            "Delete Category : " : category.name + " Succesfully"
        }
    }

}
