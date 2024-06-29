import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/helloworld')
  @ApiResponse({
    status: 0,
    description:
      'Hello world route to check health of the API. Returns a string of "Hello World!"',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('twitter/me')
  @ApiResponse({
    status: 0,
    description: 'Twitter route to return the info of the twitter bot account',
  })
  twitterMe(): Promise<any> {
    return this.appService.twitterMe();
  }

  @Get('twitter/tweets/stream')
  @ApiResponse({
    status: 0,
    description:
      'Twitter route to listem to tweets that have #js and save on database post a tweet with the bot account.',
  })
  twitterStream(): Promise<any> {
    return this.appService.listenToHashtag();
  }

  @Get('twitter/tweets/:id')
  @ApiResponse({
    status: 0,
    description:
      'Twitter route to post a tweet with the bot account. That route post a tweet writing "It works!" and add to the prisma database the tweet id, the tweet txt and the timestamp of the tweet',
  })
  getTweets(@Param() params: { id: string }): Promise<any> {
    return this.appService.getTweets(params?.id || '');
  }
  // @Get('twitter/post/test')
  // @ApiResponse({
  //   status: 0,
  //   description:
  //     'Twitter route to post a tweet with the bot account. That route post a tweet writing "It works!" and add to the prisma database the tweet id, the tweet txt and the timestamp of the tweet',
  // })
  // twitterTest(): Promise<any> {
  //   return this.appService.twitterPost();
  // }
}
