import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateOrderItemDTO {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly orderId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly productId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;
}

export class UpdateOrderItemDTO extends PartialType(CreateOrderItemDTO) {}
