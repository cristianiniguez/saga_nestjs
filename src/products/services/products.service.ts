import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
// import {
//   CreateProductDTO,
//   UpdateProductDTO,
// } from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll() {
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  // create(payload: CreateProductDTO) {
  //   this.counterId++;
  //   const newProduct = {
  //     id: this.counterId,
  //     ...payload,
  //   };
  //   this.products.push(newProduct);
  //   return newProduct;
  // }

  // update(id: number, payload: UpdateProductDTO) {
  //   const index = this.products.findIndex((item) => item.id === id);

  //   if (index === -1) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }

  //   this.products[index] = { ...this.products[index], ...payload };
  //   return this.products[index];
  // }

  // remove(id: number) {
  //   const index = this.products.findIndex((item) => item.id === id);

  //   if (index === -1) {
  //     throw new NotFoundException(`Product with id ${id} not found`);
  //   }

  //   this.products.splice(index, 1);
  //   return true;
  // }
}
