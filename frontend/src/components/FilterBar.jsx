import React from "react";

const FilterBar = ({
  totalCandidates,
  shortlistedCount,
  rejectedCount,
  sortBy,
  setSortBy,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">

      {/* Left Side Filters */}
      <div className="flex gap-3">

        <button
          onClick={() => setFilterStatus("All")}
          className={`px-5 py-2 rounded-full transition ${
            filterStatus === "All"
              ? "bg-slate-900 text-white"
              : "border border-slate-300 bg-white hover:bg-slate-50"
          }`}
        >
          All ({totalCandidates})
        </button>

        <button
          onClick={() => setFilterStatus("Shortlisted")}
          className={`px-5 py-2 rounded-full transition ${
            filterStatus === "Shortlisted"
              ? "bg-slate-900 text-white"
              : "border border-slate-300 bg-white hover:bg-slate-50"
          }`}
        >
          Shortlisted ({shortlistedCount})
        </button>

        <button
          onClick={() => setFilterStatus("Rejected")}
          className={`px-5 py-2 rounded-full transition ${
            filterStatus === "Rejected"
              ? "bg-slate-900 text-white"
              : "border border-slate-300 bg-white hover:bg-slate-50"
          }`}
        >
          Rejected ({rejectedCount})
        </button>

      </div>

      {/* Right Side Sort */}
      <div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-slate-300 bg-white rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="score">
            Sort by Score
          </option>

          <option value="experience">
            Sort by Experience
          </option>

          <option value="skills">
            Sort by Skills
          </option>

        </select>

      </div>

    </div>
  );
};

export default FilterBar;