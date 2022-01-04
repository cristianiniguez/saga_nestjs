import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from 'src/products/entities/category.entity';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/dtos/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  create(data: CreateCategoryDTO) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }

  update(id: string, data: UpdateCategoryDTO) {
    const category = this.categoryModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return category;
  }

  remove(id: string) {
    const category = this.categoryModel.findByIdAndDelete(id).exec();

    if (!category)
      throw new NotFoundException(`Category with id ${id} not found`);

    return true;
  }
}
