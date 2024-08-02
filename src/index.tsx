import React from "react";
import ReactDOM from "react-dom/client";
import Calculator from "./Calculator";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
