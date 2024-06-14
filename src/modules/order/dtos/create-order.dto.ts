import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  product_id: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  company_id: string;

  @IsNotEmpty()
  @IsNumber()
  total_amount: number;

  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  order_items: OrderItemDto[];
}
