import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { UserModule } from '../users/user.module';
import { CategoryModule } from '../category/category.module';
import { Project } from './entity/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { ProjectRepository } from './entity/project.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Project]),
    UserModule,
    forwardRef(() => CategoryModule),
  ],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    ResponseTemplate,
    {
      provide: 'projectRepository',
      useClass: ProjectRepository,
    },
  ],
  exports: ['projectRepository'],
})
export class ProjectModule {}
