import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Information } from './entity/information.entity';
import { InformationRepository } from './entity/information.repository';
import { InformationRequest } from './dto/informationRequest';
import { Categories } from '../category/entity/category.entity';
import { CategoryRepository } from '../category/entity/category.repository';

@Injectable()
export class InformationService {
    constructor(
        @InjectRepository(Information)
        private readonly informationRepository: InformationRepository,
        @Inject("CategoryRepository")
        private readonly categoryRepository: CategoryRepository,
    ) { }

    async createInformation(informationRequest: InformationRequest): Promise<any> {
        const { message, category_id } = informationRequest;

        const existingInformation = await this.informationRepository.createQueryBuilder('information')
            .where('information.message = :message', { message })
            .andWhere('information.deletedAt IS NULL')
            .getOne();

        if (existingInformation) {
            throw new BadRequestException('Information already exists');
        }

        const newInformation = new Information();
        newInformation.message = message;

        const category = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :category_id', { category_id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (!category) {
            throw new BadRequestException('Category not found');
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


    //   async getAllInformation(): Promise<any[]>{
    //     const categories = await this.informationRepository.createQueryBuilder('information')
    //         .where('information.deletedAt IS NULL')
    //         .getMany();

    //         if (!categories || categories.length === 0) {
    //             throw new NotFoundException('Informations not found');
    //         }

    //         return categories.map(category => ({
    //             id: category.id,
    //             name: category.name,
    //             createdAt: category.createdAt,
    //             updatedAt: category.updatedAt,
    //         }));


    //     return 

    //   }


}
