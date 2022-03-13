import { SetMetadata } from '@nestjs/common';

import { Role } from '../models/role.model';

export const ROLES = 'roles';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);
