import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { Categories } from './entity/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './entity/category.repository';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Categories,CategoryRepository]),
    UserModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService,ResponseTemplate,],
})
export class CategoryModule {}
