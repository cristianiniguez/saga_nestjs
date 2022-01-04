import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brand } from 'src/products/entities/brand.entity';
import { CreateBrandDTO, UpdateBrandDTO } from 'src/products/dtos/brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  create(data: CreateBrandDTO) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async update(id: string, data: UpdateBrandDTO) {
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: data }, { new: true })
      .exec();

    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);

    return brand;
  }

  async remove(id: string) {
    const brand = await this.brandModel.findByIdAndDelete(id).exec();
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return true;
  }
}
