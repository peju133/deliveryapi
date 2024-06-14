import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { CreateOrderHandler } from './handlers/create-order.handler';
import { OrderWebsocketGateway } from './websocket/order-ws-gateway';
import { UpdateOrderStatusHandler } from './handlers/update-order-status.handler';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [JwtModule],
  controllers: [OrderController],
  providers: [
    PrismaService,
    CreateOrderHandler,
    UpdateOrderStatusHandler,
    OrderWebsocketGateway,
  ],
})
export class OrderModule {}
