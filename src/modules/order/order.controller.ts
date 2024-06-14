import { Controller, Post, Body, Put, UseGuards } from '@nestjs/common';
import { CreateOrderHandler } from './handlers/create-order.handler';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';
import { UpdateOrderStatusHandler } from './handlers/update-order-status.handler';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthUser } from 'src/decorators/auth/user/user.decorator';
import { Order } from '@prisma/client';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderHandler: CreateOrderHandler,
    private readonly updateOrderStatusHandler: UpdateOrderStatusHandler,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @AuthUser() user,
  ): Promise<Order> {
    return await this.createOrderHandler.execute(createOrderDto, user.id);
  }

  @UseGuards(AuthGuard)
  @Put('/status')
  async updateOrderStatus(
    @Body() body: UpdateOrderStatusDto,
    @AuthUser() user,
  ): Promise<Order> {
    return await this.updateOrderStatusHandler.execute(body, user.id);
  }
}
