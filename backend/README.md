## Setup

Be sure to create a .env var containing your RPC login info (explained in the tutorial linked above).

Ensure you update the `bitcoin.conf` file in Bitcoin Core to the following:

```
rpcuser=bitcoinuser
rpcpassword=bitcoinpassword
testnet=1
server=1
daemon=1
txindex=1
rpcallowip=127.0.0.1
[test]
rpcport=19832
```

## Dev

Install the [Bitcoin Core application](https://bitcoin.org/en/bitcoin-core/)

Launch the Bitcoin Core application in testnet mode by running:

```bat
start "" bitcoin-qt.exe -testnet -datadir=G:/bitcoin_testnet/
```

(update `-datadir` path to your desired folder location)

You can also add the above command to a `.bat` file in `C:\Program Files\Bitcoin` folder for an easy to use shortcut.

Run `npm run server` to launch the dev server.

## Testnet wallet

Your public key is: `mxUWBjQnpY6bdEJwJtit1nztMm5tU2jxAj`

Your private key is: `931DgRzoiZ7jhcnxd1rQyJ4xbo5Goru4PsDFY8qVPkiySav8fz5`

Generate testnet wallets online [here](https://bitcoinpaperwallet.com/bitcoinpaperwallet/generate-wallet.html?design=alt-testnet)

Send testnet coins to you testnet address [here](https://coinfaucet.eu/en/btc-testnet/)

Once you're done with your testnet coins, return them to this address: `mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB`