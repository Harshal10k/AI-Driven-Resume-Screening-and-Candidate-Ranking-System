import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

import {
  LayoutDashboard,
  Settings,
  Briefcase,
} from "lucide-react";

import {
  useCandidate,
} from "../context/CandidateContext";

const CandidateLayout = ({
  children,
}) => {

  const {

    applications,

  } = useCandidate();

  const location =
    useLocation();

  return (

    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">

        {/* Logo */}

          <div className="flex items-center gap-3">

            <img
              src="/logo.svg"
              alt="CV Analyzer Logo"
              className="h-10 w-10 object-contain"
            />

            <h1 className="text-2xl font-bold text-indigo-600">
              CVAnalyzer
            </h1>

          </div>

        {/* Navigation */}

        <nav className="flex items-center gap-3">

          <Link

            to="/candidate-dashboard"

            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition ${
              location.pathname ===
              "/candidate-dashboard"
                ? "bg-indigo-100 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}

          >

            <LayoutDashboard size={18} />

            Dashboard

          </Link>

          <Link

            to="/candidate/settings"

            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-medium transition ${
              location.pathname ===
              "/candidate/settings"
                ? "bg-indigo-100 text-indigo-700"
                : "text-slate-600 hover:bg-slate-100"
            }`}

          >

            <Settings size={18} />

            Settings

          </Link>

        </nav>

      </header>

      {/* ================= BODY ================= */}

      <div className="flex">

        {/* ================= SIDEBAR ================= */}

        <aside className="w-80 border-r border-slate-200 bg-white p-6">

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h3 className="text-lg font-bold">

                My Applications

              </h3>

              <p className="text-sm text-slate-500">

                {applications.length} Applications

              </p>

            </div>

            <div className="rounded-xl bg-indigo-100 p-3">

              <Briefcase
                size={20}
                className="text-indigo-600"
              />

            </div>

          </div>

          {applications.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">

              <Briefcase
                size={40}
                className="mx-auto text-slate-300"
              />

              <p className="mt-4 text-sm text-slate-500">

                No applications yet.

              </p>

            </div>

          ) : (

            <div className="space-y-4">

              {applications.map((app) => (

                <div

                  key={app._id}

                  className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md"

                >

                  <h3 className="font-semibold text-slate-900">

                    {app.job_id?.title}

                  </h3>

                  <p className="mt-1 text-sm text-slate-500">

                    {app.job_id?.company}

                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <span

                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        app.candidate_status ===
                        "shortlisted"
                          ? "bg-green-100 text-green-700"
                          : app.candidate_status ===
                            "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}

                    >

                      {app.candidate_status}

                    </span>

                    <span className="text-sm font-semibold text-indigo-600">

                      {app.match_score || 0}%

                    </span>

                  </div>

                </div>

              ))}

            </div>

          )}

        </aside>

        {/* ================= MAIN ================= */}

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>

  );

};

export default CandidateLayout;