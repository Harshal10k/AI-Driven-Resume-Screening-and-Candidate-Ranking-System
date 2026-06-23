import { useJobs } from "../context/JobsContext";
import { useNavigate } from "react-router-dom";
import { candidates } from "../data/candidates";

const Sidebar = () => {
  const {
    jobs,
    selectedJob,
    setSelectedJob,
  } = useJobs();
  const navigate = useNavigate();

  return (
    <aside className="w-80 bg-white border-r border-slate-200 p-5 overflow-y-auto">

      <div>

        <h3 className="text-xs uppercase text-slate-500 mb-4">
          Active Job Posts
        </h3>

        <button
          onClick={() => setSelectedJob("All Jobs")}
          className={`w-full mb-3 py-2 rounded-lg transition ${
            selectedJob === "All Jobs"
              ? "bg-indigo-600 text-white"
              : "border border-slate-300"
          }`}
        >
          All Jobs
        </button>

        <div className="space-y-3">

          {jobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job.title)}
                className={`border rounded-2xl p-4 cursor-pointer transition ${
                  selectedJob === job.title
                    ? "border-indigo-600 bg-indigo-50"
                    : "bg-white hover:border-indigo-500"
                }`}
              >

              <h3 className="font-semibold text-lg">
                {job.title}
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                {
                  candidates.filter(
                    (candidate) => candidate.jobTitle === job.title
                  ).length
                } applicants
              </p>

              <p className="text-green-600 text-sm">
                {
                  candidates.filter(
                    (candidate) =>
                      candidate.jobTitle === job.title &&
                      candidate.status === "Shortlisted"
                  ).length
                } shortlisted
              </p>

            </div>
          ))}

        </div>

      </div>

      <button
        onClick={() => navigate("/jobs")}
        className="w-full mt-5 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        + New Job
      </button>

      <div className="mt-8">

        <h3 className="text-xs uppercase text-slate-500 mb-4">
          📤 Upload Resumes
        </h3>

        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center">

          <h4 className="font-medium text-indigo-600">
            Drop PDF Here
          </h4>

          <p className="text-sm text-slate-500 mt-2">
            Supports PDF / DOCX
          </p>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;