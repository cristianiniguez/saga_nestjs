import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import config from './config';

@Injectable()
export class AppService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('PG') private pgClient: Client,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const dbName = this.configService.database.name;
    return `Hello World! ${apiKey} ${dbName}`;
  }

  getTasks() {
    return new Promise((resolve) => {
      this.pgClient.query('SELECT * FROM tasks', (err, res) => {
        err ? resolve([]) : resolve(res.rows);
      });
    });
  }
}
