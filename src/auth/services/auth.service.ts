import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const { password: _, ...rta } = user.toJSON();
    return rta;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
