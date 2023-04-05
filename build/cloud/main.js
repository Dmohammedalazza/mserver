"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./generated/evmApi");
require("./generated/solApi");
const authService_1 = require("../auth/authService");
require("./cloud");
const config_1 = __importDefault(require("../config"));
const moralis_1 = __importDefault(require("moralis"));
// import Moralis from 'moralis';
const web3_1 = __importDefault(require("web3"));
// import Moralis from 'moralis';
// import Moralis from "moralis-v1";
const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(config_1.default.WEB3_PROVIDER_URL));
Parse.Cloud.define('requestMessage', async ({ params }) => {
    const { address, chain, networkType } = params;
    const message = await (0, authService_1.requestMessage)({
        address,
        chain,
        networkType,
    });
    return { message };
});
Parse.Cloud.define('getPluginSpecs', () => {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return [];
});
Parse.Cloud.define('getServerTime', () => {
    // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
    return null;
});
Parse.Cloud.define("startListening", async () => {
    console.log('hello world run');
    // Parse.Cloud.httpRequest({
    //      method: 'POST',
    //   url: 'https://airnai-ddc3.restdb.io/rest/airnai',
    //   headers: {
    //     "content-type": "application/json",
    //     "x-apikey": "62c00e68e91195203e3aa78d",
    //     "cache-control": "no-cache"
    //   },
    //    body: {
    //      addr_from: 'hey',
    //      addr_to: 'hoo',
    //      value: amount+'',
    //      time: '43340',
    //      brand: "TransactionEth"
    //    }
    // }).then(function(httpResponse: any) {
    //   // success
    //   console.log(httpResponse.text);
    // },function(httpResponse: any) {
    //   // error
    //   console.error('Request failed with response code ' + httpResponse.status);
    // });
    Parse.Cloud.afterSave("DemoTxs", async (request) => {
        console.log(JSON.stringify(request));
        if (request.object.get("confirmed") == false) {
            // const logger = Moralis.Cloud.getLogger();
            // logger.info("Got to Eth Transaction");
            var result = await web3.utils.fromWei(request.object.get("value"));
            Parse.Cloud.httpRequest({
                method: 'POST',
                url: 'https://airnai-ddc3.restdb.io/rest/airnai',
                headers: {
                    "content-type": "application/json",
                    "x-apikey": "62c00e68e91195203e3aa78d",
                    "cache-control": "no-cache"
                },
                body: {
                    addr_from: request.object.get("from_address"),
                    addr_to: request.object.get("to_address"),
                    value: result,
                    time: request.object.get("updatedAt"),
                    brand: "DemoTxs"
                }
            }).then(function (httpResponse) {
                //logger.info(httpResponse.text);
                //  logger.info("Logged Eth Trnasfer");\
                console.log(httpResponse.text);
            }, function (httpResponse) {
                // logger.error(JSON.stringify(httpResponse));
                console.log(JSON.stringify(httpResponse));
            });
        }
        else {
        }
    });
});
Parse.Cloud.define("textPassValue", async (request) => {
    return request;
});
Parse.Cloud.define("configureStreams", async () => {
    console.log('hello  configureStreams');
    //  Moralis.start({
    //    apiKey: config.MORALIS_API_KEY,
    //  });
    //  const stream = {
    //    chains: [EvmChain.ETHEREUM, EvmChain.POLYGON, EvmChain.], // list of blockchains to monitor
    //    description: "monitor Bobs wallet", // your description
    //   tag: "bob", // give it a tag
    //    webhookUrl: "https://YOUR_WEBHOOK_URL", // webhook url to receive events,
    //    includeNativeTxs: true
    //  }
    //  const newStream = await Moralis.Streams.add(stream);
    //  const { id } = newStream.toJSON(); // { id: 'YOUR_STREAM_ID', ...newStream }
    // // Now we attach bobs address to the stream
    //  const address = "0x68b3f12d6e8d85a8d3dbbc15bba9dc5103b888a4";
    //  await Moralis.Streams.addAddress({ address, id });
    const id = config_1.default.STREAM_ID;
    await moralis_1.default.Streams.addAddress({
        id: id,
        address: [
            "0x5C32e67AE922eF554Cd6d3B11C6Da300fdA008b1"
        ], // Can also be a single string
    });
    var addrescount = await moralis_1.default.Streams.getAddresses({
        limit: 100,
        id
    });
    return addrescount;
});
//# sourceMappingURL=main.js.map