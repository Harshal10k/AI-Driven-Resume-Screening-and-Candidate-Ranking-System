import { useState } from "react";

import {
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import CandidateCard from "./CandidateCard";

const RankedCandidates = ({
  candidates,
  sortBy,
  setSortBy,
  filterStatus,
  setFilterStatus,
  search,
  setSearch,

  totalCandidates,
  shortlistedCount,
  pendingCount,
  rejectedCount,

  selectedJob,
  updateStatus,
}) => {

  const [expandedId, setExpandedId] =
    useState(null);

  return (

    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* =======================================
              HEADER
      ======================================= */}

      <div className="flex items-start justify-between p-7">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">

            <Sparkles
              size={24}
              className="text-indigo-600"
            />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900">

              Ranked Candidates

            </h2>

            <p className="mt-1 text-sm text-slate-500">

              AI ranked candidates based on overall fit

            </p>

          </div>

        </div>

        {/* SORT */}

        <div className="relative">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="
              appearance-none
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              pr-12
              text-sm
              font-medium
              outline-none
              transition
              hover:border-indigo-400
              focus:border-indigo-500
            "
          >

            <option value="score">

              Highest AI Score

            </option>

            <option value="experience">

              Experience

            </option>

            <option value="skills">

              Skills Match

            </option>

          </select>

          <ChevronDown
            size={18}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
          />

        </div>

      </div>

      {/* =======================================
              FILTER + SEARCH
      ======================================= */}

      <div className="flex items-center justify-between border-t border-slate-100 px-7 py-5">

        {/* FILTERS */}

        <div className="flex flex-wrap gap-3">

          {[
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

          ].map((item) => (

            <button
              key={item.label}
              onClick={() =>
                setFilterStatus(item.label)
              }
              className={`
                rounded-full
                px-5
                py-2
                text-sm
                font-semibold
                transition-all
                ${
                  filterStatus === item.label
                    ? "bg-indigo-600 text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                }
              `}
            >

              {item.label}

              <span className="ml-1">

                ({item.count})

              </span>

            </button>

          ))}

        </div>

        {/* SEARCH */}

        <div className="relative w-80">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search candidates..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-indigo-500
            "
          />

        </div>

      </div>

      {/* =======================================
              CANDIDATES
      ======================================= */}

      <div className="space-y-5 border-t border-slate-100 p-6">
                {candidates.length > 0 ? (

          candidates.map((candidate) => (

            <CandidateCard
              key={candidate._id}
              candidate={candidate}
              expanded={
                expandedId === candidate._id
              }
              onToggle={() =>
                setExpandedId(
                  expandedId === candidate._id
                    ? null
                    : candidate._id
                )
              }
              jobId={selectedJob?._id}
              updateStatus={updateStatus}
            />

          ))

        ) : (

          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-20">

            <Sparkles
              size={42}
              className="mb-5 text-slate-400"
            />

            <h3 className="text-xl font-semibold text-slate-700">

              No Candidates Found

            </h3>

            <p className="mt-2 text-sm text-slate-500">

              Try changing the search term or filter.

            </p>

          </div>

        )}

      </div>

    </section>

  );

};

export default RankedCandidates;