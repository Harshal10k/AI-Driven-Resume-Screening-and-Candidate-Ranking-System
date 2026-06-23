import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import AuthProvider from "./context/AuthContext";
import { JobsProvider } from "./context/JobsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <JobsProvider>
        <App />
      </JobsProvider>
    </AuthProvider>
  </React.StrictMode>
);