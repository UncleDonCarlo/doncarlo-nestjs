import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './http/users/user.module';
import { CategoryModule } from './http/category/category.module';
import { InformationModule } from './http/information/information.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProjectModule } from './http/project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    CategoryModule,
    ScheduleModule.forRoot(),
    InformationModule,
    ProjectModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}
