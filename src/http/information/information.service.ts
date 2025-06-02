import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Information } from './entity/information.entity';
import { InformationRepository } from './entity/information.repository';
import { InformationRequest } from './dto/informationRequest';
import { CategoryRepository } from '../category/entity/category.repository';
import { PutPublishRequest } from './dto/putIsPublishRequest';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Cron, Interval } from '@nestjs/schedule';

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

    async getAllInformation(page: number, limit: number): Promise<Pagination<Information>> {
        const queryBuilder = this.informationRepository.createQueryBuilder('information');
        queryBuilder.where('information.deletedAt IS NULL');

        return paginate<Information>(queryBuilder, { page, limit });
    }

    async updatePublish(putPublishRequest: PutPublishRequest): Promise<any> {
        const { id, isPublish } = putPublishRequest;
        const existingInformation = await this.informationRepository.createQueryBuilder('information')
            .where('information.id = :id', { id })
            .andWhere('information.deletedAt IS NULL')
            .getOne();

        if (!existingInformation) {
            throw new NotFoundException(`Information ID was not found.`);
        }

        existingInformation.isPublish = isPublish;
        await this.informationRepository.save(existingInformation);

        return "Updated information Status Successfully!";
    }

    async modifyInformation(id: number, informationRequest: InformationRequest): Promise<any> {
        const { message, category_id } = informationRequest;

        const information = await this.informationRepository.createQueryBuilder('information')
            .where('information.id = :id', { id })
            .andWhere('information.deletedAt IS NULL')
            .getOne();

        if (!information) {
            throw new NotFoundException('Information not found');
        }

        const existingInformation = await this.informationRepository.createQueryBuilder('information')
            .where('information.message = :message', { message })
            .andWhere('information.deletedAt IS NULL')
            .andWhere('information.id != :id', { id })
            .getOne();

        if (existingInformation) {
            throw new BadRequestException('Information is already exist');
        }

        const existingcategory = await this.categoryRepository.createQueryBuilder('category')
            .where('category.id = :category_id', { category_id })
            .andWhere('category.deletedAt IS NULL')
            .getOne();

        if (!existingcategory) {
            throw new NotFoundException('Category not found');
        }

        information.message = message;
        information.categories = [existingcategory];
        information.updatedAt = new Date();

        console.log(information)
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

    async deleteInformation(id: number): Promise<any> {
        const information = await this.informationRepository.createQueryBuilder('information')
            .where('information.id = :id', { id })
            .andWhere('information.deletedAt IS NULL')
            .getOne();

        if (!information) {
            throw new NotFoundException('Information was not found');
        }

        information.deletedAt = new Date();
        await this.informationRepository.save(information);

        return {
            "Delete Category ": information.message + " Succesfully"
        }
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
        } catch (error) {
            console.error('Failed to fetch data from API', error);
        }
    }


    @Cron('17 21 * * *')
    handleInterval() {
        console.log('Fetching data from API at 3:01 PM');
        this.fetchDataFromApi();
    }



}
