import {
  IsArray,
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { CreateSkillDTO } from './skills.dto';
import { Type } from 'class-transformer';

export class CreateCustomerDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDTO)
  readonly skills: CreateSkillDTO[];
}

export class UpdateCustomerDTO extends PartialType(CreateCustomerDTO) {}
