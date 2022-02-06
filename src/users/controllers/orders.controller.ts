import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { OrdersService } from '../services/orders.service';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateOrderDTO) {
    return this.ordersService.create(data);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrderDTO) {
    return this.ordersService.update(id, data);
  }

  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
