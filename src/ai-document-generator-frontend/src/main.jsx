import React from "react";
import ReactDOM from "react-dom/client";
import Overlay from "./overlay";
import Navbar from "./components/navbar/navbar";
import "./index.scss";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Navbar />
    <Overlay />
  </React.StrictMode>
);
