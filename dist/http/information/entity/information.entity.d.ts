import { Categories } from 'src/http/category/entity/category.entity';
export declare class Information {
    id: number;
    message: string;
    isPublish: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    categories: Categories[];
}
