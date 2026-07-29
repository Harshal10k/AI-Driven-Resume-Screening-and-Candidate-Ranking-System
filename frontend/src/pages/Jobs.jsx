import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import JobsSidebar from "../components/sidebar/JobsSidebar";

import UploadResumeCard from "../components/jobs/UploadResumeCard";
import JobStatsGrid from "../components/jobs/JobStatsGrid";
import CandidateTable from "../components/jobs/CandidateTable";

import JobModal from "../components/JobModal";

import ResumeDetailsModal from "../components/jobs/ResumeDetailsModal";

import {
  deleteJob,
  duplicateJob,
} from "../services/jobService";

import { useJobs } from "../context/JobsContext";
import { useResumes } from "../context/ResumeContext";

const Jobs = () => {

  const {
    selectedJob,
    fetchJobs,
  } = useJobs();

  const {
    resumes,
    fetchResumes,
  } = useResumes();

  const [showModal, setShowModal] =
    useState(false);

  const [modalMode, setModalMode] =
    useState("create");

  const [editingJob, setEditingJob] =
    useState(null);

  const [pipelineStep, setPipelineStep] =
    useState("upload");

  const [selectedResume, setSelectedResume] =
  useState(null);

  /* ======================================
      Fetch Candidates
  ====================================== */

  useEffect(() => {

    if (!selectedJob) return;

    fetchResumes(selectedJob._id);

  }, [
    selectedJob,
    fetchResumes,
  ]);

  /* ======================================
      Pipeline Animation
  ====================================== */

  useEffect(() => {

    if (!resumes.length) {

      setPipelineStep("upload");

      return;

    }

    setPipelineStep("ranking");

  }, [resumes]);

  const handleCreateJob = () => {

    setEditingJob(null);
    setModalMode("create");
    setShowModal(true);

  };

  const handleEditJob = () => {

    if (
      !selectedJob ||
      !selectedJob._id
    ) return;

    setModalMode("edit");

    setEditingJob(selectedJob);

    setShowModal(true);

  };

  const handleDeleteJob = async () => {

    if (!selectedJob) return;

    const confirmed = window.confirm(

      `Are you sure you want to delete "${selectedJob.title}"?`

    );

    if (!confirmed) return;

    try {

      await deleteJob(
        selectedJob._id
      );

      await fetchJobs(true);
      setEditingJob(null);
      setModalMode("create");

    }

    catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete job."
      );

    }

  };

  const handleDuplicateJob = async () => {

    if (!selectedJob) return;

    try {

      await duplicateJob(
        selectedJob
      );

      await fetchJobs(true);

    }

    catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to duplicate job."
      );

    }

  };

  return (

    <div className="min-h-screen bg-slate-100">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= CONTENT ================= */}

      <div className="px-5 py-5 xl:px-6 xl:py-6">

        <div className="flex gap-5">

          {/* ================= SIDEBAR ================= */}

          <div className="w-[310px] shrink-0">

            <JobsSidebar
              page="jobs"
              setShowModal={() => {
                handleCreateJob();
              }}
            />

          </div>

          {/* ================= MAIN ================= */}

          <div className="flex-1 space-y-5">

            {/* ================= HEADER ================= */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              {!selectedJob ? (

                <div className="py-10 text-center text-slate-500">

                  Select a Job

                </div>

              ) : (

                <div className="flex items-start justify-between">

                  <div>

                    <div className="flex items-center gap-3">

                      <h1 className="text-3xl font-bold text-slate-900">

                        {selectedJob.title}

                      </h1>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          selectedJob.status === "open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >

                        {selectedJob.status}

                      </span>

                    </div>

                    <p className="mt-3 text-slate-500">

                      {selectedJob.company}

                      <span className="mx-2">

                        •

                      </span>

                      {selectedJob.experience_years} Years Experience

                    </p>

                  </div>

                  <div className="flex gap-3">

                    <button
                      onClick={handleEditJob}
                      disabled={!selectedJob?._id}
                      className="rounded-xl border border-slate-200 px-5 py-2 font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={handleDeleteJob}
                      disabled={!selectedJob?._id}
                      className="rounded-xl border border-red-200 px-5 py-2 font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                     >
                      Delete
                    </button>

                    <button
                      onClick={handleDuplicateJob}
                      disabled={!selectedJob?._id}
                      className="rounded-xl bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
                    >
                      Duplicate
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* ================= Upload + Stats ================= */}

            <div className="grid grid-cols-12 gap-5 items-start">

              <div className="col-span-12 xl:col-span-7">

                <UploadResumeCard
                  selectedJob={selectedJob}
                  currentStep={pipelineStep}
                />

              </div>

              <div className="col-span-12 xl:col-span-5 space-y-5">

                <JobStatsGrid
                  resumes={resumes}
                />

              </div>

            </div>

            {/* ================= Candidates ================= */}

            <CandidateTable
              resumes={resumes}
              selectedJob={selectedJob}
              onViewResume={setSelectedResume}
            />

          </div>

        </div>

      </div>

      {/* ================= JOB MODAL ================= */}

      {showModal && (
        <JobModal
          mode={modalMode}
          job={editingJob}
          setShowModal={setShowModal}
          fetchJobs={fetchJobs}
        />
      )}

      {selectedResume && (

        <ResumeDetailsModal
          resume={selectedResume}
          onClose={() =>
            setSelectedResume(null)
          }
        />

      )}

    </div>

  );

};

export default Jobs;