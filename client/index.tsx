import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./style.css";
import {AuthProvider} from "./AuthProvider";

render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
