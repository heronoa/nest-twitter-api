import { Injectable } from '@nestjs/common';
import { TwitterService } from './config/twitter.services';
import { PrismaService } from './database/prisma.services';
import { ETwitterStreamEvent } from 'twitter-api-v2';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private twitter: TwitterService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async setStreamRules(): Promise<any> {
    try {
      const client = this.twitter.client;

      const rules = await client.v2.streamRules();
      // Delete pre existing rules
      if (rules.data?.length) {
        await client.v2.updateStreamRules({
          delete: { ids: rules.data.map((rule) => rule.id) },
        });
      }

      // Add our rules
      await client.v2.updateStreamRules({
        add: [{ tag: 'Find Javascript tags', value: 'javascript' }],
      });
    } catch (err) {
      console.log('[Twitter Error] ' + err);
    }
  }

  async getStream(): Promise<any> {
    try {
      const client = this.twitter.client;

      const stream = await client.v2
        .searchStream({
          'tweet.fields': ['referenced_tweets', 'author_id'],
          expansions: ['referenced_tweets.id'],
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      // Enable auto reconnect
      stream.autoReconnect = true;

      return stream;
    } catch (err) {
      (err) => console.log('Twitter Error', err);
      return err;
    }
  }

  async twitterMe(): Promise<any> {
    try {
      console.log('[start] Twitter API me route');

      const userV2 = await this.twitter.client.currentUserV2();
      const userV1 = await this.twitter.client.currentUser();

      return {
        user: {
          v1: userV1,
          v2: userV2,
        },
      };
    } catch (err) {
      (err) => console.log('Twitter Error', err);
      return err;
    }
  }

  async getTweets(username: string, query = ''): Promise<any> {
    try {
      if (username === '') {
        throw new Error('Missing username parameter');
      }

      console.log(
        '[start] Twitter API Tweets route',
        `Params: ${username}, ${query}`,
      );

      const tweets = await this.twitter.client.search(
        `from:${username} ${query}`,
      );

      return tweets.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async listenToHashtag(): Promise<void> {
    try {
      const client = this.twitter.client;
      const meAsUser = await this.twitter.client.currentUserV2();

      const rules = await client.v2.streamRules();
      // Delete pre existing rules
      if (rules.data?.length) {
        await client.v2.updateStreamRules({
          delete: { ids: rules.data.map((rule) => rule.id) },
        });
      }

      // Add our rules
      await client.v2.updateStreamRules({
        add: [{ tag: 'Find Javascript tags', value: '#js ' }],
      });

      const stream = await client.v2
        .searchStream({
          'tweet.fields': ['referenced_tweets', 'author_id'],
          expansions: ['referenced_tweets.id'],
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
      // Enable auto reconnect
      stream.autoReconnect = true;

      stream.on(ETwitterStreamEvent.Data, async (tweet) => {
        // Ignore RTs or self-sent tweets
        const isARt =
          tweet.data.referenced_tweets?.some(
            (tweet) => tweet.type === 'retweeted',
          ) ?? false;
        if (isARt || tweet.data.author_id === meAsUser.data.id) {
          return;
        }

        console.log({ tweet });

        // save on prisma

        this.prisma.tweets.create({
          data: {
            text: tweet.data.text,
            date:
              String(new Date(tweet.data.created_at).getTime()) ||
              String(Date.now()),
            id: tweet.data.id,
          },
        });

        // Reply to tweet
        // await client.v1.reply(
        //   'Did you talk about JavaScript? love it!',
        //   tweet.data.id,
        // );
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  // async twitterPost(): Promise<any> {
  //   try {
  //     console.log('[start] Twitter API create tweet');

  //     const txt = 'It works!';

  //     const tweet = await this.twitter.client.v2.tweet(txt);

  //     await this.prisma.tweets.create({
  //       data: {
  //         id: tweet.data.id as string,
  //         text: txt,
  //         date: String(Date.now()),
  //       },
  //     });

  //     return tweet;
  //     // console.log('Tweet Result', tweet);
  //   } catch (err) {
  //     return err;
  //   }
  // }
  // async twitterDelete(id: string): Promise<any> {
  //   try {
  //     console.log('[start] Twitter API delete tweet');

  //     const tweet = await this.twitter.client.v2.deleteTweet(id);

  //     await this.prisma.tweets.delete({
  //       where: {
  //         id,
  //       },
  //     });

  //     return tweet;
  //     // console.log('Tweet Result', tweet);
  //   } catch (err) {
  //     return err;
  //   }
  // }
}
