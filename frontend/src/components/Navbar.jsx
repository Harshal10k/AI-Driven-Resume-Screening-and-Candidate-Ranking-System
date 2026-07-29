import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";

import {
  BriefcaseBusiness,
  BarChart3,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="sticky top-0 z-50 h-16 bg-[#081122] border-b border-slate-800 shadow-sm">

      <div className="mx-auto flex h-full items-center justify-between px-6">

        {/* ================= LEFT ================= */}

        <div className="flex items-center gap-10">

          {/* Logo */}

          <div className="flex items-center gap-3 text-white font-semibold">
            <img
              src={logo}
              alt="CV Analyzer Logo"
              className="w-8 h-8 object-contain"
            />

            <span>CV Analyzer</span>
          </div>

          {/* Navigation */}

          <nav className="flex items-center gap-2">

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <LayoutDashboard size={18} />
              Screen
            </NavLink>

            <NavLink
              to="/jobs"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <BriefcaseBusiness size={18} />
              Jobs
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <BarChart3 size={18} />
              Analytics
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>

          </nav>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-6">

          {/* User */}

          <div className="flex items-center gap-3 rounded-xl px-2 py-1">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-semibold text-white">

              {user?.name?.charAt(0).toUpperCase() || "U"}

            </div>

            <div className="text-left">

              <p className="text-sm font-semibold text-white leading-none">

                {user?.name || "User"}

              </p>

              <p className="mt-1 text-xs text-slate-400">

                Employer

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;