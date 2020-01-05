const express = require("express");
const router = express.Router();
var request = require("request");

const dotenv = require("dotenv");
dotenv.config();

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
    { method: "getblock", param: "hash" },
    { method: "getblockhash", param: "index" },
    { method: "getrawtransaction", param: "id" },
    { method: "decoderawtransaction", param: "hex" }
];

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

methodsList.forEach(methodInfo => {
    let path = `/${methodInfo.method}`;
    if (methodInfo.param) {
        path += `/:${methodInfo.param}`;
    }

    router.get(path, (req, res) => {
        let params = [];
        if (methodInfo.param) {
            params.push(req.params[methodInfo.param]);
        }

        const body = JSON.stringify({
            jsonrpc: "1.0",
            id: "curltext",
            method: methodInfo.method,
            params
        });

        const options = {
            url: `http://${USER}:${PASS}@127.0.0.1:8332/`,
            method: "POST",
            headers,
            body
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const data = JSON.parse(body);
                res.send(data);
            }
        }

        request(options, callback);
    });
});

module.exports = router;