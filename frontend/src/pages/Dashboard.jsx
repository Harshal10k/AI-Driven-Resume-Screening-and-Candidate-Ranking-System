import MainLayout from "../layouts/MainLayout";
import FilterBar from "../components/FilterBar";
import CandidateCard from "../components/CandidateCard";
import StatsCard from "../components/StatsCard";
import { useState } from "react";
import { useJobs } from "../context/JobsContext";

const Dashboard = () => {
  const { selectedJob } = useJobs();

  const [sortBy, setSortBy] = useState("score");
  const [filterStatus, setFilterStatus] = useState("All");

  // Temporary until Candidate API is connected
  const candidates = [];

  // Sort Candidates
  const sortedCandidates = [...candidates].sort((a, b) => {
    if (sortBy === "score") {
      return b.score - a.score;
    }

    if (sortBy === "experience") {
      return Number(b.experience) - Number(a.experience);
    }

    if (sortBy === "skills") {
      return b.skills.length - a.skills.length;
    }

    return 0;
  });

  // Status Filter
  const filteredCandidates = sortedCandidates.filter((candidate) => {
    if (filterStatus === "All") return true;

    if (filterStatus === "Shortlisted") {
      return candidate.status === "Shortlisted";
    }

    if (filterStatus === "Rejected") {
      return candidate.status === "Rejected";
    }

    return true;
  });

  // Job Filter
  const jobFilteredCandidates = filteredCandidates.filter((candidate) => {
    if (selectedJob === "All Jobs") {
      return true;
    }

    return candidate.jobTitle === selectedJob;
  });

  // Dynamic Stats
  const totalCandidates = jobFilteredCandidates.length;

  const shortlistedCount = jobFilteredCandidates.filter(
    (c) => c.status === "Shortlisted"
  ).length;

  const rejectedCount = jobFilteredCandidates.filter(
    (c) => c.status === "Rejected"
  ).length;

  const averageScore =
    totalCandidates > 0
      ? Math.round(
          jobFilteredCandidates.reduce(
            (sum, candidate) => sum + candidate.score,
            0
          ) / totalCandidates
        )
      : 0;

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            AI Resume Screening
          </h1>

          <p className="text-slate-500 mt-2">
            Review and rank candidates using AI
          </p>
        </div>

        <div className="flex gap-3">
          <button className="bg-white border border-slate-300 px-5 py-3 rounded-xl shadow-sm hover:bg-slate-50 transition">
            Export Shortlist
          </button>

          <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl shadow-sm hover:bg-indigo-700 transition">
            Re-run AI Screen
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Applicants"
          value={totalCandidates}
          subtitle="Total Applications"
        />

        <StatsCard
          title="Shortlisted"
          value={shortlistedCount}
          subtitle="Top Candidates"
        />

        <StatsCard
          title="Average Score"
          value={`${averageScore}%`}
          subtitle="AI Match Rate"
        />

        <StatsCard
          title="Bias Flags"
          value="0"
          subtitle="Need Review"
        />
      </div>

      {/* Candidate Section Header */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          {selectedJob === "All Jobs"
            ? "Candidate Rankings"
            : `${selectedJob} - Ranked Candidates`}
        </h2>

        <p className="text-slate-500 mt-1">
          AI scored {jobFilteredCandidates.length} resumes · Ranked by overall fit
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        totalCandidates={totalCandidates}
        shortlistedCount={shortlistedCount}
        rejectedCount={rejectedCount}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      {/* Candidate Cards */}
      <div className="space-y-4">
        {jobFilteredCandidates.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border">
            <h3 className="text-xl font-semibold text-slate-600">
              No Candidates Yet
            </h3>

            <p className="text-slate-500 mt-2">
              Upload resumes to start AI screening
            </p>
          </div>
        ) : (
          jobFilteredCandidates.map((candidate, index) => (
            <CandidateCard
              key={candidate.id}
              rank={index + 1}
              name={candidate.name}
              role={candidate.role}
              score={candidate.score}
              skills={candidate.skills}
              experience={candidate.experience}
              education={candidate.education}
              status={candidate.status}
              reason={candidate.reason}
              confidence={candidate.confidence}
              resume={candidate.resume}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;