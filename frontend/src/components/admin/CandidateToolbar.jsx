import { Users } from "lucide-react";

const CandidateToolbar = ({ totalCandidates }) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Candidate Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage and monitor candidate registrations.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-blue-100 p-3">

            <Users
              className="text-blue-600"
              size={26}
            />

          </div>

          <div>

            <p className="text-sm text-slate-500">
              Total Candidates
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              {totalCandidates}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CandidateToolbar;