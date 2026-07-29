import {
  X,
  Mail,
  Phone,
  Briefcase,
  BrainCircuit,
  UserCheck,
  Calendar,
  Building2,
} from "lucide-react";

const EmployerDetailsDrawer = ({
  open,
  employer,
  onClose,
}) => {

  if (!open || !employer) return null;

  return (

    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 h-screen w-full max-w-md overflow-y-auto bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white p-6">

          <h2 className="text-2xl font-bold">
            Employer Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Profile */}

        <div className="p-6">

          <div className="flex flex-col items-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 text-4xl font-bold text-white shadow-lg">

              {employer.name?.charAt(0).toUpperCase()}

            </div>

            <h2 className="mt-5 text-2xl font-bold">

              {employer.name}

            </h2>

            <p className="mt-1 text-slate-500">

              HR Recruiter

            </p>

            <span className="mt-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

              Active

            </span>

          </div>

          {/* Information */}

          <div className="mt-10 space-y-5">

            <InfoCard
              icon={<Mail size={18} />}
              title="Email"
              value={employer.email}
            />

            <InfoCard
              icon={<Phone size={18} />}
              title="Phone"
              value={employer.phone || "Not Available"}
            />

            <InfoCard
              icon={<Building2 size={18} />}
              title="Department"
              value={employer.department || "Recruitment"}
            />

            <InfoCard
              icon={<Calendar size={18} />}
              title="Created"
              value={
                employer.createdAt
                  ? new Date(
                      employer.createdAt
                    ).toLocaleDateString()
                  : "-"
              }
            />

          </div>

          {/* Statistics */}

          <div className="mt-10">

            <h3 className="mb-4 text-lg font-semibold">

              Performance

            </h3>

            <div className="grid grid-cols-3 gap-4">

              <StatCard
                icon={
                  <Briefcase size={22} />
                }
                color="bg-indigo-100 text-indigo-600"
                value={
                  employer.jobsCreated || 0
                }
                title="Jobs"
              />

              <StatCard
                icon={
                  <BrainCircuit size={22} />
                }
                color="bg-orange-100 text-orange-600"
                value={
                  employer.candidatesScreened || 0
                }
                title="Screened"
              />

              <StatCard
                icon={
                  <UserCheck size={22} />
                }
                color="bg-pink-100 text-pink-600"
                value={
                  employer.shortlisted || 0
                }
                title="Shortlisted"
              />

            </div>

          </div>

        </div>

      </div>

    </>

  );

};

const InfoCard = ({
  icon,
  title,
  value,
}) => (

  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4">

    <div className="rounded-xl bg-slate-100 p-3">

      {icon}

    </div>

    <div>

      <p className="text-xs uppercase tracking-wide text-slate-400">

        {title}

      </p>

      <p className="mt-1 font-medium text-slate-700">

        {value}

      </p>

    </div>

  </div>

);

const StatCard = ({
  icon,
  value,
  title,
  color,
}) => (

  <div className="rounded-2xl border border-slate-200 p-4 text-center">

    <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>

      {icon}

    </div>

    <h2 className="mt-3 text-2xl font-bold">

      {value}

    </h2>

    <p className="mt-1 text-xs text-slate-500">

      {title}

    </p>

  </div>

);

export default EmployerDetailsDrawer;