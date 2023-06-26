"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const envalid_1 = require("envalid");
dotenv.config();
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    MORALIS_API_KEY: (0, envalid_1.str)({
        desc: 'Your moralis Api key (keep this secret)',
    }),
    PORT: (0, envalid_1.num)({
        desc: 'Default port wher parse-server will run on',
        default: 1337,
    }),
    DATABASE_URI: (0, envalid_1.str)({
        desc: 'URI to your MongoDB database',
        devDefault: 'mongodb://localhost:27017',
    }),
    CLOUD_PATH: (0, envalid_1.str)({
        desc: 'Path to your cloud code',
        default: './build/cloud/main.js',
    }),
    MASTER_KEY: (0, envalid_1.str)({
        desc: 'A secret key of your choice (keep this secret)',
    }),
    APPLICATION_ID: (0, envalid_1.str)({
        desc: 'An id for your app, can be anything you want',
        default: 'APPLICATION_ID',
    }),
    SERVER_URL: (0, envalid_1.str)({
        desc: 'Referenece to your server URL. Replace this when your app is hosted',
        devDefault: 'http://localhost:1337/server',
    }),
    AUTH_TK: (0, envalid_1.str)({
        desc: 'Auth Token Value',
        devDefault: '2RjvMbX7SpWYHTo8avOQNUyc3TI_rbw3QaCsdeHHPziBSShg',
    }),
    WEB3_PROVIDER_URL: (0, envalid_1.str)({
        desc: 'Web3 provider url',
        default: 'APPLICATION_ID',
    }),
    REDIS_CONNECTION_STRING: (0, envalid_1.str)({
        desc: 'Connection string for your redis instance in the format of redis://<host>:<port> or redis://<username>:<password>@<host>:<port>',
        // devDefault: 'redis://127.0.0.1:6379',
        devDefault: 'redis://dmohammed:hvVyIooY2vhjcQCqhvVyIooY2vhjcQCq1!@redis-12355.c299.asia-northeast1-1.gce.cloud.redislabs.com:12355'
    }),
    RATE_LIMIT_TTL: (0, envalid_1.num)({
        desc: 'Rate limit window in seconds',
        default: 30,
    }),
    RATE_LIMIT_AUTHENTICATED: (0, envalid_1.num)({
        desc: 'Rate limit requests per window for authenticated users',
        default: 50,
    }),
    RATE_LIMIT_ANONYMOUS: (0, envalid_1.num)({
        desc: 'Rate limit requests per window for anonymous users',
        default: 20,
    }),
    USE_STREAMS: (0, envalid_1.bool)({
        desc: 'Enable streams sync',
        default: false,
    }),
    STREAMS_WEBHOOK_URL: (0, envalid_1.str)({
        desc: 'Webhook url for streams sync',
        default: '/streams-webhook',
    }),
    STREAM_ID: (0, envalid_1.str)({
        desc: 'Stream ID',
        default: 'ec02f731-5c6c-4561-a97b-41aa8df88618',
    }),
    ADMIN: (0, envalid_1.str)({
        desc: 'Username',
        default: 'admin',
    }),
    PASS: (0, envalid_1.str)({
        desc: 'Password',
        default: '88admin00',
    }),
});
//# sourceMappingURL=config.js.map