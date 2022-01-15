import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    const product = this.productRepo.findOne(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

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
