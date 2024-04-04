import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";

import App from "./App";

import { store, useAppDispatch } from "./store/store";
import { Provider } from "react-redux";
import { setIsDarkMode } from "./store/theme/themeSlice";

// document.body.classList.add("dark");
const rootElem = document.getElementById("root");

if (rootElem) {
  const value = localStorage.getItem("theme");

  if (typeof value === "string") {
    const theme = JSON.parse(value);
    
    if(theme){
      document.body.classList.toggle("dark");
    }
  }

  const root = ReactDOM.createRoot(rootElem);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
