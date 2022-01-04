import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  create(data: CreateProductDTO) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }

  async update(id: string, data: UpdateProductDTO) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).exec();

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return true;
  }
}
