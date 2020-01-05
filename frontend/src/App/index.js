import React from "react";
import axios from "axios";

const apiUrl = "http://localhost:4444/api";

const defaultAxiosOptions = {
    timeout: 10000,
    crossDomain: true,
    cache: "no-cache",
    referrer: "no-referrer",
    credentials: "*omit",
    mode: "no-cors",
    form: {
        "Content-Type": "application/json"
    },
    responseType: "json"
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: "loading..."
        };
    }

    componentDidMount() {
        this.getTest();
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

    render() {
        const { test } = this.state;

        return (
            <div className="App">
                <h1>Bitcoin API</h1>

                <p>Test: {test}</p>
            </div>
        );
    }
}

export default App;
