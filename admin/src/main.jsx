import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./app/store";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "",
            headerColor: "",
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);
