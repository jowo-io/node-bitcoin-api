const express = require("express");
const rp = require("request-promise");
const dotenv = require("dotenv");
const get = require("lodash.get");

const router = express.Router();
dotenv.config();

const PORT = process.env.RPC_PORT;
const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
    "content-type": "text/plain;"
};

const methodsList = [
    { method: "getblockcount" },
    { method: "getbestblockhash" },
    { method: "getconnectioncount" },
    { method: "getdifficulty" },
    { method: "getblockchaininfo" },
    { method: "getmininginfo" },
    { method: "getpeerinfo" },
    { method: "getrawmempool" },
    { method: "getblock", params: ["hash"] },
    { method: "getblockhash", params: ["index"] },
    { method: "getrawtransaction", params: ["txid", "verbose"] },
    { method: "gettransaction", params: ["txid"] }
];

/**
 * boilerplate for generating an options object for
 * a bitcoin RPC request
 *
 * @param {object} method
 * @param {object} params
 */
function getOptions(method, params) {
    const body = JSON.stringify({
        jsonrpc: "1.0",
        id: "curltext",
        method,
        params
    });

    const options = {
        url: `http://${USER}:${PASS}@127.0.0.1:${PORT}/`,
        method: "POST",
        headers,
        body
    };

    return options;
}

/**
 * fires off an async request with some
 * boilerplate configured for processing
 * the responses data from the bitcoin RPC.
 *
 * @param {object} options
 */
function rpcRequest(options) {
    return new Promise((resolve, reject) => {
        return rp({ ...options, resolveWithFullResponse: true })
            .then(response => {
                const is200 = response.statusCode == 200;
                if (is200) {
                    const result = JSON.parse(response.body).result;
                    resolve(result);
                } else if (!is200) {
                    reject(response.statusCode);
                }
            })
            .catch(error => {
                console.error(error.response.body);
                reject(500);
            });
    });
}

// RPC

/**
 * generic endpoint generator.
 * you can add more endpoints to the `methodInfo` map
 */
methodsList.forEach(methodInfo => {
    const path = `/rpc/${methodInfo.method}`;

    router.post(path, (req, res) => {
        const params = {};

        if (methodInfo.params) {
            methodInfo.params.forEach(param => {
                params[param] = req.body[param];
            });
        }

        const options = getOptions(methodInfo.method, params);
        return rpcRequest(options)
            .then(result => res.send({ result }))
            .catch(statusCode => res.status(statusCode).send(""));
    });
});

// CUSTOM

router.post("/custom/test", (req, res) => res.json({ msg: "Message from the backend!" }));

/**
 * This endpoint jumps through all the hoops of lookup up the
 * coinbase transaction message starting with an input of only
 * the height of the block required.
 */
router.post("/custom/getblockcoinbase", (req, res) => {
    return Promise.resolve()
        .then(() => {
            const options = getOptions("getblockhash", {
                height: Number(req.body.height)
            });
            return rpcRequest(options);
        })
        .then(blockhash => {
            const options = getOptions("getblock", {
                blockhash,
                verbose: 1
            });
            return rpcRequest(options);
        })
        .then(block => {
            const options = getOptions("getrawtransaction", {
                txid: get(block, "tx.0"),
                verbose: 1
            });
            return rpcRequest(options);
        })
        .then(tx => get(tx, "vin.0.coinbase"))
        .then(result => res.send({ result }))
        .catch(statusCode => res.status(statusCode).send(""));
});

module.exports = router;
