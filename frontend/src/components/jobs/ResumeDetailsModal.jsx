import {
  X,
  Mail,
  GraduationCap,
  Briefcase,
  Target,
  BrainCircuit,
  AlertTriangle,
  Calendar,
} from "lucide-react";

const ResumeDetailsModal = ({
  resume,
  onClose,
}) => {
  if (!resume) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">

      <div className="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[30px] bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-blue-700 p-8 text-white">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-indigo-200 font-medium">

                Candidate Profile

              </p>

              <h1 className="mt-2 text-4xl font-bold">

                {resume.candidate_name}

              </h1>

              <p className="mt-2 text-indigo-100">

                AI Resume Analysis

              </p>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-white/10 p-3 hover:bg-white/20"
            >
              <X size={24} />
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-3 gap-8 p-8">

            {/* LEFT */}

            <div className="space-y-5">

                <div className="rounded-2xl border p-5">

                <h3 className="mb-4 text-lg font-bold">

                    Candidate Information

                </h3>

                <div className="space-y-4">

                    <div className="flex gap-3">

                    <Mail className="text-indigo-600" />

                    <div>

                        <p className="text-xs text-slate-500">

                        Email

                        </p>

                        <p className="font-medium">

                        {resume.email || "-"}

                        </p>

                    </div>

                    </div>

                    <div className="flex gap-3">

                    <Briefcase className="text-indigo-600" />

                    <div>

                        <p className="text-xs text-slate-500">

                        Experience

                        </p>

                        <p className="font-medium">

                        {resume.experience_years || 0} Years

                        </p>

                    </div>

                    </div>

                    <div className="flex gap-3">

                    <GraduationCap className="text-indigo-600" />

                    <div>

                        <p className="text-xs text-slate-500">

                        Education

                        </p>

                        <p className="font-medium">

                        {resume.education || "-"}

                        </p>

                    </div>

                    </div>

                    <div className="flex gap-3">

                    <Calendar className="text-indigo-600" />

                    <div>

                        <p className="text-xs text-slate-500">

                        Applied

                        </p>

                        <p className="font-medium">

                        {new Date(
                            resume.createdAt
                        ).toLocaleDateString()}

                        </p>

                    </div>

                    </div>

                </div>

                </div>

                {/* Match Score */}

                <div className="rounded-2xl border bg-indigo-50 p-6 text-center">

                <Target
                    size={40}
                    className="mx-auto text-indigo-600"
                />

                <h3 className="mt-4 text-lg font-bold">

                    AI Match Score

                </h3>

                <p className="mt-3 text-5xl font-extrabold text-indigo-600">

                    {resume.match_score}%

                </p>

                </div>

            </div>

            {/* CENTER */}

            <div className="space-y-5">

                <div className="rounded-2xl border p-5">

                <div className="mb-4 flex items-center gap-2">

                    <BrainCircuit className="text-green-600" />

                    <h3 className="text-lg font-bold">

                    Matched Skills

                    </h3>

                </div>

                <div className="flex flex-wrap gap-2">

                    {resume.matched_skills?.map((skill) => (

                    <span
                        key={skill}
                        className="rounded-full bg-green-100 px-3 py-2 text-sm font-medium text-green-700"
                    >
                        ✓ {skill}
                    </span>

                    ))}

                </div>

                </div>

                <div className="rounded-2xl border p-5">

                <div className="mb-4 flex items-center gap-2">

                    <AlertTriangle className="text-red-500" />

                    <h3 className="text-lg font-bold">

                    Missing Skills

                    </h3>

                </div>

                <div className="flex flex-wrap gap-2">

                    {resume.missing_skills?.length ? (

                    resume.missing_skills.map((skill) => (

                        <span
                        key={skill}
                        className="rounded-full bg-red-100 px-3 py-2 text-sm font-medium text-red-700"
                        >
                        {skill}
                        </span>

                    ))

                    ) : (

                    <span className="text-green-600 font-medium">

                        No missing skills 🎉

                    </span>

                    )}

                </div>

                </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-5">

                <div className="rounded-2xl border p-5">

                <h3 className="mb-4 text-lg font-bold">

                    AI Explanation

                </h3>

                <p className="leading-7 text-slate-600">

                    {resume.explanation}

                </p>

                </div>

                <div className="rounded-2xl border p-5">

                <h3 className="mb-4 text-lg font-bold">

                    Bias Flags

                </h3>

                {resume.bias_flags?.length ? (

                    <div className="space-y-2">

                    {resume.bias_flags.map((flag) => (

                        <div
                        key={flag}
                        className="rounded-lg bg-red-50 p-3 text-red-600"
                        >
                        {flag}
                        </div>

                    ))}

                    </div>

                ) : (

                    <div className="rounded-xl bg-green-50 p-4 text-green-700">

                    No bias detected.

                    </div>

                )}

                </div>

            </div>

            </div>
        </div>
        {/* Footer */}

        <div className="flex justify-end gap-4 border-t bg-slate-50 px-8 py-6">

          <button
            onClick={onClose}
            className="rounded-xl border px-6 py-3"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default ResumeDetailsModal;