import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';

import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly productsService: ProductsService,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(data: CreateUserDTO) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  async remove(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return true;
  }

  async getOrdersByUser(id: string) {
    const user = await this.findOne(id);

    return [
      {
        date: new Date(),
        user,
        products: await this.productsService.findAll(),
      },
    ];
  }
}
