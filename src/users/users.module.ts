import { Module } from '@nestjs/common';

import { User, UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from './entities/customer.entity';

import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';

import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
    ProductsModule,
  ],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
