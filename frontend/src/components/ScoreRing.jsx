import React from "react";

const ScoreRing = ({ score }) => {

  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (score / 100) * circumference;

  const color =
    score >= 85
      ? "#6366F1"
      : score >= 70
      ? "#10B981"
      : score >= 50
      ? "#F59E0B"
      : "#EF4444";

  return (
    <div className="relative w-14 h-14">

      <svg
        width="56"
        height="56"
        className="-rotate-90"
      >
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="#E2E8F0"
          strokeWidth="4"
          fill="none"
        />

        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
        {score}
      </span>
    </div>
  );
};

export default ScoreRing;