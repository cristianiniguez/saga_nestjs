import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsInt,
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
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
