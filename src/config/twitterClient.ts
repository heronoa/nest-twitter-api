import { TwitterApi } from 'twitter-api-v2';

// const API = new TwitterApi({
//   clientId: 'CLIENT_ID',
//   clientSecret: 'CLIENT_SECRET',
// });
// const { accessToken } = await API.refreshOAuth2Token('YOUR_REFESHTOKEN');
// const client = new TwitterApi(accessToken);
// const tweet = await client.v2.tweet('It works!');
// console.log('Tweet Result', tweet);

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_KEY_SECRET,
  acessSecret: process.env.TWITTER_ACESS_TOKEN_SECRET,
  accessToken: process.env.TWITTER_ACESS_TOKEN,
} as any);

const bearer = new TwitterApi(process.env.TWITTER_BEARER_TOKEN as string);

export const twitterClient = client.readWrite;
export const twitterBearer = bearer.readOnly;
