import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { JobsProvider } from "./context/JobsContext";
import { ResumeProvider } from "./context/ResumeContext";
import {CandidateProvider} from "./context/CandidateContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <AuthProvider>

      <CandidateProvider>

          <JobsProvider>

            <ResumeProvider>

              <App />

             </ResumeProvider>

          </JobsProvider>

      </CandidateProvider>

    </AuthProvider>

  </React.StrictMode>

);