import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';
import { OrdersService } from '../services/orders.service';
import { User } from '../entities/user.entity';

@Controller('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('profile')
export class ProfileController {
  constructor(private ordersService: OrdersService) {}

  @Get('my-orders')
  @Roles(Role.ADMIN)
  getOrders(@Req() req: Request) {
    const { customer } = req.user as User;
    if (!customer) return [];
    return this.ordersService.findByCustomer(customer.id);
  }
}
