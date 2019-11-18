import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import App from "/js/views/App";
import "./styles.scss";

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
