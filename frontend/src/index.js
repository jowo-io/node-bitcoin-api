import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// create an empty div
const rootDiv = document.createElement("div");
// render div to dom
document.body.appendChild(rootDiv);
// render example component into div
ReactDOM.render(<App />, rootDiv);
