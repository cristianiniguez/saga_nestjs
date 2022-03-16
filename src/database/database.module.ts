import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoClient } from 'mongodb';

import config from '../config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        return connection === 'mongodb+srv'
          ? {
              uri: `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`,
            }
          : {
              uri: `${connection}://${host}:${port}`,
              user,
              pass: password,
              dbName,
            };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === 'production' ? 'QWERTYUIP' : '123456789',
    },
  ],
  exports: ['API_KEY', MongooseModule],
})
export class DatabaseModule {}
