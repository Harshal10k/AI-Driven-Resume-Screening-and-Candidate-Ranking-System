import AdminLayout from "../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/adminService";

import {
  Users,
  UserCheck,
  Briefcase,
  BrainCircuit,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalEmployers: 0,
    totalCandidates: 0,
    totalJobs: 0,
    totalScreenings: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const data = await getDashboardStats();

        setStats({
          totalHRs: data.totalEmployers || 0,
          totalCandidates: data.totalCandidates || 0,
          totalJobs: data.totalJobs || 0,
          totalScreenings: data.totalScreenings || 0,
        });

      } catch (err) {

        console.error(err);

      }

    };

    fetchStats();

  }, []);

  return (

    <AdminLayout>

      {/* ================= HERO ================= */}

      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-700 via-violet-700 to-blue-600 p-10 text-white shadow-2xl">

        <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between gap-10 lg:flex-row lg:items-center">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">

              <Sparkles size={16} />

              <span className="text-sm font-medium">

                AI Recruitment Platform

              </span>

            </div>

            <h1 className="mt-6 text-5xl font-bold">

              Welcome Admin 👋

            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-indigo-100">

              Manage employers, candidates,
              job postings, AI screening
              operations and monitor the
              complete recruitment platform
              from one intelligent dashboard.

            </p>

          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-5">

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <ShieldCheck
                size={34}
                className="mb-5"
              />

              <p className="text-indigo-100">

                Active Jobs

              </p>

              <h2 className="mt-2 text-5xl font-bold">

                {stats.totalJobs}

              </h2>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <BrainCircuit
                size={34}
                className="mb-5"
              />

              <p className="text-indigo-100">

                AI Screenings

              </p>

              <h2 className="mt-2 text-5xl font-bold">

                {stats.totalScreenings}

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl bg-gradient-to-r from-indigo-500 to-blue-600 p-6 text-white shadow-lg">

          <Users
            size={34}
            className="mb-6"
          />

          <p className="text-indigo-100">

            Employers

          </p>

          <h2 className="mt-3 text-5xl font-bold">

            {stats.totalHRs}

          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white shadow-lg">

          <UserCheck
            size={34}
            className="mb-6"
          />

          <p className="text-green-100">

            Candidates

          </p>

          <h2 className="mt-3 text-5xl font-bold">

            {stats.totalCandidates}

          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white shadow-lg">

          <Briefcase
            size={34}
            className="mb-6"
          />

          <p className="text-orange-100">

            Active Jobs

          </p>

          <h2 className="mt-3 text-5xl font-bold">

            {stats.totalJobs}

          </h2>

        </div>

        <div className="rounded-3xl bg-gradient-to-r from-violet-500 to-fuchsia-600 p-6 text-white shadow-lg">

          <BrainCircuit
            size={34}
            className="mb-6"
          />

          <p className="text-violet-100">

            AI Screenings

          </p>

          <h2 className="mt-3 text-5xl font-bold">

            {stats.totalScreenings}

          </h2>

        </div>

      </div>

      {/* ================= MANAGEMENT ================= */}

            <div className="mt-14">

        <div>

          <h2 className="text-3xl font-bold text-slate-900">

            Management Center

          </h2>

          <p className="mt-2 text-slate-500">

            Manage every aspect of the recruitment platform from one place.

          </p>

        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">

          {/* Employer Management */}

          <div className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white">

              <Users size={32} />

            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">

              Employer Management

            </h3>

            <p className="mt-3 leading-7 text-slate-600">

              View, approve, manage and monitor all employer accounts registered on the recruitment platform.

            </p>

            <div className="mt-8 flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">

                  Registered Employers

                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">

                  {stats.totalHRs}

                </h2>

              </div>

              <button
                onClick={() => navigate("/admin/employers")}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Open Panel
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

          {/* Candidate Management */}

          <div className="group rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">

              <UserCheck size={32} />

            </div>

            <h3 className="mt-6 text-2xl font-bold text-slate-900">

              Candidate Management

            </h3>

            <p className="mt-3 leading-7 text-slate-600">

              Manage candidate accounts, monitor registrations and maintain recruitment records.

            </p>

            <div className="mt-8 flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">

                  Registered Candidates

                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">

                  {stats.totalCandidates}

                </h2>

              </div>

              <button
                onClick={() => navigate("/admin/candidates")}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Open Panel
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RECENT ACTIVITY ================= */}

      <div className="mt-14 mb-10">

  <div>

    <h2 className="text-3xl font-bold text-slate-900">

      Recent Platform Activity

    </h2>

    <p className="mt-2 text-slate-500">

      Stay updated with the latest recruitment activities happening across the platform.

    </p>

  </div>

  <div className="mt-8 space-y-5">

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-slate-900">

            New Employer Registered

          </h3>

          <p className="mt-2 text-slate-600">

            A new employer account has been successfully created and is awaiting verification.

          </p>

        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">

          Today

        </span>

      </div>

    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-slate-900">

            New Candidate Registration

          </h3>

          <p className="mt-2 text-slate-600">

            A candidate has completed registration and is ready to participate in AI resume screening.

          </p>

        </div>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">

          2 Hours Ago

        </span>

      </div>

    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-slate-900">

            New Job Posted

          </h3>

          <p className="mt-2 text-slate-600">

            An employer has published a new job opening on the recruitment platform.

          </p>

        </div>

        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">

          Yesterday

        </span>

      </div>

    </div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-lg font-semibold text-slate-900">

            AI Resume Screening Completed

          </h3>

          <p className="mt-2 text-slate-600">

            AI successfully evaluated recently uploaded resumes and updated candidate rankings.

          </p>

        </div>

        <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700">

          Yesterday

        </span>

      </div>

    </div>

  </div>

</div>

</AdminLayout>

);

};

export default AdminDashboard;