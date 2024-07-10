import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageController } from './message.controller';
import { ResponseTemplate } from 'src/utils/responseTemplate/response.template';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { Message } from './entity/message';

@Module({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forFeature([Message]), //entity && repo
    ],
    controllers: [MessageController],
    providers: [
        MessageService,
        ResponseTemplate,
        MessageGateway
    ],
  })
export class MessageModule {}
