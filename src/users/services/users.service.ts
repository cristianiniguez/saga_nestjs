import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';

import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    private customerService: CustomersService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find({ relations: ['customer'] });
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne(id, { relations: ['customer'] });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async create(data: CreateUserDTO) {
    const newUser = this.userRepo.create(data);

    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }

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
}
