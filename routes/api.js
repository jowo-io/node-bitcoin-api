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
    "getblockcount",
    "getbestblockhash",
    "getconnectioncount",
    "getdifficulty",
    "getblockchaininfo",
    "getmininginfo",
    "getpeerinfo",
    "getrawmempool"
];

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

methodsList.forEach(method => {
    router.get(`/${method}`, (req, res) => {
        const body = JSON.stringify({
            jsonrpc: "1.0",
            id: "curltext",
            method,
            params: []
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
