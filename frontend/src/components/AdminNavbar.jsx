import { CalendarDays } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/employers": "Employer Management",
  "/admin/candidates": "Candidate Management",
  "/admin/settings": "Settings",
  "/admin/jobs": "Job Management",
  "/admin/analytics": "Analytics",
};

const AdminNavbar = () => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTitle =
    pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="h-16 border-b border-slate-200 bg-white">

      <div className="flex h-full items-center justify-between px-8">

        {/* Left */}

        <div className="flex items-center gap-10">

          <div>

            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 bg-clip-text text-transparent">

              CV Analyzer

            </h1>

            <p className="text-xs text-slate-500">

              AI Recruitment Platform

            </p>

          </div>

          <div className="h-8 w-px bg-slate-300"></div>

          <div>

            <h2 className="text-xl font-semibold text-slate-900">

              {currentTitle}

            </h2>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">

            <CalendarDays
              size={18}
              className="text-indigo-600"
            />

            <span className="text-sm font-medium">

              {today}

            </span>

          </div>

         <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 font-bold text-white">

              {user?.name?.charAt(0)?.toUpperCase() || "A"}

            </div>

            <div className="hidden md:block text-left">

              <h3 className="font-semibold">

                {user?.name || "Administrator"}

              </h3>

              <p className="text-xs text-slate-500">

                System Admin

              </p>

            </div>

          </div>

        </div>

      </div>

    </header>
  );
};

export default AdminNavbar;