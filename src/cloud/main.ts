/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
declare const Parse: any;
import './generated/evmApi';
import './generated/solApi';
import { requestMessage } from '../auth/authService';
import "./cloud";
import config from '../config';
import Moralis from 'moralis';
import { EvmChain } from "@moralisweb3/common-evm-utils";

// import Moralis from 'moralis';
import Web3 from 'web3';
// import Moralis from 'moralis';
// import Moralis from "moralis-v1";
const web3 = new  Web3(new Web3.providers.HttpProvider(config.WEB3_PROVIDER_URL))
Parse.Cloud.define('requestMessage', async ({ params }: any) => {
  const { address, chain, networkType } = params;

  const message = await requestMessage({
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

  Parse.Cloud.afterSave("DemoTxs", async  (request: any) => {
    console.log(JSON.stringify(request));
  
    if(request.object.get("confirmed") == false) {
             
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
   }).then(function(httpResponse: any) {
     //logger.info(httpResponse.text);
      //  logger.info("Logged Eth Trnasfer");\
      console.log(httpResponse.text);
   }, function(httpResponse: any) {
      // logger.error(JSON.stringify(httpResponse));
      console.log(JSON.stringify(httpResponse));
   });
      
       
     }
     else { 
     
  
     
     }
  
     
   });
   
});





Parse.Cloud.define("textPassValue", async (request: any) => {
 
  return request;

} )


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
const id = config.STREAM_ID
await Moralis.Streams.addAddress({
  id: id,
  address: [
    "0x5C32e67AE922eF554Cd6d3B11C6Da300fdA008b1"
  ], // Can also be a single string
});

var addrescount = await Moralis.Streams.getAddresses({
  limit: 100,
  id });

return addrescount 

} )