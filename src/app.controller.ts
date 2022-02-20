import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(ApiKeyGuard)
  @Get('new')
  newEndpoint() {
    return 'I am new';
  }

  @Get('/ruta/')
  otherEndpoint() {
    return 'hello again';
  }

  @Get('tasks')
  getTasks() {
    return this.appService.getTasks();
  }
}
