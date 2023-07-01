import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { Provider } from "./context/books";

const ele = document.getElementById("root");

const root = ReactDOM.createRoot(ele);

root.render(
  <Provider>
    <App />
  </Provider>
);
