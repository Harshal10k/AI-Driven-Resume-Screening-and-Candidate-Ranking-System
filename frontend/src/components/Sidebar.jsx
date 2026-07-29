import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Settings,
  Sparkles,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import DashboardSidebar from "./sidebar/DashboardSidebar";
import JobsSidebar from "./sidebar/JobsSidebar";
import AnalyticsSidebar from "./sidebar/AnalyticsSidebar";

const Sidebar = () => {

  const { logout, user } = useAuth();

  const location = useLocation();

  const navigation = [

    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },

    {
      title: "Jobs",
      icon: Briefcase,
      path: "/jobs",
    },

    {
      title: "Candidates",
      icon: Users,
      path: "/candidate-management",
    },

    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },

    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },

  ];

    const renderSidebarPanel = () => {

    if (
      location.pathname.startsWith("/dashboard")
    ) {

      return <DashboardSidebar />;

    }

    if (
      location.pathname.startsWith("/jobs")
    ) {

      return <JobsSidebar />;

    }

    if (
      location.pathname.startsWith("/analytics")
    ) {

      return <AnalyticsSidebar />;

    }

    return null;

  };

    return (

    <aside className="sticky top-0 flex h-screen w-80 flex-col border-r border-slate-200 bg-white">

      {/* =====================================
              HEADER
      ===================================== */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center">

          <img
            src={logo}
            alt="CV Analyzer Logo"
            className="h-12 w-12 object-contain"
          />

        </div>

          <div>

            <h1 className="text-xl font-bold text-slate-900">

              CV Analyzer

            </h1>

            <p className="text-sm text-slate-500">

              AI Hiring Platform

            </p>

          </div>

        </div>

      </div>

      {/* =====================================
          NAVIGATION
        ===================================== */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">

          Main Menu

        </p>

        <div className="space-y-2">

          {navigation.map((item) => {

            const Icon = item.icon;

            const active =
              location.pathname.startsWith(
                item.path
              );

            return (

              <NavLink
                key={item.title}
                to={item.path}
                className={`group relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >

                {/* Active Indicator */}

                {active && (

                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />

                )}

                {/* Icon */}

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    active
                      ? "bg-white/20"
                      : "bg-slate-100 group-hover:bg-white"
                  }`}
                >

                  <Icon size={20} />

                </div>

                {/* Text */}

                <div className="flex flex-col">

                  <span className="font-semibold">

                    {item.title}

                  </span>

                  <span
                    className={`text-xs ${
                      active
                        ? "text-indigo-100"
                        : "text-slate-400"
                    }`}
                  >

                    {item.title === "Dashboard" &&
                      "Overview"}

                    {item.title === "Jobs" &&
                      "Manage Jobs"}

                    {item.title === "Candidates" &&
                      "Applicants"}

                    {item.title === "Analytics" &&
                      "Reports"}

                    {item.title === "Settings" &&
                      "Preferences"}

                  </span>

                </div>

              </NavLink>

            );

          })}

        </div>

        {/* =====================================
                DYNAMIC PAGE PANEL
        ===================================== */}

        <div className="mt-8">

          {renderSidebarPanel()}

        </div>

      </nav>

      {/* =====================================
          FOOTER
        ===================================== */}

      <div className="border-t border-slate-200 p-5">

        {/* User Card */}

        <div className="mb-4 flex items-center gap-4 rounded-2xl bg-slate-50 p-4">

          {/* Avatar */}

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white">

            {user?.name?.charAt(0)?.toUpperCase() || "A"}

          </div>

          {/* Info */}

          <div className="flex-1 overflow-hidden">

            <h3 className="truncate font-semibold text-slate-800">

              {user?.name || "Administrator"}

            </h3>

            <p className="truncate text-sm capitalize text-slate-500">

              {user?.role || "Admin"}

            </p>

          </div>

        </div>

        {/* Logout */}

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

};

export default Sidebar;