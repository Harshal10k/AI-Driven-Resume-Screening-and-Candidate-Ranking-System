import React from "react";

const JobCard = ({
  title,
  applicants,
  shortlisted,
  active = false
}) => {
  return (
    <div
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        active
          ? "bg-indigo-50 border-indigo-500"
          : "bg-white border-gray-200"
      }`}
    >
      <h3 className="font-semibold">{title}</h3>

      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>{applicants} applicants</span>

        <span className="text-green-600">
          {shortlisted} shortlisted
        </span>
      </div>
    </div>
  );
};

export default JobCard;