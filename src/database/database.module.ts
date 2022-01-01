import { Global, Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === 'production' ? 'QWERTYUIP' : '123456789',
    },
    {
      provide: 'MONGO',
      useFactory: async () => {
        const uri = `mongodb://root:root@localhost:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db('platzi-store');
        return database;
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'],
})
export class DatabaseModule {}
