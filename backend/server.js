const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const rpcMethods = require("./routes/api");

const app = express();

const apiPath = "/api";

const corsOptions = {
    origin: "*"
};

app.use(apiPath, cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(apiPath, rpcMethods);

const port = process.env.PORT || 4004;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));
