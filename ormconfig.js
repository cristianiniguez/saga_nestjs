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
  entities: ['dist/**/*.entity.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};

module.exports = connectionOptions;
