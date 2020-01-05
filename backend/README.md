# node-bitcoin-api

This repo is based on the [tutorial here](https://medium.com/@peterjd42/build-your-own-bitcoin-api-using-node-js-and-bitcoin-core-251e613623db)

## Setup

Be sure to create a .env var containing your RPC login info (explained in the tutorial linked above).

Ensure you update the `bitcoin.conf` file in Bitcoin Core to the following:

```
rpcuser=bitcoinuser
rpcpassword=bitcoinpassword
txindex=1
```