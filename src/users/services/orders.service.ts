import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  create(data: CreateOrderDTO) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async update(id: string, data: UpdateOrderDTO) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return order;
  }

  async remove(id: string) {
    const order = await this.orderModel.findByIdAndDelete(id).exec();

    if (!order) throw new NotFoundException(`Order with id ${id} not found`);
    return true;
  }
}
