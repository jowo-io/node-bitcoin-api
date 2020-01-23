import React from "react";
import PropTypes from "prop-types";

import { getTest, getBlockCoinbase, getBlockchainInfo } from "./Utils";

const maxCount = 100;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: "loading...",
            latestBlockHeight: "loading...",
            currentBlockHeight: "loading...",
            coinbaseList: []
        };
    }

    componentDidMount() {
        getTest()
            .then(test => this.setState({ test }))
            .catch(console.error);

        // get blockchain info then set latest block height and init recursion
        getBlockchainInfo()
            .then(({ blocks: latestBlockHeight }) => {
                this.setState({ latestBlockHeight });
                this.recurseCoinbase(latestBlockHeight - maxCount);
            })
            .catch(console.error);
    }

    recurseCoinbase = currentBlockHeight => {
        // set the current block id
        this.setState(() => ({ currentBlockHeight }));

        // async lookup message in block's coinbase
        getBlockCoinbase(currentBlockHeight)
            .then(result => {
                let latestBlockHeight;
                this.setState(
                    prevState => {
                        latestBlockHeight = prevState.latestBlockHeight;
                        return {
                            coinbaseList: [result.ascii, ...prevState.coinbaseList]
                        };
                    },
                    () => {
                        // recursively iterate until caught up to latest block
                        if (latestBlockHeight !== currentBlockHeight) {
                            this.recurseCoinbase(currentBlockHeight + 1);
                        }
                    }
                );
            })
            .catch(console.error);
    };

    render() {
        const { test, coinbaseList, latestBlockHeight, currentBlockHeight } = this.state;

        return (
            <div className="App">
                <h1>Bitcoin API</h1>
                <p>Test: {test}</p>
                <p>Latest block height: {latestBlockHeight}</p>
                <p>Current block height: {currentBlockHeight}</p>

                <p>See below for the most recent {maxCount} block coinbase messages.</p>
                <textarea
                    cols={65}
                    defaultValue={coinbaseList.join("\n\n")}
                    disabled={latestBlockHeight !== currentBlockHeight}
                    rows={20}
                />
            </div>
        );
    }
}

App.propTypes = {
    // Required
    // ...
    // Optional
    // ...
};

export default App;
