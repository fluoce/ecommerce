import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('health')
  checkHealth() {
    return this.appService.checkHealth();
  }

  //TODO: remove this temp 
  @Get('test')
  async test() {
    return await this.appService.test()
  }
}
