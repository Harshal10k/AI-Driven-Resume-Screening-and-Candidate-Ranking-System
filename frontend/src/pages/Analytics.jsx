import MainLayout from "../layouts/MainLayout";
import { candidates } from "../data/candidates";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {

  // Stats
  const totalApplicants = candidates.length;

  const shortlisted = candidates.filter(
    (c) => c.status === "Shortlisted"
  ).length;

  const rejected = candidates.filter(
    (c) => c.status === "Rejected"
  ).length;

  const averageScore =
    totalApplicants > 0
      ? Math.round(
          candidates.reduce(
            (sum, c) => sum + c.score,
            0
          ) / totalApplicants
        )
      : 0;

  // Score Distribution
  const scoreData = [
    {
      range: "90-100",
      count: candidates.filter(
        (c) => c.score >= 90
      ).length,
    },
    {
      range: "80-89",
      count: candidates.filter(
        (c) => c.score >= 80 && c.score < 90
      ).length,
    },
    {
      range: "70-79",
      count: candidates.filter(
        (c) => c.score >= 70 && c.score < 80
      ).length,
    },
    {
      range: "60-69",
      count: candidates.filter(
        (c) => c.score >= 60 && c.score < 70
      ).length,
    },
  ];

  // Skills Analysis
  const skillCounts = {};

  candidates.forEach((candidate) => {
    candidate.skills.forEach((skill) => {
      skillCounts[skill] =
        (skillCounts[skill] || 0) + 1;
    });
  });

  const skillData = Object.entries(skillCounts)
    .map(([skill, count]) => ({
      skill,
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-slate-500 mt-1">
          AI Screening Insights
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-slate-500">
            Total Applicants
          </h3>

          <h2 className="text-4xl font-bold mt-3">
            {totalApplicants}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-slate-500">
            Shortlisted
          </h3>

          <h2 className="text-4xl font-bold mt-3">
            {shortlisted}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-slate-500">
            Rejected
          </h3>

          <h2 className="text-4xl font-bold mt-3">
            {rejected}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-slate-500">
            Average Score
          </h3>

          <h2 className="text-4xl font-bold mt-3">
            {averageScore}%
          </h2>
        </div>

      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">

        {/* Score Distribution */}
        <div className="bg-white rounded-2xl border p-6 h-96">

          <h3 className="font-semibold text-lg mb-4">
            Score Distribution
          </h3>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={scoreData}>
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="count"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

        {/* Skills Analysis */}
        <div className="bg-white rounded-2xl border p-6 h-96">

          <h3 className="font-semibold text-lg mb-4">
            Skills Analysis
          </h3>

          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={skillData}>
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />

              <Bar
                dataKey="count"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

    </MainLayout>
  );
};

export default Analytics;