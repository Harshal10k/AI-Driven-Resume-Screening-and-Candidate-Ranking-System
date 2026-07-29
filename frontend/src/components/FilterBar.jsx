import { Search, ArrowUpDown } from "lucide-react";

const FilterBar = ({
  totalCandidates,
  shortlistedCount,
  rejectedCount,
  pendingCount,
  sortBy,
  setSortBy,
  filterStatus,
  setFilterStatus,
}) => {
  const filters = [
    {
      label: "All",
      count: totalCandidates,
    },
    {
      label: "Shortlisted",
      count: shortlistedCount,
    },
    {
      label: "Pending",
      count: pendingCount,
    },
    {
      label: "Rejected",
      count: rejectedCount,
    },
  ];

  return (
    <div className="space-y-5">

      {/* Top Row */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search candidate..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition-all focus:border-indigo-500 focus:bg-white"
          />

        </div>

        {/* Sort */}

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">

            <ArrowUpDown
              size={18}
              className="text-slate-500"
            />

            <span className="text-sm font-medium text-slate-600">

              Sort By

            </span>

          </div>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium outline-none focus:border-indigo-500"
          >
            <option value="score">
              AI Score
            </option>

            <option value="experience">
              Experience
            </option>

            <option value="skills">
              Skills
            </option>

          </select>

        </div>

      </div>

      {/* Filter Pills */}

      <div className="flex flex-wrap gap-3">

        {filters.map((item) => {

          const active =
            filterStatus === item.label;

          return (

            <button
              key={item.label}
              onClick={() =>
                setFilterStatus(item.label)
              }
              className={`flex items-center gap-3 rounded-full px-5 py-3 font-medium transition-all duration-300 ${
                active
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >

              <span>{item.label}</span>

              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                  active
                    ? "bg-white/20"
                    : "bg-white"
                }`}
              >

                {item.count}

              </span>

            </button>

          );

        })}

      </div>

    </div>
  );
};

export default FilterBar;