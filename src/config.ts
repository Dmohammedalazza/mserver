import * as dotenv from 'dotenv';
import { cleanEnv, num, str, bool } from 'envalid';

dotenv.config();

export default cleanEnv(process.env, {
  MORALIS_API_KEY: str({
    desc: 'Your moralis Api key (keep this secret)',
  }),

  PORT: num({
    desc: 'Default port wher parse-server will run on',
    default: 1337,
  }),
  DATABASE_URI: str({
    desc: 'URI to your MongoDB database',
    devDefault: 'mongodb://localhost:27017',
  }),
  CLOUD_PATH: str({
    desc: 'Path to your cloud code',
    default: './build/cloud/main.js',
  }),
  MASTER_KEY: str({
    desc: 'A secret key of your choice (keep this secret)',
  }),
  APPLICATION_ID: str({
    desc: 'An id for your app, can be anything you want',
    default: 'APPLICATION_ID',
  }),
  SERVER_URL: str({
    desc: 'Referenece to your server URL. Replace this when your app is hosted',
    devDefault: 'http://localhost:1337/server',
  }),

  AUTH_TK: str({
    desc: 'Auth Token Value',
    devDefault: '2TXnTi6GR74mZgdqDWvla6MzDAZ_84zy72LHhhA3y6XZ9Mroo',
  }),

  

  WEB3_PROVIDER_URL: str({
    desc: 'Web3 provider url',
    default: 'APPLICATION_ID',
  }),

  REDIS_CONNECTION_STRING: str({
    desc: 'Connection string for your redis instance in the format of redis://<host>:<port> or redis://<username>:<password>@<host>:<port>',
    // devDefault: 'redis://127.0.0.1:6379',
    devDefault: 'redis://dmohammed:hvVyIooY2vhjcQCqhvVyIooY2vhjcQCq1!@redis-12355.c299.asia-northeast1-1.gce.cloud.redislabs.com:12355'
  }),
  RATE_LIMIT_TTL: num({
    desc: 'Rate limit window in seconds',
    default: 30,
  }),
  RATE_LIMIT_AUTHENTICATED: num({
    desc: 'Rate limit requests per window for authenticated users',
    default: 50,
  }),
  RATE_LIMIT_ANONYMOUS: num({
    desc: 'Rate limit requests per window for anonymous users',
    default: 20,
  }),
  USE_STREAMS: bool({
    desc: 'Enable streams sync',
    default: false,
  }),
  STREAMS_WEBHOOK_URL: str({
    desc: 'Webhook url for streams sync',
    default: '/streams-webhook',
  }),

  STREAM_ID: str({
    desc: 'Stream ID',
    default: 'ec02f731-5c6c-4561-a97b-41aa8df88618',
  }),


  ADMIN: str({
    desc: 'Username',
    default: 'admin',
  }),

  PASS: str({
    desc: 'Password',
    default: '88admin00',
  }),
  
});
