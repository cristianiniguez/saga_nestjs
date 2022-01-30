import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(data: CreateUserDTO) {
    const newUser = this.userRepo.create(data);
    return this.userRepo.save(newUser);
  }

  async update(id: number, data: UpdateUserDTO) {
    const user = await this.userRepo.findOne(id);

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    this.userRepo.merge(user, data);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.userRepo.delete(id);
  }

  async getOrdersByUser(id: number): Promise<Order[]> {
    const user = await this.findOne(id);
    const products = await this.productsService.findAll();
    return [{ date: new Date(), user, products }];
  }
}
