import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue:
        process.env.NODE_ENV === 'production' ? 'QWERTYUIO' : '123456789',
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos'),
        );
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
