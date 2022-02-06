import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsInt,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

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

  @IsPositive()
  @IsInt()
  @IsNotEmpty()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  readonly categoryIds: number[];
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}

export class FilterProductDTO {
  @IsInt()
  @IsPositive()
  @IsOptional()
  limit: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number;

  @ValidateIf((item) => item.maxPrice)
  @IsPositive()
  minPrice: number;

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
