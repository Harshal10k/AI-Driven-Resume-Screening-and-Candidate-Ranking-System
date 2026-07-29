import { useState } from "react";

import {
  Mail,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Clock3,
  ChevronDown,
} from "lucide-react";


const CandidateCard = ({
  candidate,
  expanded,
  onToggle,
  jobId,
  updateStatus,
}) => {

  /* ==========================================
      Status Badge
  ========================================== */

  const statusStyles = {

    shortlisted:
      "bg-green-100 text-green-700",

    pending:
      "bg-yellow-100 text-yellow-700",

    rejected:
      "bg-red-100 text-red-700",

  };

  /* ==========================================
      Score Ring Color
  ========================================== */

  const scoreColor =
    candidate.match_score >= 85
      ? "border-green-500"

      : candidate.match_score >= 70
      ? "border-yellow-500"

      : "border-red-500";

  const isShortlisted =
    candidate.candidate_status === "shortlisted";

  const isPending =
    candidate.candidate_status === "pending";

  const isRejected =
    candidate.candidate_status === "rejected";

  return (

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">

      {/* ==========================================
              HEADER
      ========================================== */}

      <div className="flex items-center justify-between px-5 py-4">

        {/* LEFT */}

        <div className="flex items-center gap-4">

          {/* Rank */}

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">

            <span className="text-base font-bold text-indigo-700">

              #{candidate.rank ?? "-"}

            </span>

          </div>

          {/* Candidate */}

          <div className="flex flex-col justify-center">

            <div className="flex items-center gap-2">

              <h3 className="text-lg font-semibold tracking-tight leading-none text-slate-900">
                {candidate.candidate_name}
              </h3>

              <span
               className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  statusStyles[candidate.candidate_status] || "bg-slate-100 text-slate-700"
               }`}
              >
                {candidate.candidate_status}
              </span>

            </div>

            <div className="mt-0.5 flex items-center gap-2 text-sm text-slate-500">

              <Mail size={15} />

              <span>{candidate.email}</span>

              <span>•</span>

              <span>

                  Applied on{" "}

                  {new Date(candidate.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                  })}

              </span>

          </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-4">

          {/* Score */}

          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full border-4 ${scoreColor}`}
          >

            <span className="text-lg font-bold text-slate-900">

              {candidate.match_score ?? 0}%

            </span>

          </div>

          {/* Expand */}

          <button
            onClick={onToggle}
            className="rounded-xl border border-slate-200 p-2 transition hover:bg-slate-50"
          >

            <ChevronDown
              className={`transition-transform duration-300 ${
                expanded
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

        </div>

      </div>

      {/* ==========================================
              EXPANDED CONTENT
      ========================================== */}

      {expanded && (
                <>
          {/* ==========================================
                  DETAILS
          ========================================== */}

          <div className="grid grid-cols-3 border-t border-slate-100">

            {/* LEFT */}

            <div className="space-y-5 p-5">

              <div className="flex items-center gap-3">

                <Briefcase
                  size={20}
                  className="text-slate-500"
                />

                <div>

                  <p className="text-sm text-slate-500">

                    Experience

                  </p>

                  <p className="font-semibold text-slate-900">

                    {candidate.experience_years ?? 0} Years

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <GraduationCap
                  size={20}
                  className="text-slate-500"
                />

                <div>

                  <p className="text-sm text-slate-500">

                    Education

                  </p>

                  <p className="font-semibold text-slate-900">

                    {candidate.education ||
                      "Not Mentioned"}

                  </p>

                </div>

              </div>

            </div>

            {/* MIDDLE */}

            <div className="border-l border-r border-slate-100 p-5">

              <h4 className="mb-2 font-semibold text-slate-900">

                Matched Skills

              </h4>

              <div className="flex flex-wrap gap-2">

                {candidate.matched_skills?.length ? (

                  candidate.matched_skills.map(
                    (skill) => (

                      <span
                        key={skill}
                        className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                      >

                        ✓ {skill}

                      </span>

                    )
                  )

                ) : (

                  <span className="text-sm text-slate-400">

                    No matched skills

                  </span>

                )}

              </div>

              {!!candidate.missing_skills?.length && (

                <>

                  <h4 className="mt-5 mb-3 font-semibold text-slate-900">

                    Missing Skills

                  </h4>

                  <div className="flex flex-wrap gap-2">

                    {candidate.missing_skills.map(
                      (skill) => (

                        <span
                          key={skill}
                          className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600"
                        >

                          ✕ {skill}

                        </span>

                      )
                    )}

                  </div>

                </>

              )}

            </div>

            {/* RIGHT */}

            <div className="p-5">

              <h4 className="mb-3 font-semibold text-slate-900">

                AI Analysis

              </h4>

              <p className="text-sm leading-6 text-slate-600">

                {candidate.explanation ||
                  "No AI explanation available."}

              </p>

            </div>

          </div>

          {/* ==========================================
                  ACTIONS
          ========================================== */}

          <div className="grid grid-cols-3 gap-3 border-t border-slate-100 p-4">

            <button
              onClick={() =>
                updateStatus(
                  candidate._id,
                  "shortlisted",
                  jobId
                )
              }
              className={`flex items-center justify-center gap-2 rounded-2xl py-2.5 font-semibold transition
              ${
                isShortlisted
                  ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                  : "border-green-200 text-green-600 hover:bg-green-50"
              }`}
            >

              <CheckCircle2 size={16} />

              Shortlist

            </button>

            <button
              onClick={() =>
                updateStatus(
                  candidate._id,
                  "pending",
                  jobId
                )
              }
              className={`flex items-center justify-center gap-2 rounded-2xl py-2.5 font-semibold transition
              ${
                isPending
                  ? "border-amber-500 bg-amber-50 text-amber-700 shadow-sm"
                  : "border-amber-200 text-amber-600 hover:bg-amber-50"
              }`}
            >

              <Clock3 size={16} />

              Pending

            </button>

            <button
              onClick={() =>
                updateStatus(
                  candidate._id,
                  "rejected",
                  jobId
                )
              }
              className={`flex items-center justify-center gap-2 rounded-2xl py-2.5 font-semibold transition
              ${
                isRejected
                  ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
                  : "border-red-200 text-red-600 hover:bg-red-50"
              }`}
            >

              <XCircle size={16} />

              Reject

            </button>

          </div>

        </>
      )}

    </div>

  );

};

export default CandidateCard;