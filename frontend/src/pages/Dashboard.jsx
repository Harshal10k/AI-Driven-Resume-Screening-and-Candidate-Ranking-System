import { useMemo, useEffect, useState } from "react";

import DashboardSidebar from "../components/sidebar/DashboardSidebar";

import HeroSection from "../components/dashboard/HeroSection";
import StatsGrid from "../components/dashboard/StatsGrid";
import RankedCandidates from "../components/dashboard/RankedCandidates";

import { useJobs } from "../context/JobsContext";
import { useResumes } from "../context/ResumeContext";

import RightSidebar from "../components/dashboard/RightSidebar";

import Navbar from "../components/Navbar";

const Dashboard = () => {
  // Temporary UI state

const {
  jobs,
  filteredJobs,
  showClosedJobs,
  setShowClosedJobs,
  selectedJob,
  setSelectedJob,
} = useJobs();

const {
    resumes,
    fetchResumes,
    updateStatus,
    exportCandidates,
    rerunAI,
    loading,
} = useResumes();

const [sortBy, setSortBy] =
    useState("score");

const [filterStatus, setFilterStatus] =
    useState("All");

const [search, setSearch] =
    useState("");

useEffect(() => {
  if (
    filteredJobs.length > 0 &&
    selectedJob === null
  ) {
    setSelectedJob(filteredJobs[0]);
  }
}, [
  filteredJobs,
  selectedJob,
  setSelectedJob,
]);

useEffect(() => {
    if (!selectedJob) return;

    if (selectedJob._id === "all") {
        fetchResumes("all");
        return;
    }

    fetchResumes(selectedJob._id);

}, [
    selectedJob,
    fetchResumes,
]);

const totalApplicants =
    resumes.length;

const shortlistedCount =
    resumes.filter(
        (c) =>
            c.candidate_status ===
            "shortlisted"
    ).length;

const pendingCount =
    resumes.filter(
        (c) =>
            c.candidate_status ===
            "pending"
    ).length;

const rejectedCount =
    resumes.filter(
        (c) =>
            c.candidate_status ===
            "rejected"
    ).length;

const biasFlags =
    resumes.reduce(
        (sum, c) =>
            sum +
            (c.bias_flags?.length || 0),
        0
    );

const averageScore =
    resumes.length
        ? Math.round(
              resumes.reduce(
                  (sum, c) =>
                      sum +
                      (c.match_score || 0),
                  0
              ) / resumes.length
          )
        : 0;

const filteredCandidates =
    useMemo(() => {

        let data = [...resumes];

        if (
            filterStatus !==
            "All"
        ) {

            data = data.filter(
                (candidate) =>
                    candidate.candidate_status ===
                    filterStatus.toLowerCase()
            );

        }

        if (
            search.trim()
        ) {

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

        switch (
            sortBy
        ) {

            case "experience":

                data.sort(
                    (a, b) =>
                        (b.experience_years || 0)
                        -
                        (a.experience_years || 0)
                );

                break;

            case "skills":

                data.sort(
                    (a, b) =>
                        (b.matched_skills
                            ?.length || 0)
                        -
                        (a.matched_skills
                            ?.length || 0)
                );

                break;

            default:

                data.sort(
                    (a, b) =>
                        (b.match_score || 0)
                        -
                        (a.match_score || 0)
                );

        }

        return data;

    }, [
        resumes,
        filterStatus,
        search,
        sortBy,
    ]);


  return (
  <div className="min-h-screen bg-slate-100">

    {/* ================= NAVBAR ================= */}

    <Navbar />

    {/* ================= DASHBOARD ================= */}

    <div className="px-5 py-5 xl:px-6 xl:py-6">

      <div className="flex gap-5">

        {/* Left Sidebar */}

        <div className="w-[310px] shrink-0">

          <DashboardSidebar />

        </div>

        {/* Main */}

        <div className="flex-1">

          <div className="grid grid-cols-12 gap-5">

            {/* ================= CENTER ================= */}

            <div className="col-span-12 xl:col-span-9 space-y-5">

              <HeroSection
                averageScore={averageScore}
                loading={loading}
                onExport={() =>
                    exportCandidates(selectedJob?._id)
                }
                onRescreen={() =>
                    rerunAI(selectedJob?._id)
                }
              />

              <StatsGrid
                totalApplicants={totalApplicants}
                shortlisted={shortlistedCount}
                averageScore={averageScore}
                biasFlags={biasFlags}
              />

              <RankedCandidates
                candidates={filteredCandidates}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
                search={search}
                setSearch={setSearch}
                totalCandidates={totalApplicants}
                shortlistedCount={shortlistedCount}
                pendingCount={pendingCount}
                rejectedCount={rejectedCount}
                selectedJob={selectedJob}
                updateStatus={updateStatus}
              />

            </div>

            {/* ================= RIGHT ================= */}

            <div className="col-span-12 xl:col-span-3 xl:max-w-[280px]">

              <RightSidebar
                resumes={resumes}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  );
};

export default Dashboard;