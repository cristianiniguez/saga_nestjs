import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';

import { ProductsService } from '../../products/services/products.service';

const initialUsers: User[] = [];

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}

  private counterId = initialUsers.length;
  private users: User[] = initialUsers;

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log({ apiKey, dbName });

    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  create(payload: CreateUserDTO) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDTO) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users[index] = { ...this.users[index], ...payload };
    return this.users[index];
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(index, 1);
    return this.users;
  }

  getOrdersByUser(id: number): Order[] {
    const user = this.findOne(id);

    return [
      {
        date: new Date(),
        user,
        products: this.productsService.findAll(),
      },
    ];
  }
}
