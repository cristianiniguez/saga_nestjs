import { Body, Controller, Post } from '@nestjs/common';

import { OrderItemsService } from '../services/order-items.service';
import { CreateOrderItemDTO } from '../dtos/order-items.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() data: CreateOrderItemDTO) {
    return this.orderItemsService.create(data);
  }
}
