import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import { App } from "./app/App";
import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

console.log("INDEX JS START");

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
