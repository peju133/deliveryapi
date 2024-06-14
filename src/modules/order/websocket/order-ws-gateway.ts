import { Cache } from '@nestjs/cache-manager';
import { Injectable, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthUser } from 'src/decorators/auth/user/user.decorator';
import { WebSocketAuthGuard } from 'src/guards/auth/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class OrderWebsocketGateway {
  constructor() {}

  @WebSocketServer()
  server: Server;

  @UseGuards(WebSocketAuthGuard)
  @SubscribeMessage('orderObservation')
  async orderObservation(@ConnectedSocket() client: Socket, @AuthUser() user) {
    console.log('Conexão estabelecida:', `${user.username}`);
    client.join(`order:${user.id}`);
  }

  @SubscribeMessage('order/status')
  async emitOrderStatusUpdate(
    @MessageBody()
    data: {
      orderId: string;
      newStatus: string;
      customerId: string;
    },
  ): Promise<WsResponse<unknown>> {
    this.server.to(`order:${data.customerId}`).emit('order/status', data);
    return { event: 'order/status', data };
  }
}
