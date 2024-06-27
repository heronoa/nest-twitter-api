import { Injectable } from '@nestjs/common';
import { twitterClient } from './config/twitterClient';
import { PrismaService } from './database/prisma.services';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async twitterMe(): Promise<any> {
    try {
      console.log('[start] Twitter API me route');

      const lookupTweetById = await twitterClient.v2
        .me()
        .catch((err) => console.log('Twitter Error', err));

      return lookupTweetById;
    } catch (err) {
      return err;
    }
  }

  async twitterPost(): Promise<any> {
    try {
      console.log('[start] Twitter API create tweet');

      const txt = 'It works!';

      const tweet = await twitterClient.v2.tweet(txt);

      await this.prisma.tweets.create({
        data: {
          id: tweet.data.id as string,
          text: txt,
          date: String(Date.now()),
        },
      });

      return tweet;
      // console.log('Tweet Result', tweet);
    } catch (err) {
      return err;
    }
  }
  async twitterDelete(id: string): Promise<any> {
    try {
      console.log('[start] Twitter API delete tweet');

      const tweet = await twitterClient.v2.deleteTweet(id);

      await this.prisma.tweets.delete({
        where: {
          id,
        },
      });

      return tweet;
      // console.log('Tweet Result', tweet);
    } catch (err) {
      return err;
    }
  }
}
