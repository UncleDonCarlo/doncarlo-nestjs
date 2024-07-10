import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { Categories } from './entity/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './entity/category.repository';
import { UserModule } from '../users/user.module';
import { InformationModule } from '../information/information.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Categories]),
    UserModule,
    forwardRef(() => InformationModule),
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    ResponseTemplate,
    {
      provide: 'CategoryRepository',
      useClass: CategoryRepository,
    },
  ],
  exports: ['CategoryRepository'],
})
export class CategoryModule {}
