import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {}
