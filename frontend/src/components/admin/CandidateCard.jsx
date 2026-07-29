import {
  Mail,
  Building2,
  Users,
  Calendar,
  Eye,
  ChevronRight,
} from "lucide-react";

const CandidateCard = ({ candidate, onView }) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg">

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">

        {/* Avatar + Name */}

        <div className="flex min-w-[260px] items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-xl font-bold text-white shadow">

            {candidate.name?.charAt(0).toUpperCase()}

          </div>

          <div>

            <h3 className="text-xl font-bold text-slate-900">

              {candidate.name}

            </h3>

            <p className="mt-1 capitalize text-indigo-600">

              {candidate.role}

            </p>

          </div>

        </div>

        {/* Email */}

        <div className="flex flex-1 items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-3">

            <Mail
              size={18}
              className="text-blue-600"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">

              Email

            </p>

            <p className="font-medium text-slate-700 break-all">

              {candidate.email}

            </p>

          </div>

        </div>

        {/* Company */}

        <div className="flex flex-1 items-center gap-3">

          <div className="rounded-xl bg-green-100 p-3">

            <Building2
              size={18}
              className="text-green-600"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">

              Company

            </p>

            <p className="font-medium text-slate-700">

              {candidate.company || "Not Assigned"}

            </p>

          </div>

        </div>

        {/* Department */}

        <div className="flex flex-1 items-center gap-3">

          <div className="rounded-xl bg-purple-100 p-3">

            <Users
              size={18}
              className="text-purple-600"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">

              Department

            </p>

            <p className="font-medium text-slate-700">

              {candidate.department || "Not Assigned"}

            </p>

          </div>

        </div>

        {/* Joined */}

        <div className="flex min-w-[160px] items-center gap-3">

          <div className="rounded-xl bg-orange-100 p-3">

            <Calendar
              size={18}
              className="text-orange-600"
            />

          </div>

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-400">

              Joined

            </p>

            <p className="font-medium text-slate-700">

              {candidate.createdAt
                ? new Date(candidate.createdAt).toLocaleDateString()
                : "-"}

            </p>

          </div>

        </div>

        {/* Button */}

        <div className="flex items-center justify-end">

          <button
            onClick={onView}
            className="flex items-center gap-2 rounded-xl border border-indigo-300 px-5 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >

            <Eye size={18} />

            View Details

          </button>

          <ChevronRight
            size={20}
            className="ml-3 text-slate-400 transition group-hover:translate-x-1"
          />

        </div>

      </div>

    </div>
  );
};

export default CandidateCard;