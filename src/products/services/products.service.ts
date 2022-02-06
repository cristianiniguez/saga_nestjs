import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Brand } from '../entities/brand.entity';
import { Category } from '../entities/category.entity';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Brand)
    private readonly brandRepo: Repository<Brand>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['brand'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne(id, {
      relations: ['brand', 'categories'],
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  async create(data: CreateProductDTO) {
    const newProduct = this.productRepo.create(data);

    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      newProduct.brand = brand;
    }

    if (data.categoryIds) {
      const categories = await this.categoryRepo.findByIds(data.categoryIds);
      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, data: UpdateProductDTO) {
    const product = await this.productRepo.findOne(id);

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    if (data.brandId) {
      const brand = await this.brandRepo.findOne(data.brandId);
      product.brand = brand;
    }

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
