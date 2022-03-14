import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { ROLES } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/role.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES, context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user: PayloadToken = request.user;

    const hasRole = roles.some((role) => user.role === role);

    if (!hasRole)
      throw new UnauthorizedException(
        'You do not have permission to access this resource',
      );

    return true;
  }
}
