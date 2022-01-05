import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDTO } from './categories.dto';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly category: CreateCategoryDTO;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductsDTO {
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  limit: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsNumber()
  @Min(0)
  maxPrice: number;
}
