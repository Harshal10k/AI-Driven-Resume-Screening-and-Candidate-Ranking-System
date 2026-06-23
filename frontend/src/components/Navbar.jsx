import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="h-14 bg-slate-900 flex items-center justify-between px-8 border-b border-slate-700">

      <div className="flex items-center gap-12">

        <div className="flex items-center gap-2 text-white font-semibold">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            AI
          </div>
          CVAnalyzer
        </div>

        <div className="flex gap-1">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-lg bg-slate-800 text-white"
                : "px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
            }
          >
            Screen
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-lg bg-slate-800 text-white"
                : "px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
            }
          >
            Jobs
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-lg bg-slate-800 text-white"
                : "px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
            }
          >
            Analytics
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "px-4 py-2 rounded-lg bg-slate-800 text-white"
                : "px-4 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition"
            }
          >
            Settings
          </NavLink>

        </div>

      </div>

      <div className="flex items-center gap-3 text-white">

        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <span>
          {user?.name || "User"}
        </span>

      </div>

    </div>
  );
};

export default Navbar;