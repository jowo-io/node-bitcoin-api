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

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

// ... routes will go here

module.exports = router;
