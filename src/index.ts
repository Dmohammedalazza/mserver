import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { parseServer } from './parseServer';
// @ts-ignore
import ParseServer from 'parse-server';
import http from 'http';
import ngrok from 'ngrok';
import { streamsSync } from '@moralisweb3/parse-server';

// Import parseDashboard.ts //
import { parseDashboard } from "./parseDashboard";
// import bodyParser from 'body-parser';


export const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json({limit: '5mb'}));
// app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use(cors());



app.use(
  streamsSync(parseServer, {
    apiKey: config.MORALIS_API_KEY,
    webhookUrl: '/streams',
  }),
);

app.use(`/server`, parseServer.app);

// Add the new route //
app.use(`/dashboard`, parseDashboard);


// app.post("/streams", async (req, res) => {
//   console.log(req.body) 
//   console.log("Handled!")
//   res.send('Webhook response')
//   res.status(200)
//   // verifySignature(req, config.MORALIS_API_KEY);
//   // const { data, tagName, eventName }: any = parseEventData(req);
//   // console.log(data, tagName, eventName, "logged!");
//   // await parseUpdate(`SFS_${eventName}`, data);
//   // red.end()

// });

const httpServer = http.createServer(app);
httpServer.listen(config.PORT, async () => {
  if (config.USE_STREAMS) {
    await ngrok.authtoken(config.AUTH_TK);
    const url = await ngrok.connect(config.PORT);
    console.log(url)
    // eslint-disable-next-line no-console
    console.log(
      `Moralis Server is running on port ${config.PORT} and stream webhook url ${url}${config.STREAMS_WEBHOOK_URL}`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(`Moralis Server is running on port ${config.PORT}.`);
  }
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
