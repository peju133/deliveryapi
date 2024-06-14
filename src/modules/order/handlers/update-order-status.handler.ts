import { HttpException, Injectable } from '@nestjs/common';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { OrderWebsocketGateway } from '../websocket/order-ws-gateway';
import { PrismaService } from 'src/database/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class UpdateOrderStatusHandler {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly orderWebsocketGateway: OrderWebsocketGateway,
  ) {}

  async execute(
    data: UpdateOrderStatusDto,
    customerId: string,
  ): Promise<Order> {
    const { orderId, status } = data;

    const order = await this.prismaService.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new HttpException('Order not exist', 404);

    const orderUpdated = await this.prismaService.order.update({
      data: {
        status: status,
      },
      where: {
        id: orderId,
      },
    });

    this.orderWebsocketGateway.emitOrderStatusUpdate({
      orderId: orderUpdated.id,
      newStatus: orderUpdated.status,
      customerId,
    });

    return order;
  }
}
