import {
  Users,
  UserCheck,
  UserX,
  Star,
} from "lucide-react";

const CandidateStats = ({ candidates }) => {

  const total = candidates.length;

  const active = candidates.filter(
    (candidate) => candidate.role === "candidate"
  ).length;

  const recent = candidates.filter((candidate) => {

    if (!candidate.createdAt) return false;

    const created = new Date(candidate.createdAt);
    const today = new Date();

    return (
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );

  }).length;

  const inactive = 0;

  const stats = [

    {
      title: "Total Candidates",
      value: total,
      subtitle: "All registered users",
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },

    {
      title: "Active Candidates",
      value: active,
      subtitle: "Currently active",
      icon: UserCheck,
      bg: "bg-green-100",
      color: "text-green-600",
    },

    {
      title: "Recent This Month",
      value: recent,
      subtitle: "New registrations",
      icon: Star,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },

    {
      title: "Inactive",
      value: inactive,
      subtitle: "No activity",
      icon: UserX,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },

  ];

  return (

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
          >

            <div className="flex items-center gap-4">

              <div className={`rounded-2xl ${item.bg} p-4`}>

                <Icon
                  size={24}
                  className={item.color}
                />

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-1 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {item.subtitle}
                </p>

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

};

export default CandidateStats;