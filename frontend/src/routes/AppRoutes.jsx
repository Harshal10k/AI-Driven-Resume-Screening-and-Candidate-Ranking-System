import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

// ================= PUBLIC PAGES =================

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

// ================= EMPLOYER PAGES =================

import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

// ================= CANDIDATE PAGES =================

import CandidateDashboard from "../pages/CandidateDashboard";
import CandidateSettings from "../pages/CandidateSettings";

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        {/* =====================
             PUBLIC ROUTES
        ===================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =====================
             EMPLOYER ROUTES
        ===================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* Employer Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["employer"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* =====================
             CANDIDATE ROUTES
        ===================== */}

        <Route
          path="/candidate-dashboard"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* Candidate Settings */}

        <Route
          path="/candidate/settings"
          element={
            <ProtectedRoute allowedRoles={["candidate"]}>
              <CandidateSettings />
            </ProtectedRoute>
          }
        />

        {/* =====================
             PAGE NOT FOUND
        ===================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>

  );

};

export default AppRoutes;