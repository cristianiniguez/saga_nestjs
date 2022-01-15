import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },
  postgres: {
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
  },
  mysql: {
    dbName: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: +process.env.MYSQL_PORT,
    host: process.env.MYSQL_HOST,
  },
  apiKey: process.env.API_KEY,
}));
