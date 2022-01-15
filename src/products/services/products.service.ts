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

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);
    return this.productRepo.save(newProduct);
  }

  async update(id: number, data: UpdateProductDTO) {
    const product = await this.productRepo.findOne(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    this.productRepo.merge(product, data);
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepo.findOne(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return this.productRepo.delete(id);
  }
}
