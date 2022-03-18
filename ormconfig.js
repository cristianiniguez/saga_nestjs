/**
 * @typedef {import('typeorm').ConnectionOptions} ConnectionOptions
 * @type {ConnectionOptions}
 */
const connectionOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: ['src/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

module.exports = connectionOptions;
