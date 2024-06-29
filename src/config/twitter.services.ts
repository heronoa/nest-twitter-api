import {
  TwitterApi,
  TwitterApiReadOnly,
  TwitterApiReadWrite,
} from 'twitter-api-v2';

import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class TwitterService implements OnModuleInit {
  client: TwitterApiReadWrite;
  bearer: TwitterApiReadOnly;

  async onModuleInit() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_KEY_SECRET,
      accessSecret: process.env.TWITTER_ACESS_TOKEN_SECRET,
      accessToken: process.env.TWITTER_ACESS_TOKEN,
    } as any).readWrite;

    this.bearer = new TwitterApi(
      process.env.TWITTER_BEARER_TOKEN as string,
    ).readOnly;
  }
}
