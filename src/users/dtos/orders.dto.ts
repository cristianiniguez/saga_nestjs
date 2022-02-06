import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderDTO {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly customerId: number;
}

export class UpdateOrderDTO extends PartialType(CreateOrderDTO) {}
