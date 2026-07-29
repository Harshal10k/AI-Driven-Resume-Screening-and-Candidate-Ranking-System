import { useMemo, useState } from "react";

import {
  Search,
  Eye,
} from "lucide-react";

const CandidateTable = ({
  resumes,
  selectedJob,
  onViewResume,
}) => {

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("score");

  const filteredCandidates =
    useMemo(() => {

      let data = [...resumes];

      if (status !== "All") {

        data = data.filter(
          (candidate) =>
            candidate.candidate_status ===
            status.toLowerCase()
        );

      }

      if (search.trim()) {

        const keyword =
          search.toLowerCase();

        data = data.filter(
          (candidate) =>

            candidate.candidate_name
              ?.toLowerCase()
              .includes(keyword)

            ||

            candidate.email
              ?.toLowerCase()
              .includes(keyword)

        );

      }

      switch (sortBy) {

        case "experience":

          data.sort(
            (a, b) =>
              (b.experience_years || 0) -
              (a.experience_years || 0)
          );

          break;

        default:

          data.sort(
            (a, b) =>
              (b.match_score || 0) -
              (a.match_score || 0)
          );

      }

      return data;

    }, [
      resumes,
      search,
      status,
      sortBy,
    ]);

  const badgeColor = (status) => {

    switch (status) {

      case "shortlisted":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-red-100 text-red-700";

    }

  };

  return (

    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 p-5">

        <div>

          <h2 className="text-xl font-bold text-slate-900">

            Candidates

          </h2>

          <p className="text-sm text-slate-500">

            {filteredCandidates.length} Candidates

          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          {/* Search */}

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-4">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search..."
              className="h-11 outline-none"
            />

          </div>

          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-xl border border-slate-200 px-4"
          >

            <option>All</option>

            <option>Shortlisted</option>

            <option>Pending</option>

            <option>Rejected</option>

          </select>

          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="rounded-xl border border-slate-200 px-4"
          >

            <option value="score">

              Match Score

            </option>

            <option value="experience">

              Experience

            </option>

          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-200 bg-slate-50">

              <th className="px-6 py-4 text-left">

                Candidate

              </th>

              <th className="text-left">

                Score

              </th>

              <th className="text-left">

                Experience

              </th>

              <th className="text-left">

                Status

              </th>

              <th className="text-left">

                Applied

              </th>

              <th className="text-right pr-6">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {filteredCandidates.map(
              (candidate) => (

                <tr
                  key={candidate._id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-6 py-5">

                    <div>

                      <h4 className="font-semibold">

                        {candidate.candidate_name}

                      </h4>

                      <p className="text-sm text-slate-500">

                        {candidate.email}

                      </p>

                    </div>

                  </td>

                  <td>

                    <span className="font-bold text-indigo-600">

                      {candidate.match_score}%

                    </span>

                  </td>

                  <td>

                    {candidate.experience_years} yrs

                  </td>

                  <td>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${badgeColor(
                        candidate.candidate_status
                      )}`}
                    >

                      {candidate.candidate_status}

                    </span>

                  </td>

                  <td>

                    {new Date(
                      candidate.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td className="pr-6">

                    <div className="flex justify-end">

                      <button
                        onClick={() => onViewResume(candidate)}
                        className="rounded-xl border border-slate-200 p-2 transition hover:bg-indigo-50 hover:border-indigo-300"
                      >
                        <Eye
                          size={18}
                          className="text-indigo-600"
                        />
                      </button>

                    </div>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default CandidateTable;