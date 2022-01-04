import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from 'src/users/dtos/customers.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    return customer;
  }

  create(data: CreateCustomerDTO) {
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  async update(id: string, data: UpdateCustomerDTO) {
    const customer = await this.customerModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    return customer;
  }

  async remove(id: string) {
    const customer = await this.customerModel.findByIdAndDelete(id).exec();

    if (!customer)
      throw new NotFoundException(`Customer with id ${id} not found`);

    return true;
  }
}
