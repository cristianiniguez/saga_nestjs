import { Injectable, NotFoundException } from '@nestjs/common';

import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';

const initialCustomers: Customer[] = [];

@Injectable()
export class CustomersService {
  private counterId = initialCustomers.length;
  private customers: Customer[] = initialCustomers;

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterId++;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const index = this.customers.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    this.customers[index] = { ...this.customers[index], ...payload };
    return this.customers[index];
  }

  remove(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    this.customers.splice(index, 1);
    return true;
  }
}
