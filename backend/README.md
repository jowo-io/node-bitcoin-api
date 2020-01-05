## Setup

Be sure to create a .env var containing your RPC login info (explained in the tutorial linked above).

Ensure you update the `bitcoin.conf` file in Bitcoin Core to the following:

```
rpcuser=bitcoinuser
rpcpassword=bitcoinpassword
txindex=1
```

## Dev

Run `npm run server` to launch the dev server.
