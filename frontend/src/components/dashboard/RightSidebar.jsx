import {
  TrendingUp,
  Target,
  BrainCircuit,
  Clock3,
} from "lucide-react";

const RightSidebar = ({ resumes }) => {
  /* ==========================================
      PIPELINE
  ========================================== */

  const totalApplicants = resumes.length;

  const shortlisted = resumes.filter(
    (c) => c.candidate_status === "shortlisted"
  ).length;

  const pending = resumes.filter(
    (c) => c.candidate_status === "pending"
  ).length;

  const rejected = resumes.filter(
    (c) => c.candidate_status === "rejected"
  ).length;

  /* ==========================================
      TOP MATCHING SKILLS
  ========================================== */

  const skillMap = {};

  resumes.forEach((candidate) => {
    candidate.matched_skills?.forEach((skill) => {
      skillMap[skill] = (skillMap[skill] || 0) + 1;
    });
  });

  const topSkills = Object.entries(skillMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const averageScore =
  resumes.length > 0
    ? Math.round(
        resumes.reduce(
          (sum, candidate) =>
            sum + (candidate.match_score || 0),
          0
        ) / resumes.length
      )
    : 0;

  const maxSkillCount =
    topSkills.length > 0 ? topSkills[0][1] : 1;

  return (
    <div className="space-y-5">

      {/* =====================================
              Recruitment Pipeline
      ===================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-2">

            <TrendingUp
              size={18}
              className="text-indigo-600"
            />

          </div>

          <h3 className="text-lg font-bold text-slate-900">

            Recruitment Pipeline

          </h3>

        </div>

        {/* Applicants */}

        <div className="mb-4">

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-700">

              Applicants

            </span>

            <span className="text-sm font-semibold">

              {totalApplicants}

            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-indigo-600"
              style={{
                width: totalApplicants
                  ? "100%"
                  : "0%",
              }}
            />

          </div>

        </div>

        {/* Shortlisted */}

        <div className="mb-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="font-medium text-slate-700">

              Shortlisted

            </span>

            <span className="font-bold">

              {shortlisted}

            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-green-500"
              style={{
                width: totalApplicants
                  ? `${(shortlisted / totalApplicants) * 100}%`
                  : "0%",
              }}
            />

          </div>

        </div>

        {/* Pending */}

        <div className="mb-5">

          <div className="mb-2 flex items-center justify-between">

            <span className="font-medium text-slate-700">

              Pending

            </span>

            <span className="font-bold">

              {pending}

            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-amber-500"
              style={{
                width: totalApplicants
                  ? `${(pending / totalApplicants) * 100}%`
                  : "0%",
              }}
            />

          </div>

        </div>

        {/* Rejected */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="font-medium text-slate-700">

              Rejected

            </span>

            <span className="font-bold">

              {rejected}

            </span>

          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-red-500"
              style={{
                width: totalApplicants
                  ? `${(rejected / totalApplicants) * 100}%`
                  : "0%",
              }}
            />

          </div>

        </div>

      </div>

      {/* =====================================
              Top Matching Skills
      ===================================== */}

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-5 flex items-center gap-3">

          <div className="rounded-xl bg-green-100 p-2">

            <Target
              size={18}
              className="text-green-600"
            />

          </div>

          <h3 className="text-lg font-semibold text-slate-900">

            Top Matching Skills

          </h3>

        </div>

        {topSkills.length === 0 ? (

          <p className="text-sm text-slate-500">

            No skill data available.

          </p>

        ) : (

          <div className="space-y-4">

            {topSkills.map(([skill, count]) => (

              <div key={skill}>

                <div className="mb-1.5 flex items-center justify-between">

                  <span className="text-sm font-medium text-slate-700">

                    {skill}

                  </span>

                  <span className="text-sm font-semibold">

                    {count}

                  </span>

                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-green-500 transition-all"
                    style={{
                      width: `${
                        (count / maxSkillCount) * 100
                      }%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

            {/* =====================================
              AI Recommendation
      ===================================== */}

      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-violet-600 to-blue-600 text-white shadow-lg">

        <div className="p-4">

          <div className="mb-3 flex items-center gap-3">

            <div className="rounded-xl bg-white/10 p-2 backdrop-blur">

              <BrainCircuit size={16} />

            </div>

            <h3 className="text-base font-semibold leading-7">

              AI Recommendation

            </h3>

          </div>

          <p className="text-sm leading-6 text-indigo-100">

            {totalApplicants === 0
              ? "Upload resumes to start AI screening."

              : shortlisted >= pending + rejected

              ? "Excellent candidate quality. Proceed with interview scheduling."

              : averageScore >= 70

              ? "Good candidate pool. One more screening round is recommended."

              : "Candidate quality is below expectations. Consider refining the job requirements."}

          </p>

        </div>

        {/* =====================================
                Last Screening
        ===================================== */}

        <div className="mx-4 mb-4 mt-2 rounded-2xl bg-white/10 p-4 backdrop-blur-md">

          <div className="mb-2 flex items-center gap-3">

            <Clock3 size={16} />

            <span className="text-sm font-semibold">

              Last Screening

            </span>

          </div>

          <p className="text-sm font-medium">

            {resumes.length
              ? new Date(
                  resumes
                    .filter(r => r.scored_at)
                    .sort(
                      (a, b) =>
                        new Date(b.scored_at) -
                        new Date(a.scored_at)
                    )[0]?.scored_at
                ).toLocaleString()

              : "No screening yet"}

          </p>

          <p className="mt-1 text-sm text-indigo-100">

            AI model updated automatically.

          </p>

        </div>

      </div>

    </div>

  );

};

export default RightSidebar;