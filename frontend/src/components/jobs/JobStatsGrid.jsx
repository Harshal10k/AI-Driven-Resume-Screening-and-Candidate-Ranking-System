import {
  Users,
  CheckCircle2,
  Clock3,
  XCircle,
  FileText,
  BrainCircuit,
  TrendingUp,
  Target,
} from "lucide-react";

const JobStatsGrid = ({
  resumes,
}) => {

  const applicants = resumes.length;

  const recentUploads = [...resumes]
  .sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  ) 
  .slice(0, 5);

  const shortlisted =
    resumes.filter(
      (c) =>
        c.candidate_status === "shortlisted"
    ).length;

  const pending =
    resumes.filter(
      (c) =>
        c.candidate_status === "pending"
    ).length;

  const rejected =
    resumes.filter(
      (c) =>
        c.candidate_status === "rejected"
    ).length;

  const averageScore =
    applicants
      ? Math.round(
          resumes.reduce(
            (sum, c) =>
              sum +
              (c.match_score || 0),
            0
          ) / applicants
        )
      : 0;

  /* ==========================
      Top Skill
  ========================== */

  const skillMap = {};

  resumes.forEach((candidate) => {

    candidate.matched_skills?.forEach(
      (skill) => {

        skillMap[skill] =
          (skillMap[skill] || 0) + 1;

      }
    );

  });

  const topSkill =
    Object.entries(skillMap).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "--";

  /* ==========================
      Missing Skill
  ========================== */

  const missingMap = {};

  resumes.forEach((candidate) => {

    candidate.missing_skills?.forEach(
      (skill) => {

        missingMap[skill] =
          (missingMap[skill] || 0) + 1;

      }
    );

  });

  const missingSkill =
    Object.entries(missingMap).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "--";

  const stats = [

    {
      title: "Applicants",
      value: applicants,
      icon: Users,
      color:
        "text-blue-600",
      bg:
        "bg-blue-100",
    },

    {
      title: "Shortlisted",
      value: shortlisted,
      icon: CheckCircle2,
      color:
        "text-green-600",
      bg:
        "bg-green-100",
    },

    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color:
        "text-amber-600",
      bg:
        "bg-amber-100",
    },

    {
      title: "Rejected",
      value: rejected,
      icon: XCircle,
      color:
        "text-red-600",
      bg:
        "bg-red-100",
    },

  ];

  return (

    <div className="space-y-5">

      {/* ================= Stats ================= */}

      <div className="grid grid-cols-2 gap-4">

        {stats.map((stat) => {

          const Icon = stat.icon;

          return (

            <div
              key={stat.title}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">

                    {stat.title}

                  </p>

                  <h2 className="mt-2 text-4xl font-bold text-slate-900">

                    {stat.value}

                  </h2>

                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg}`}
                >

                  <Icon
                    size={22}
                    className={stat.color}
                  />

                </div>

              </div>

            </div>

          );

        })}

      </div>

      {/* ================= Recent Uploads ================= */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>

            <h3 className="text-lg font-semibold text-slate-900">

              Recent Uploads

            </h3>

            <p className="text-sm text-slate-500">

              Latest uploaded resumes

            </p>

          </div>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">

            {recentUploads.length}

          </span>

        </div>

        {recentUploads.length === 0 ? (

          <div className="rounded-2xl border border-dashed border-slate-200 py-8 text-center">

            <FileText
              size={34}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 text-sm text-slate-400">

              No resumes uploaded yet.

            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {recentUploads
              .slice(0, 4)
              .map((file) => (

                <div
                  key={file._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-red-50 p-2">

                      <FileText
                        size={18}
                        className="text-red-500"
                      />

                    </div>

                    <div>

                      <p className="max-w-[150px] truncate text-sm font-medium text-slate-900">

                        {file.original_name}

                      </p>

                      <p className="text-xs text-slate-500">

                        {new Date(file.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}

                      </p>

                    </div>

                  </div>

                  <span
                    className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                      file.processing_status === "scored"
                        ? "bg-green-100 text-green-700"
                        : file.processing_status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >

                    {file.processing_status}

                  </span>

                </div>

              ))}

          </div>

        )}

      </div>

      {/* ================= AI Insights ================= */}

      <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 p-5 text-white shadow-lg">

        <div className="mb-5 flex items-center gap-2">

          <BrainCircuit size={20} />

          <h3 className="text-lg font-semibold">

            AI Insights

          </h3>

        </div>

        <div className="space-y-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <TrendingUp size={18} />

              <span>Average Match</span>

            </div>

            <span className="font-bold">

              {averageScore}%

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span>Top Skill</span>

            <span className="font-semibold">

              {topSkill}

            </span>

          </div>

          <div className="flex items-center justify-between">

            <span>Missing Skill</span>

            <span className="font-semibold">

              {missingSkill}

            </span>

          </div>

          <div className="rounded-2xl bg-white/10 p-4">

            <div className="mb-2 flex items-center gap-2">

              <Target size={18} />

              <span className="font-semibold">

                Recommendation

              </span>

            </div>

            <p className="text-sm text-indigo-100">

              {averageScore >= 80
                ? "Strong candidate pool. Proceed with interviews."
                : averageScore >= 65
                ? "Review borderline candidates before shortlisting."
                : "Refine job requirements or upload more resumes."}

            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default JobStatsGrid;