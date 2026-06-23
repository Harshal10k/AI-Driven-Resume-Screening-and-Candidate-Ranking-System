import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Jobs from "../pages/Jobs";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

import AdminDashboard from "../pages/AdminDashboard";
import CandidateDashboard from "../pages/CandidateDashboard";

import HRManagement from "../pages/HRManagement";
import AdminCandidates from "../pages/AdminCandidates";
import AdminSettings from "../pages/AdminSettings";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/candidate-dashboard"
          element={<CandidateDashboard />}
        />

        <Route
          path="/admin/hrs"
          element={<HRManagement />}
        />

        <Route
          path="/admin/candidates"
          element={<AdminCandidates />}
        />

        <Route
          path="/admin/settings"
          element={<AdminSettings />}
        />

      </Routes>

    </BrowserRouter>
  );
};

export default AppRoutes;