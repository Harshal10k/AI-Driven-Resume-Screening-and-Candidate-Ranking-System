import {
  Mail,
  Building2,
  Users,
  Calendar,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const EmployerCard = ({
    employer, 
    onView,
    onEdit,
    onDelete,
   }) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg">

      <div className="flex flex-col gap-5 xl:flex-row xl:items-center">

        {/* Company / Employer */}

        <div className="flex min-w-[260px] items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-xl font-bold text-white shadow">

            {(employer.company || employer.name)
              ?.charAt(0)
              .toUpperCase()}

          </div>

          <div>

            <h3 className="text-xl font-bold text-slate-900">
              {employer.company || "No Company"}
            </h3>

            <p className="mt-1 text-indigo-600">
              {employer.name}
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
              Contact Email
            </p>

            <p className="font-medium text-slate-700 break-all">
              {employer.email}
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
              {employer.company || "Not Assigned"}
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
              {employer.department || "Not Assigned"}
            </p>

          </div>

        </div>

        {/* Joined */}

        <div className="flex min-w-[170px] items-center gap-3">

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

              {employer.createdAt
                ? new Date(
                    employer.createdAt
                  ).toLocaleDateString()
                : "-"}

            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="flex items-center gap-2">

          {/* View */}

          <button
            onClick={onView}
            title="View Details"
            className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >
            <Eye size={18} />
          </button>

          {/* Edit */}

          <button
            onClick={onEdit}
            title="Edit Employer"
            className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-600 transition hover:bg-amber-500 hover:text-white"
          >
            <Pencil size={18} />
          </button>

          {/* Delete */}

          <button
            onClick={onDelete}
            title="Delete Employer"
            className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
};

export default EmployerCard;