import { Injectable, NotFoundException } from '@nestjs/common';

import { Brand } from 'src/products/entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';

const initialBrands: Brand[] = [];

@Injectable()
export class BrandsService {
  private counterId = initialBrands.length;
  private brands: Brand[] = initialBrands;

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);

    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    return brand;
  }

  create(payload: CreateBrandDto) {
    this.counterId++;
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    this.brands[index] = { ...this.brands[index], ...payload };
    return this.brands[index];
  }

  remove(id: number) {
    const index = this.brands.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }

    this.brands.splice(index, 1);
    return true;
  }
}
