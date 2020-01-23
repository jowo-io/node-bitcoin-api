import React from "react";
import PropTypes from "prop-types";

import { getTest, getBlockCoinbase, getBlockchainInfo } from "./Utils";

const maxCount = 100;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: "loading...",
            latestBlockId: "loading...",
            currentBlockId: "loading...",
            coinbaseList: []
        };
    }

    componentDidMount() {
        getTest()
            .then(test => this.setState({ test }))
            .catch(console.error);

        getBlockchainInfo()
            .then(({ blocks: latestBlockId }) => {
                this.setState({ latestBlockId });
                this.recurseCoinbase(latestBlockId - maxCount);
            })
            .catch(console.error);
    }

    recurseCoinbase = currentBlockId => {
        this.setState(() => ({ currentBlockId }));
        getBlockCoinbase(currentBlockId)
            .then(result => {
                let latestBlockId;
                this.setState(
                    prevState => {
                        latestBlockId = prevState.latestBlockId;
                        return {
                            coinbaseList: [result.ascii, ...prevState.coinbaseList]
                        };
                    },
                    () => {
                        if (latestBlockId !== currentBlockId) {
                            this.recurseCoinbase(currentBlockId + 1);
                        }
                    }
                );
            })
            .catch(console.error);
    };

    render() {
        const { test, coinbaseList, latestBlockId, currentBlockId } = this.state;

        return (
            <div className="App">
                <h1>Bitcoin API</h1>
                <p>Test: {test}</p>
                <p>Latest Block ID: {latestBlockId}</p>
                <p>Current Block ID: {currentBlockId}</p>

                <p>See below for the most recent {maxCount} block coinbase messages.</p>
                <textarea
                    cols={65}
                    defaultValue={coinbaseList.join("\n\n")}
                    disabled={latestBlockId !== currentBlockId}
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
