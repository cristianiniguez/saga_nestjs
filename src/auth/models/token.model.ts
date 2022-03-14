import { User } from 'src/users/entities/user.entity';

export interface PayloadToken {
  role: User['role'];
  sub: User['_id'];
}
