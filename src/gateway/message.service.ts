import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './entity/message';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async getMessage(): Promise<string> {
    const messageEntity = await this.messageRepository.findOne({ where: { id: 1 } });
    return messageEntity ? messageEntity.content : 'No message found';
  }

  async updateMessage(newMessage: string): Promise<void> {
    const messageEntity = await this.messageRepository.findOne({ where: { id: 1 } });
    if (messageEntity) {
      messageEntity.content = newMessage;
      await this.messageRepository.save(messageEntity);
    }
  }
}
