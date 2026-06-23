import React, { useState } from "react";
import ScoreRing from "./ScoreRing";

const CandidateCard = ({
  rank,
  name,
  role,
  score,
  skills,
  experience,
  education,
  status,
  reason,
  confidence,
  resume,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm cursor-pointer hover:border-indigo-400 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between">

        <div className="flex gap-4">

          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold">
            #{rank}
          </div>

          <div>

            <h3 className="text-xl font-semibold">
              {name}
            </h3>

            <p className="text-slate-500">
              {role}
            </p>

            <div className="flex gap-4 mt-2 text-sm text-slate-500">

              <span>
                Experience: {experience} Years
              </span>

              <span>
                Education: {education}
              </span>

            </div>

          </div>

        </div>

        <div className="flex flex-col items-end gap-3">

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === "Shortlisted"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status}
          </span>

          <ScoreRing score={score} size={70} />

        </div>

      </div>

      {/* Skills Always Visible */}
      <div className="flex flex-wrap gap-2 mt-5">

        {skills.map((skill) => (
          <span
            key={skill}
            className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

      {/* Expandable Section */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "max-h-[500px] mt-4" : "max-h-0"
        }`}
      >

        <div className="mt-3 text-sm text-slate-600">

          📄 Resume:

          <span className="font-medium ml-2">
            {resume}
          </span>

        </div>

        <div className="mt-3">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
            AI Confidence: {confidence}
          </span>

        </div>

        <div className="mt-3 p-4 bg-slate-50 rounded-lg">

          <h4 className="font-medium mb-2">
            AI Match Reason
          </h4>

          <p className="text-slate-600 text-sm">
            {reason}
          </p>

        </div>

        <div className="flex gap-3 mt-3">

          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Shortlist
          </button>

          <button
            onClick={(e) => e.stopPropagation()}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Reject
          </button>

        </div>

      </div>

    </div>
  );
};

export default CandidateCard;