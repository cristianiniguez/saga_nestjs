import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from 'src/users/dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    return customer;
  }

  create(data: CreateCustomerDTO) {
    const newCustomer = this.customerRepo.create(data);
    return this.customerRepo.save(newCustomer);
  }

  async update(id: number, data: UpdateCustomerDTO) {
    const customer = await this.customerRepo.findOne(id);

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    this.customerRepo.merge(customer, data);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne(id);

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    return this.customerRepo.delete(id);
  }
}
