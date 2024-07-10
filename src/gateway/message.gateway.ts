import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: { origin: 'http://localhost:4200', credentials: true } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('getMessage')
  async handleMessage(client: any, payload: any): Promise<void> {
    const message = await this.messageService.getMessage();
    client.emit('message', message);
  }

  notifyClients() {
    this.server.emit('message', 'Message updated'); // Emit an event to all connected clients
  }
}
