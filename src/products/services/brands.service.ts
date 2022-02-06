import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import { CreateBrandDTO, UpdateBrandDTO } from 'src/products/dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepo.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepo.findOne(id, { relations: ['products'] });
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  create(data: CreateBrandDTO) {
    const newBrand = this.brandRepo.create(data);
    return this.brandRepo.save(newBrand);
  }

  async update(id: number, data: UpdateBrandDTO) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    this.brandRepo.merge(brand, data);
    return this.brandRepo.save(brand);
  }

  async remove(id: number) {
    const brand = await this.brandRepo.findOne(id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return this.brandRepo.delete(id);
  }
}
