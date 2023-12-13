import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN, API_BASE_URL } from "./constants/index";
// After Bootstrap css in order to be taken the font defined into index.html from public folder.
import "./index.css";

/* It will affect all request sent from anywhere in the app*/
//axios.defaults.baseURL = "http://192.168.0.20:9999/jbh/";
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

/* Interceptors for the request */
axios.interceptors.request.use(
  request => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      request.headers.Authorization =
        "Bearer " + localStorage.getItem(ACCESS_TOKEN);
    }
    return request; // To be handled locally.
  },
  /* This error is related to the request. e.g. If you had no internet connectivity */
  error => {
    console.error("Error Request on Index", error);
    return Promise.reject(error); // To be handled locally.
  }
);

/* Interceptors for the response */
axios.interceptors.response.use(
  response => {
    return response;
  },
  /* This error is related to the request. e.g. If you had no internet connectivity */
  errorResponse => {
    console.error("Error on Response-Index", errorResponse);
    return Promise.reject(errorResponse); // To be handled locally.
  }
);

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
