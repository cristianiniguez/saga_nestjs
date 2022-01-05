import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { OrdersService } from '../services/orders.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  AddProductsToOrderDTO,
  CreateOrderDTO,
  UpdateOrderDTO,
} from '../dtos/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  getOrder(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDTO) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDTO,
  ) {
    return this.ordersService.update(id, payload);
  }

  @Put(':id/products')
  addProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDTO,
  ) {
    return this.ordersService.addProducts(id, payload.products);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.remove(id);
  }

  @Delete(':id/products/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
