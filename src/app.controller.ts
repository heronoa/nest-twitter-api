import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('twitter/me')
  twitterMe(): Promise<any> {
    return this.appService.twitterMe();
  }
  @Get('twitter/post/test')
  twitterTest(): Promise<any> {
    return;
  }
}
