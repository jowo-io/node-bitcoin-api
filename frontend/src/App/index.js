import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { apiUrl, defaultAxiosOptions } from "./Constants";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: "loading...",
            blockchainInfo: {},
            miningInfo: {},
            peerInfo: []
        };
    }

    componentDidMount() {
        this.getTest();
        this.getBlockchainInfo();
        this.getMiningInfo();
        this.getPeerInfo();
    }

    getTest = () => {
        axios
            .get(`${apiUrl}/test`, defaultAxiosOptions)
            .then(res => {
                const data = res.data;
                const result = data.msg;
                this.setState({ test: result });
            })
            .catch(err => console.log(err));
    };

    getBlockchainInfo = () => {
        axios
            .get(`${apiUrl}/getblockchaininfo`, defaultAxiosOptions)
            .then(res => {
                const data = res.data;
                const result = data.result;
                this.setState({ blockchainInfo: result });
            })
            .catch(err => console.log(err));
    };

    getMiningInfo = () => {
        axios
            .get(`${apiUrl}/getmininginfo`, defaultAxiosOptions)
            .then(res => {
                const data = res.data;
                const result = data.result;
                this.setState({ miningInfo: result });
            })
            .catch(err => console.log(err));
    };

    getPeerInfo = () => {
        axios
            .get(`${apiUrl}/getpeerinfo`, defaultAxiosOptions)
            .then(res => {
                const data = res.data;
                const result = data.result;
                this.setState({ peerInfo: result });
            })
            .catch(err => console.log(err));
    };

    render() {
        const { test, blockchainInfo, miningInfo, peerInfo } = this.state;

        return (
            <div className="App">
                <h1>Bitcoin API</h1>

                <p>Test: {test}</p>

                <p>Number of blocks: {blockchainInfo.blocks || "loading..."}</p>
                <p>Mining Difficulty: {miningInfo.difficulty || "loading..."}</p>
                <p>Number of Peers: {peerInfo.length}</p>
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
