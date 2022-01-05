import { IsArray, IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderDTO {
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsMongoId()
  @IsNotEmpty()
  readonly customer: string;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
