import { useEffect, useMemo, useState } from "react";

import CandidateLayout from "../layouts/CandidateLayout";

import StatsCard from "../components/StatsCard";

import { useCandidate } from "../context/CandidateContext";

import { getOpenJobs } from "../services/jobService";

import {

  Search,

  Sparkles,

  Briefcase,

  Trophy,

  Clock3,

  BrainCircuit,

  TrendingUp,

  Target,

  Star,

  ArrowRight,

  CalendarDays,

} from "lucide-react";

const CandidateDashboard = () => {

  const {

    applications,

    loading,

  } = useCandidate();

  /* =====================================
          STATES
  ===================================== */

  const [jobs, setJobs] =
    useState([]);

  const [jobsLoading, setJobsLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  /* =====================================
          FETCH JOBS
  ===================================== */

  useEffect(() => {

    const loadJobs =
      async () => {

        try {

          const response =
            await getOpenJobs();

          if (response.success) {

            setJobs(response.data);

          }

        }

        catch (err) {

          console.log(err);

        }

        finally {

          setJobsLoading(false);

        }

      };

    loadJobs();

  }, []);

  /* =====================================
        SEARCH FILTER
  ===================================== */

  const filteredJobs =
    useMemo(() => {

      return jobs.filter(

        (job) =>

          job.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||

          job.company
            .toLowerCase()
            .includes(search.toLowerCase())

      );

    }, [

      jobs,

      search,

    ]);

  /* =====================================
          DASHBOARD STATS
  ===================================== */

  const totalApplications =
    applications.length;

  const shortlisted =
    applications.filter(

      (item) =>

        item.candidate_status ===
        "shortlisted"

    ).length;

  const pending =
    applications.filter(

      (item) =>

        item.candidate_status ===
        "pending"

    ).length;

  const rejected =
    applications.filter(

      (item) =>

        item.candidate_status ===
        "rejected"

    ).length;

  const averageScore =

    totalApplications

      ? Math.round(

          applications.reduce(

            (sum, app) =>

              sum +

              (app.match_score || 0),

            0

          ) /

            totalApplications

        )

      : 0;

  /* =====================================
        STATUS COLOR
  ===================================== */

  const getStatusColor =
    (status) => {

      switch (status) {

        case "shortlisted":

          return "bg-green-100 text-green-700";

        case "rejected":

          return "bg-red-100 text-red-700";

        default:

          return "bg-yellow-100 text-yellow-700";

      }

    };

  return (

    <CandidateLayout>

      <div className="space-y-6">

              {/* ===========================
              PAGE HEADER
      ============================ */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">

            <Sparkles size={16} />

            AI Candidate Portal

          </div>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">

            Welcome Back 👋

          </h1>

          <p className="mt-2 max-w-2xl text-slate-500">

            Track applications, discover jobs, monitor AI match scores,
            and stay updated with your recruitment progress.

          </p>

        </div>

        {/* Search */}

        <div className="relative w-full lg:w-[380px]">

          <Search

            size={18}

            className="absolute left-4 top-4 text-slate-400"

          />

          <input

            type="text"

            placeholder="Search jobs..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

            className="w-full rounded-2xl border border-slate-300 bg-white py-4 pl-12 pr-5 shadow-sm outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"

          />

        </div>

      </div>

      {/* ===========================
              QUICK STATS
      ============================ */}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard

          title="Applications"

          value={totalApplications}

          subtitle="Total Applied"

          color="blue"

          icon={<Briefcase size={22}/>}

        />

        <StatsCard

          title="Shortlisted"

          value={shortlisted}

          subtitle="Interview Stage"

          color="green"

          icon={<Trophy size={22}/>}

        />

        <StatsCard

          title="Pending"

          value={pending}

          subtitle="Under Review"

          color="yellow"

          icon={<Clock3 size={22}/>}

        />

        <StatsCard

          title="AI Match"

          value={`${averageScore}%`}

          subtitle="Average Resume Score"

          color="blue"

          icon={<BrainCircuit size={22}/>}

        />

      </div>

      {/* ===========================
              DASHBOARD GRID
      ============================ */}

      <div className="grid grid-cols-12 gap-6">

        {/* ================= LEFT ================= */}

        <div className="col-span-12 xl:col-span-8">

          <div className="mb-5 flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                Recent Applications

              </h2>

              <p className="text-slate-500">

                Track every application you've submitted.

              </p>

            </div>

          </div>

                    {/* ================= APPLICATIONS ================= */}

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-200 p-6">

              <div>

                <h3 className="text-xl font-bold">

                  Recent Applications

                </h3>

                <p className="mt-1 text-sm text-slate-500">

                  Monitor your latest job applications.

                </p>

              </div>

              <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50">

                View All

                <ArrowRight size={16}/>

              </button>

            </div>

            <div className="divide-y divide-slate-200">

              {loading ? (

                <div className="p-10 text-center text-slate-500">

                  Loading...

                </div>

              ) : applications.length === 0 ? (

                <div className="p-10 text-center text-slate-500">

                  No applications found.

                </div>

              ) : (

                applications.slice(0,5).map((app)=>(

                  <div

                    key={app._id}

                    className="flex flex-col gap-5 p-6 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"

                  >

                    <div>

                      <h3 className="text-lg font-semibold">

                        {app.job_id?.title}

                      </h3>

                      <p className="mt-1 text-slate-500">

                        {app.job_id?.company}

                      </p>

                      <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">

                        <span className="flex items-center gap-2">

                          <CalendarDays size={15}/>

                          {

                            new Date(app.createdAt)

                            .toLocaleDateString()

                          }

                        </span>

                      </div>

                    </div>

                    <div className="flex items-center gap-4">

                      <div className="text-right">

                        <p className="text-xs uppercase text-slate-400">

                          Match Score

                        </p>

                        <h3 className="text-2xl font-bold text-indigo-600">

                          {app.match_score || 0}%

                        </h3>

                      </div>

                      <span

                        className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(

                          app.candidate_status

                        )}`}

                      >

                        {app.candidate_status}

                      </span>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="col-span-12 xl:col-span-4 space-y-6">

          {/* AI SCORE */}

          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 p-6 text-white shadow-lg">

            <div className="flex items-center justify-between">

              <BrainCircuit size={34}/>

              <TrendingUp size={26}/>

            </div>

            <p className="mt-8 text-indigo-100">

              Resume AI Score

            </p>

            <h2 className="mt-2 text-5xl font-bold">

              {averageScore}%

            </h2>

            <p className="mt-4 text-sm leading-6 text-indigo-100">

              Your resume performs well.

              Improve missing skills to increase interview chances.

            </p>

          </div>

          {/* CAREER INSIGHTS */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <Target

                size={22}

                className="text-indigo-600"

              />

              <h3 className="text-xl font-bold">

                Career Insights

              </h3>

            </div>

            <div className="space-y-5">

              <div className="flex items-start gap-3">

                <Star

                  size={18}

                  className="mt-1 text-green-500"

                />

                <p className="text-sm leading-6 text-slate-600">

                  Strong Java fundamentals detected.

                </p>

              </div>

              <div className="flex items-start gap-3">

                <Star

                  size={18}

                  className="mt-1 text-yellow-500"

                />

                <p className="text-sm leading-6 text-slate-600">

                  Learn Docker & Kubernetes to improve ranking.

                </p>

              </div>

              <div className="flex items-start gap-3">

                <Star

                  size={18}

                  className="mt-1 text-indigo-500"

                />

                <p className="text-sm leading-6 text-slate-600">

                  Apply to more Backend Developer roles.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

            {/* ================= RECOMMENDED JOBS ================= */}

      <div className="space-y-5">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">

              Recommended Jobs

            </h2>

            <p className="mt-1 text-slate-500">

              AI matched opportunities based on your profile.

            </p>

          </div>

        </div>

        {jobsLoading ? (

          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            Loading Jobs...

          </div>

        ) : filteredJobs.length === 0 ? (

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">

            No jobs available.

          </div>

        ) : (

          <div className="grid gap-6 lg:grid-cols-2">

            {filteredJobs.slice(0,6).map((job)=>(

              <div

                key={job._id}

                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl"

              >

                {/* Header */}

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-xl font-bold">

                      {job.title}

                    </h3>

                    <p className="mt-2 text-slate-500">

                      {job.company}

                    </p>

                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                    OPEN

                  </span>

                </div>

                {/* Experience */}

                <div className="mt-5 flex items-center justify-between text-sm">

                  <span className="text-slate-500">

                    Experience

                  </span>

                  <span className="font-semibold">

                    {job.experience_years} Years

                  </span>

                </div>

                {/* Skills */}

                <div className="mt-6">

                  <p className="mb-3 text-sm font-semibold text-slate-600">

                    Required Skills

                  </p>

                  <div className="flex flex-wrap gap-2">

                    {job.required_skills?.map((skill,index)=>(

                      <span

                        key={index}

                        className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700"

                      >

                        {skill}

                      </span>

                    ))}

                  </div>

                </div>

                {/* Footer */}

                <div className="mt-8 flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-500">

                      AI Match

                    </p>

                    <h2 className="text-2xl font-bold text-indigo-600">

                      {Math.floor(Math.random()*15)+85}%

                    </h2>

                  </div>

                  <button

                    className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"

                  >

                    Apply Now

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  </CandidateLayout>

);

};

export default CandidateDashboard;