import {
  ChevronRight,
  BriefcaseBusiness,
} from "lucide-react";

import { useJobs } from "../../context/JobsContext";

const DashboardSidebar = () => {

  const {
    filteredJobs,
    showClosedJobs,
    toggleClosedJobs,
    selectedJob,
    setSelectedJob,
    ALL_JOBS,
  } = useJobs();

  return (

    <div className="sticky top-24 flex h-[calc(100vh-120px)] flex-col">

      {/* ========================= */}
      {/* Header */}
      {/* ========================= */}

      <div className="mb-5 flex items-center justify-between">

        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400">
          {
            showClosedJobs
            ? "Closed Job Posts"
            : "Active Job Posts"
          }
        </p>

      </div>

      {/* ========================= */}
      {/* All Jobs */}
      {/* ========================= */}

      <button
        onClick={() => setSelectedJob(ALL_JOBS)}
        className={`mb-6 flex w-full items-center justify-between rounded-2xl border px-5 py-4 transition-all duration-300
        ${
          selectedJob?._id === "all"
            ? "border-indigo-500 bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl ring-2 ring-indigo-200"
            : "border-slate-200 bg-white text-slate-900 hover:-translate-y-1 hover:shadow-lg"
        }`}
      >

        <div className="flex items-center gap-3">

          <BriefcaseBusiness
            size={20}
            className={
              selectedJob?._id === "all"
                ? "text-white"
                : "text-slate-700"
            }
          />

          <span
            className={`font-semibold ${
              selectedJob?._id === "all"
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            All Jobs
          </span>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            selectedJob?._id === "all"
              ? "bg-white/20 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >

          {filteredJobs.length}

        </span>

      </button>

      {/* ========================= */}
      {/* Job List */}
      {/* ========================= */}

      <div className="flex-1 space-y-4 overflow-y-auto pr-1">

        {filteredJobs.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
            No {showClosedJobs ? "closed" : "open"} jobs found.
          </div>

        ) : (

        filteredJobs.map((job) => {

          const active =
            selectedJob?._id === job._id;

          return (

            <button
              key={job._id}
              onClick={() =>
                setSelectedJob(job)
              }
              className={`w-full rounded-3xl border bg-white p-4 text-left transition-all duration-300
              ${
                active
                  ? "border-indigo-500 bg-indigo-50 shadow-xl ring-2 ring-indigo-100"
                  : "border-slate-200 hover:-translate-y-1 hover:shadow-lg"
              }`}
            >

              {/* Title */}

              <h2 className="text-lg font-bold text-slate-900">

                {job.title}

              </h2>

              {/* Company */}

              <p className="mt-1 text-sm text-slate-500">

                {job.company}

              </p>

              {/* Stats */}

              <div className="mt-4 grid grid-cols-3 gap-2">

                <div className="text-center">

                  <h3 className="text-xl font-bold">

                    {job.summary.applicants}

                  </h3>

                  <p className="text-xs text-slate-500">

                    Applicants

                  </p>

                </div>

                <div className="text-center">

                  <h3 className="text-xl font-bold">

                    {job.summary.shortlisted}

                  </h3>

                  <p className="text-xs text-slate-500">

                    Shortlisted

                  </p>

                </div>

                <div className="text-center">

                  <h3 className="text-xl font-bold">

                    {job.summary.pending}

                  </h3>

                  <p className="text-xs text-slate-500">

                    Pending

                  </p>

                </div>

              </div>

              {/* Skills */}

              <div className="mt-5">

                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">

                  Required Skills

                </p>

                <div className="flex flex-wrap gap-2">

                  {job.required_skills
                    ?.slice(0, 5)
                    .map((skill) => (

                      <span
                        key={skill}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700"
                      >

                        {skill}

                      </span>

                    ))}

                </div>

              </div>

              {/* Footer */}

              <div className="mt-5 flex items-center justify-between">

                <p className="text-sm text-slate-600">

                  Experience

                  <span className="ml-1 font-semibold">

                    {job.experience_years} Years

                  </span>

                </p>

                <span
                  className={`rounded-full px-4 py-1 text-xs font-bold ${
                    job.status === "open"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {job.status.toUpperCase()}

                </span>

              </div>

            </button>

          );

        })
      )}

      </div>

      {/* ========================= */}
      {/* Footer */}
      {/* ========================= */}

      <div className="pt-4">

        <button
          onClick={toggleClosedJobs}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-4 font-semibold text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
        >
          {showClosedJobs
            ? "View Open Jobs"
            : "View Closed Jobs"}

          <ChevronRight size={18} />
        </button>

      </div>

    </div>

  );

};

export default DashboardSidebar;