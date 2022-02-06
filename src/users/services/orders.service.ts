import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDTO, UpdateOrderDTO } from '../dtos/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async findOne(id: number) {
    const order = this.orderRepo.findOne(id, {
      relations: ['items', 'items.product'],
    });
    if (!order) throw new Error(`Order with id ${id} not found`);
    return order;
  }

  async create(data: CreateOrderDTO) {
    const newOrder = new Order();

    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      newOrder.customer = customer;
    }

    return this.orderRepo.save(newOrder);
  }

  async update(id: number, data: UpdateOrderDTO) {
    const order = await this.findOne(id);

    if (data.customerId) {
      const customer = await this.customerRepo.findOne(data.customerId);
      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
