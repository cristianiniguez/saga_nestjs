import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';

import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';

import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { OrderItemsController } from './controllers/order-items.controller';
import { OrderItemsService } from './services/order-items.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
    ProductsModule,
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemsController,
  ],
  providers: [UsersService, CustomersService, OrdersService, OrderItemsService],
  exports: [UsersService],
})
export class UsersModule {}
