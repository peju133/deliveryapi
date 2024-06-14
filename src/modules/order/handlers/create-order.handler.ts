import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class CreateOrderHandler {
  constructor(private prismaService: PrismaService) {}

  async execute(
    createOrderDto: CreateOrderDto,
    customer_id: string,
  ): Promise<Order> {
    const { company_id, total_amount, order_items } = createOrderDto;

    const savedOrder = await this.prismaService.order.create({
      data: {
        company_id,
        customer_id,
        total_amount,
        order_items: {
          create: order_items,
        },
      },
    });

    return savedOrder;
  }
}
