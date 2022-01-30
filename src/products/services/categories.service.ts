import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from 'src/products/entities/category.entity';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne(id);

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  create(data: CreateCategoryDTO) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, data: UpdateCategoryDTO) {
    const category = await this.categoryRepo.findOne(id);

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    this.categoryRepo.merge(category, data);
    return this.categoryRepo.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepo.findOne(id);

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return this.categoryRepo.delete(id);
  }
}
