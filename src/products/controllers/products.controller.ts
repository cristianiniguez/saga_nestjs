import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    console.log({ limit, offset, brand });
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return `product filter`;
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDTO) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
