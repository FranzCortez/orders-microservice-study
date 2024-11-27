import { OrderStatus } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { OrderStatusList } from '../enums/order.enum';

export class changeOrderStatusDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsEnum(OrderStatusList, {
    message: `status must be a valid enum value: ${OrderStatusList}`,
  })
  status: OrderStatus;
}
