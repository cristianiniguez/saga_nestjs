import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  findAll(query?: FilterProductsDTO) {
    if (query) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset, minPrice, maxPrice } = query;

      if (minPrice && maxPrice)
        filters.price = { $gte: minPrice, $lte: maxPrice };

      return this.productModel
        .find(filters)
        .populate('brand')
        .skip(offset)
        .limit(limit)
        .exec();
    }

    return this.productModel.find().populate('brand').exec();
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
