import { Injectable, NotFoundException } from '@nestjs/common';

import { Category } from 'src/products/entities/category.entity';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/dtos/categories.dto';

const initialCategories: Category[] = [];

@Injectable()
export class CategoriesService {
  private counterId = initialCategories.length;
  private categories: Category[] = initialCategories;

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  create(payload: CreateCategoryDTO) {
    this.counterId++;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDTO) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    this.categories[index] = { ...this.categories[index], ...payload };
    return this.categories[index];
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);

    if (index === -1) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    this.categories.splice(index, 1);
    return true;
  }
}
