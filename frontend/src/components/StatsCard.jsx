import React from "react";

const colorMap = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    border: "border-blue-500",
    line: "bg-blue-500",
  },

  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-500",
    line: "bg-green-500",
  },

  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    border: "border-yellow-500",
    line: "bg-yellow-500",
  },

  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    border: "border-red-500",
    line: "bg-red-500",
  },
};

const StatsCard = ({
  icon,
  title,
  value,
  subtitle,
  color = "blue",
}) => {

  // Prevent crash if an invalid color is passed
  const theme = colorMap[color] || colorMap.blue;

  return (

    <div
      className={`group relative overflow-hidden rounded-3xl border ${theme.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
    >

      {/* Top Accent */}

      <div
        className={`absolute left-0 top-0 h-1 w-full ${theme.line}`}
      />

      <div className="flex items-start justify-between">

        {/* Left */}

        <div>

          <p className="text-sm font-medium text-slate-500">

            {title}

          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">

            {value}

          </h2>

          {subtitle && (

            <p className="mt-2 text-sm text-slate-400">

              {subtitle}

            </p>

          )}

        </div>

        {/* Right */}

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${theme.bg} ${theme.text} transition-all duration-300 group-hover:scale-110`}
        >

          {icon}

        </div>

      </div>

    </div>

  );

};

export default StatsCard;