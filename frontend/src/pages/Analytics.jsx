import MainLayout from "../layouts/MainLayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {

  // Temporary Data
  const totalApplicants = 0;
  const shortlisted = 0;
  const rejected = 0;
  const averageScore = 0;

  const scoreData = [
    { range: "90-100", count: 0 },
    { range: "80-89", count: 0 },
    { range: "70-79", count: 0 },
    { range: "60-69", count: 0 },
  ];

  const skillData = [];

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