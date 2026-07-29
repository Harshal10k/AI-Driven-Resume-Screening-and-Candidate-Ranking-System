import { useEffect, useMemo } from "react";
import MainLayout from "../layouts/MainLayout";
import ScreenSidebar from "../components/ScreenSidebar";
import { useJobs } from "../context/JobsContext";
import { useResumes } from "../context/ResumeContext";

import {
  Users,
  BadgeCheck,
  TrendingUp,
  Clock3,
  AlertTriangle,
  Sparkles,
  Briefcase,
  BrainCircuit,
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
} from "recharts";

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

const Analytics = () => {

  const { selectedJob } = useJobs();

  const {
    resumes,
    loading,
    fetchResumes,
  } = useResumes();

  useEffect(() => {

    if (selectedJob?._id) {

      fetchResumes(selectedJob._id);

    }

  }, [selectedJob]);

  /* ================= KPI ================= */

  const totalApplicants = resumes.length;

  const shortlisted =
    resumes.filter(
      r => r.candidate_status === "shortlisted"
    ).length;

  const rejected =
    resumes.filter(
      r => r.candidate_status === "rejected"
    ).length;

  const pending =
    resumes.filter(
      r => r.candidate_status === "pending"
    ).length;

  const biasFlags =
    resumes.filter(
      r => r.bias_flags?.length
    ).length;

  const averageScore =
    totalApplicants > 0
      ? Math.round(
          resumes.reduce(
            (sum, r) =>
              sum + (r.match_score || 0),
            0
          ) / totalApplicants
        )
      : 0;

  /* ================= SCORE ================= */

  const scoreDistribution =
    useMemo(() => {

      return [

        {
          range:"90+",
          count:resumes.filter(r=>r.match_score>=90).length
        },

        {
          range:"80+",
          count:resumes.filter(r=>r.match_score>=80 && r.match_score<90).length
        },

        {
          range:"70+",
          count:resumes.filter(r=>r.match_score>=70 && r.match_score<80).length
        },

        {
          range:"60+",
          count:resumes.filter(r=>r.match_score>=60 && r.match_score<70).length
        },

        {
          range:"<60",
          count:resumes.filter(r=>r.match_score<60).length
        }

      ];

    },[resumes]);

  const statusData=[

    {
      name:"Shortlisted",
      value:shortlisted
    },

    {
      name:"Pending",
      value:pending
    },

    {
      name:"Rejected",
      value:rejected
    }

  ];

  return (

<MainLayout showSidebar={false}>

<div className="flex h-[calc(100vh-56px)]">

  <ScreenSidebar />

  <div className="flex-1 overflow-y-auto p-6">

      <div className="space-y-6">

        {/* HERO */}

        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-600 p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">

                <Sparkles size={16}/>

                AI Recruitment Analytics

              </div>

              <h1 className="mt-4 text-3xl font-bold text-white">

                Hiring Analytics

              </h1>

              <p className="mt-2 text-indigo-100">

                Real-time AI insights for
                candidate screening and recruitment.

              </p>

            </div>

            <div className="hidden lg:flex items-center gap-6">

              <div className="rounded-xl bg-white/10 px-5 py-4 text-center backdrop-blur">

                <p className="text-xs text-indigo-100">

                  Average Score

                </p>

                <h2 className="mt-1 text-3xl font-bold text-white">

                  {averageScore}%

                </h2>

              </div>

              <div className="rounded-xl bg-white/10 px-5 py-4 text-center backdrop-blur">

                <p className="text-xs text-indigo-100">

                  Selected Job

                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">

                  {selectedJob?.title || "No Job"}

                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* KPI */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

          <StatCard
            title="Applicants"
            value={totalApplicants}
            icon={<Users size={22}/>}
            color="blue"
          />

          <StatCard
            title="Shortlisted"
            value={shortlisted}
            icon={<BadgeCheck size={22}/>}
            color="green"
          />

          <StatCard
            title="Pending"
            value={pending}
            icon={<Clock3 size={22}/>}
            color="yellow"
          />

          <StatCard
            title="Bias Flags"
            value={biasFlags}
            icon={<AlertTriangle size={22}/>}
            color="red"
          />

          <StatCard
            title="AI Score"
            value={`${averageScore}%`}
            icon={<TrendingUp size={22}/>}
            color="violet"
          />
                  </div>

        {/* ==========================================================
                          CHARTS
        ========================================================== */}

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Match Score */}

          <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-900">

                  Match Score Distribution

                </h2>

                <p className="text-sm text-slate-500">

                  Candidate score analysis

                </p>

              </div>

              <div className="rounded-xl bg-indigo-100 p-3">

                <TrendingUp
                  className="text-indigo-600"
                  size={22}
                />

              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={220}
            >

              <BarChart
                data={scoreDistribution}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="range"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#6366F1"
                  radius={[6,6,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* Pipeline */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold text-slate-900">

                  Hiring Pipeline

                </h2>

                <p className="text-sm text-slate-500">

                  Candidate status

                </p>

              </div>

              <div className="rounded-xl bg-green-100 p-3">

                <Briefcase
                  size={22}
                  className="text-green-600"
                />

              </div>

            </div>

            <ResponsiveContainer
              width="100%"
              height={220}
            >

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={70}
                  innerRadius={40}
                  paddingAngle={4}
                >

                  {statusData.map((entry,index)=>(

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip/>

              </PieChart>

            </ResponsiveContainer>

            <div className="mt-4 space-y-2">

              <div className="flex justify-between">

                <span className="text-sm text-slate-500">

                  Shortlisted

                </span>

                <span className="font-semibold text-green-600">

                  {shortlisted}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-sm text-slate-500">

                  Pending

                </span>

                <span className="font-semibold text-yellow-500">

                  {pending}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-sm text-slate-500">

                  Rejected

                </span>

                <span className="font-semibold text-red-500">

                  {rejected}

                </span>

              </div>

            </div>

          </div>

        </div>

                {/* ==========================================================
                        SKILLS & EXPERIENCE
        ========================================================== */}

        {(() => {

          const matchedSkills = {};
          const missingSkills = {};
          const experience = {};

          resumes.forEach((candidate) => {

            candidate.matched_skills?.forEach((skill) => {

              matchedSkills[skill] =
                (matchedSkills[skill] || 0) + 1;

            });

            candidate.missing_skills?.forEach((skill) => {

              missingSkills[skill] =
                (missingSkills[skill] || 0) + 1;

            });

            const years =
              candidate.experience_years || 0;

            experience[years] =
              (experience[years] || 0) + 1;

          });

          const topSkills = Object.entries(matchedSkills)
            .map(([skill,count])=>({skill,count}))
            .sort((a,b)=>b.count-a.count)
            .slice(0,5);

          const topMissing = Object.entries(missingSkills)
            .map(([skill,count])=>({skill,count}))
            .sort((a,b)=>b.count-a.count)
            .slice(0,5);

          const experienceData =
            Object.entries(experience).map(
              ([year,count])=>({
                year,
                count
              })
            );

          return(

            <>

              <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* Top Skills */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-xl font-semibold">

                      Top Skills

                    </h2>

                    <BadgeCheck
                      className="text-green-600"
                      size={22}
                    />

                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={220}
                  >

                    <BarChart
                        data={topSkills}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 20,
                          left: 20,
                          bottom: 5,
                        }}
                      >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        type="number"
                      />

                      <YAxis
                        type="category"
                        dataKey="skill"
                        width={120}
                        tick={{ fontSize: 13 }}
                      />

                      <Tooltip/>

                      <Bar
                        dataKey="count"
                        fill="#22C55E"
                        radius={[0,6,6,0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

                {/* Missing Skills */}

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="mb-4 flex items-center justify-between">

                    <h2 className="text-xl font-semibold">

                      Missing Skills

                    </h2>

                    <AlertTriangle
                      className="text-red-500"
                      size={22}
                    />

                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={220}
                  >

                    <BarChart
                      data={topMissing}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 5,
                      }}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        type="number"
                      />

                      <YAxis
                        type="category"
                        dataKey="skill"
                        width={120}
                        tick={{ fontSize: 13 }}
                      />

                      <Tooltip/>

                      <Bar
                        dataKey="count"
                        fill="#EF4444"
                        radius={[0,6,6,0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

              </div>

              {/* Experience + AI */}

              <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

                {/* Experience */}

                <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                  <div className="mb-5 flex items-center justify-between">

                    <h2 className="text-xl font-semibold">

                      Experience Distribution

                    </h2>

                    <Briefcase
                      className="text-indigo-600"
                      size={22}
                    />

                  </div>

                  <ResponsiveContainer
                    width="100%"
                    height={220}
                  >

                    <BarChart
                      data={experienceData}
                    >

                      <CartesianGrid
                        strokeDasharray="3 3"
                      />

                      <XAxis
                        dataKey="year"
                      />

                      <YAxis/>

                      <Tooltip/>

                      <Bar
                        dataKey="count"
                        fill="#8B5CF6"
                        radius={[6,6,0,0]}
                      />

                    </BarChart>

                  </ResponsiveContainer>

                </div>

                {/* AI Recommendation */}

                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-6 text-white shadow-lg">

                  <div className="flex items-center gap-3">

                    <BrainCircuit size={26}/>

                    <h2 className="text-xl font-semibold">

                      AI Insight

                    </h2>

                  </div>

                  <div className="mt-6">

                    <p className="text-indigo-100 leading-7">

                      {averageScore>=85
                      ? "Excellent candidate quality. Proceed with interviews."

                      : averageScore>=70
                      ? "Candidate pool is good. More resumes can improve selection."

                      : "Low candidate quality detected. Consider updating the job description."}

                    </p>

                  </div>

                  <div className="mt-6 space-y-4">

                    <div className="flex justify-between">

                      <span>

                        AI Score

                      </span>

                      <span className="font-bold">

                        {averageScore}%

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>

                        Shortlisted

                      </span>

                      <span className="font-bold">

                        {shortlisted}

                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span>

                        Bias Flags

                      </span>

                      <span className="font-bold">

                        {biasFlags}

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </>

          );

        })()}

                {/* ==========================================================
                    EMPTY & LOADING STATE
        ========================================================== */}

        {!selectedJob && (

          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center shadow-sm">

            <Briefcase
              size={44}
              className="mx-auto text-slate-400"
            />

            <h2 className="mt-5 text-2xl font-bold text-slate-900">

              No Job Selected

            </h2>

            <p className="mt-2 text-slate-500">

              Select a job from the sidebar to view analytics.

            </p>

          </div>

        )}

        {loading && (

          <div className="rounded-2xl bg-white py-16 text-center shadow-sm">

            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

            <p className="mt-5 text-slate-500">

              Loading Analytics...

            </p>

          </div>

        )}

      </div>

    </div>

  </div>

</MainLayout>

  );

};

/* ==========================================================
                    STAT CARD
========================================================== */

const StatCard = ({
  title,
  value,
  icon,
  color,
}) => {

  const colors = {

    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },

    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },

    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },

    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },

    violet: {
      bg: "bg-violet-100",
      text: "text-violet-600",
    },

  };

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color].bg}`}
        >

          <div className={colors[color].text}>

            {icon}

          </div>

        </div>

      </div>

      <h2 className="mt-5 text-3xl font-bold text-slate-900">

        {value}

      </h2>

      <p className="mt-1 text-sm text-slate-500">

        {title}

      </p>

    </div>

  );

};

export default Analytics;