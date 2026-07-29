import {
  X,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Star,
} from "lucide-react";

const CandidateDetailsDrawer = ({
  open,
  onClose,
  candidate,
}) => {
  if (!candidate) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-600 p-8 text-white">

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 text-3xl font-bold backdrop-blur">

                {candidate.name?.charAt(0).toUpperCase()}

              </div>

              <div>

                <h2 className="text-3xl font-bold">

                  {candidate.name}

                </h2>

                <p className="mt-2 text-indigo-100">

                  {candidate.position || "Candidate"}

                </p>

              </div>

            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-white/20 p-2 hover:bg-white/30"
            >
              <X size={22} />
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="space-y-8 overflow-y-auto p-8">

          {/* AI Score */}

          <div className="rounded-3xl bg-indigo-50 p-6 text-center">

            <Star
              size={32}
              className="mx-auto text-yellow-500"
            />

            <p className="mt-3 text-slate-500">

              AI Resume Score

            </p>

            <h2 className="mt-2 text-5xl font-bold text-indigo-700">

              {candidate.score || 0}%

            </h2>

          </div>

          {/* Contact */}

          <div className="grid gap-5">

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">

              <Mail className="text-blue-600" />

              <div>

                <p className="text-sm text-slate-500">

                  Email

                </p>

                <h3 className="font-semibold">

                  {candidate.email}

                </h3>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">

              <Phone className="text-green-600" />

              <div>

                <p className="text-sm text-slate-500">

                  Phone

                </p>

                <h3 className="font-semibold">

                  {candidate.phone || "Not Available"}

                </h3>

              </div>

            </div>

          </div>

          {/* Education */}

          <div className="rounded-3xl border border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <GraduationCap className="text-purple-600" />

              <h3 className="text-xl font-semibold">

                Education

              </h3>

            </div>

            <p className="mt-4 text-slate-600">

              {candidate.education || "Not Added"}

            </p>

          </div>

          {/* Experience */}

          <div className="rounded-3xl border border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <Briefcase className="text-orange-600" />

              <h3 className="text-xl font-semibold">

                Experience

              </h3>

            </div>

            <p className="mt-4 text-slate-600">

              {candidate.experience || 0} Years

            </p>

          </div>

          {/* Skills */}

          <div className="rounded-3xl border border-slate-200 p-6">

            <h3 className="text-xl font-semibold">

              Skills

            </h3>

            <div className="mt-5 flex flex-wrap gap-3">

              {(candidate.skills || []).length > 0 ? (

                candidate.skills.map((skill, index) => (

                  <span
                    key={index}
                    className="rounded-full bg-indigo-100 px-4 py-2 font-medium text-indigo-700"
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <span className="text-slate-400">

                  No skills added

                </span>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CandidateDetailsDrawer;