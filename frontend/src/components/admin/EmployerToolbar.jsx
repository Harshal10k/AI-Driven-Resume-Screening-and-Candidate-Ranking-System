import { Building2, Plus } from "lucide-react";

const EmployerToolbar = ({
  totalEmployers,
  onCreate,
}) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      {/* Left */}

      <div>

        <h1 className="text-4xl font-bold text-slate-900">
          Employer Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage employer accounts and organizations.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        {/* Total Employers */}

        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-green-100 p-3">

              <Building2
                size={26}
                className="text-green-600"
              />

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Total Employers
              </p>

              <h2 className="text-3xl font-bold text-slate-900">
                {totalEmployers}
              </h2>

            </div>

          </div>

        </div>

        {/* Create Button */}

        <button
          onClick={onCreate}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
        >

          <Plus size={20} />

          Create Employer

        </button>

      </div>

    </div>
  );
};

export default EmployerToolbar;