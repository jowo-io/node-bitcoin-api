import React from "react";
import ReactDOM from "react-dom";

const App = function() {
    return (
        <div>
            <h4>
                <b>Hello world</b>!
            </h4>
            <p>blah blah blah...</p>
        </div>
    );
};

// create an empty div
const rootDiv = document.createElement("div");
// render div to dom
document.body.appendChild(rootDiv);
// render example component into div
ReactDOM.render(<App />, rootDiv);
