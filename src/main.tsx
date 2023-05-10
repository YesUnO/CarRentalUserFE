import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Root from "./infrastructure/root";
import { Provider } from "react-redux";
import store from "./infrastructure/store";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>

      <Root />
    </Provider>

  </React.StrictMode>
);
