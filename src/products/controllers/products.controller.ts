import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDTO,
  FilterProductsDTO,
  UpdateProductDTO,
} from 'src/products/dtos/products.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() query: FilterProductsDTO) {
    return this.productsService.findAll(query);
  }

  @Get('filter')
  @Public()
  getProductFilter() {
    return `product filter`;
  }

  @Get(':id')
  @Public()
  getProduct(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() payload: CreateProductDTO) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
