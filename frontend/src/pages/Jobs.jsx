import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import JobModal from "../components/JobModal";
import { useJobs } from "../context/JobsContext";

const Jobs = () => {
  const { jobs, setJobs } = useJobs();

  const [showModal, setShowModal] = useState(false);

  const addJob = (jobData) => {
    const newJob = {
      id: jobs.length + 1,
      title: jobData.title,
      department: jobData.department,
      applicants: 0,
      shortlisted: 0,
      status: "Active",
      experience: jobData.experience,
      skills: jobData.skills,
    };

    setJobs([...jobs, newJob]);
  };

  const deleteJob = (id) => {
    setJobs(
      jobs.filter(
        (job) => job.id !== id
      )
    );
  };

  return (
    <MainLayout>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Job Management
        </h1>

        <p className="text-slate-500 mt-1">
          Create and manage job postings
        </p>
      </div>

      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-semibold">
          Active Jobs
        </h2>

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Create Job
        </button>

      </div>

      {/* Jobs List */}
      <div className="grid gap-4">

        {jobs.length === 0 ? (

          <div className="bg-white rounded-2xl p-10 border text-center">

            <h3 className="text-xl font-semibold text-slate-600">
              No Jobs Available
            </h3>

            <p className="text-slate-500 mt-2">
              Create your first job posting
            </p>

          </div>

        ) : (

          jobs.map((job) => (

            <div
              key={job.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
            >

              {/* Top Row */}
              <div className="flex justify-between">

                <div>

                  <h3 className="text-xl font-semibold">
                    {job.title}
                  </h3>

                  <p className="text-slate-500">
                    {job.department}
                  </p>

                  {(job.experience || job.skills) && (

                    <div className="mt-3 text-sm text-slate-600">

                      {job.experience && (
                        <p>
                          Experience: {job.experience}
                        </p>
                      )}

                      {job.skills && (
                        <p>
                          Skills: {job.skills}
                        </p>
                      )}

                    </div>

                  )}

                </div>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm h-fit">
                  {job.status}
                </span>

              </div>

              {/* Stats */}
              <div className="mt-4 flex gap-10">

                <div>

                  <p className="text-slate-500 text-sm">
                    Applicants
                  </p>

                  <h4 className="text-2xl font-bold">
                    {job.applicants || 0}
                  </h4>

                </div>

                <div>

                  <p className="text-slate-500 text-sm">
                    Shortlisted
                  </p>

                  <h4 className="text-2xl font-bold">
                    {job.shortlisted || 0}
                  </h4>

                </div>

              </div>

              {/* Actions */}
              <div className="mt-5">

                <button
                  onClick={() =>
                    deleteJob(job.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Modal */}
      {showModal && (

        <JobModal
          setShowModal={setShowModal}
          addJob={addJob}
        />

      )}

    </MainLayout>
  );
};

export default Jobs;