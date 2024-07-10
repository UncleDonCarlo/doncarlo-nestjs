import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly messageGateway: MessageGateway
  ) {}

  @Post('update')
  async updateMessage(@Body('message') newMessage: string): Promise<void> {
    await this.messageService.updateMessage(newMessage);
    this.messageGateway.notifyClients(); // Notify clients after updating message
  }
}
