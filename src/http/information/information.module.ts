import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { UserModule } from '../users/user.module';
import { Information } from './entity/information.entity';
import { InformationRepository } from './entity/information.repository';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Information]),
    UserModule,
    CategoryModule,
  ],
  controllers: [InformationController],
  providers: [
    InformationService,
    ResponseTemplate,
    {
      provide: 'InformationRepository',
      useClass: InformationRepository,
    },
  ],
})
export class InformationModule {}
