import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';

const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'bla bla',
    price: 122,
    image: '',
    stock: 12,
  },
];

@Injectable()
export class ProductsService {
  private counterId = initialProducts.length;
  private products: Product[] = initialProducts;

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductDTO) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDTO) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    this.products[index] = { ...this.products[index], ...payload };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    this.products.splice(index, 1);
    return true;
  }
}
