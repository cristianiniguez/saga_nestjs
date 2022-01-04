import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CustomersService } from 'src/users/services/customers.service';
import {
  CreateCustomerDTO,
  UpdateCustomerDTO,
} from 'src/users/dtos/customers.dto';

@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomers() {
    return this.customersService.findAll();
  }

  @Get(':id')
  getCustomer(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDTO) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDTO) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
