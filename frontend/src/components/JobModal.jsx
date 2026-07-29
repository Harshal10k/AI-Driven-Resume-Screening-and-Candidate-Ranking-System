import { useState, useEffect } from "react";

import {
  Briefcase,
  Building2,
  FileText,
  Code2,
  Award,
  X,
  Sparkles,
} from "lucide-react";

import {
  createJob,
  updateJob,
} from "../services/jobService";

const JobModal = ({
  mode = "create",
  job = null,
  setShowModal,
  fetchJobs,
}) => {

  const [formData, setFormData] =
    useState({

      title: "",

      company: "",

      description: "",

      required_skills: "",

      experience_years: "",

      status: "open",

    });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (
      mode !== "edit" ||
      !job
    )
      return;

    setFormData({

      title:
        job.title || "",

      company:
        job.company || "",

      description:
        job.description || "",

      required_skills:
        job.required_skills?.join(", ") ||
        "",

      experience_years:
        job.experience_years || "",

      status:
        job.status || "open",

    });

  }, [
    mode,
    job,
  ]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

const handleSubmit = async () => {

  if (
    !formData.title.trim() ||
    !formData.company.trim() ||
    !formData.description.trim() ||
    !formData.required_skills.trim()
  ) {

    alert(
      "Please fill all required fields."
    );

    return;

  }

  try {

    setLoading(true);

    const jobData = {

      title: formData.title.trim(),

      company: formData.company.trim(),

      description:
        formData.description.trim(),

      required_skills:
        formData.required_skills
          .split(",")
          .map((skill) =>
            skill.trim()
          )
          .filter(Boolean),

      experience_years:
        Number(
          formData.experience_years
        ) || 0,

      status:
        formData.status,

    };
    if (
      mode === "edit" &&
      job
    ) {

      await updateJob(
        job._id,
        jobData
      );

    }
    else {

      await createJob(
        jobData
      );

    }
    await fetchJobs(
      mode === "create"
    );

    setShowModal(false);

  }

  catch (error) {

    console.error(error);

    alert(

      error.response?.data
        ?.message ||

      `Failed to ${
        mode === "edit"
          ? "update"
          : "create"
      } job.`

    );

  }

  finally {

    setLoading(false);

  }

};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-5">

      <div className="w-full max-w-4xl overflow-hidden rounded-[30px] bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-blue-700 px-8 py-3 text-white">

          <div className="flex items-center justify-between">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur">

                <Sparkles size={18} />

                <span className="text-xs font-medium">

                  AI Recruitment

                </span>

              </div>

              <h2 className="mt-3 text-3xl font-bold">

                {mode === "edit"
                  ? "Edit Job"
                  : "Create New Job"}

              </h2>

              <p className="mt-2 text-indigo-100">

                {mode === "edit"

                  ? "Modify the job information and save your changes."

                  : "Create a new job posting for AI-powered candidate screening."}

              </p>

            </div>

            <button
              onClick={() =>
                setShowModal(false)
              }
              className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20"
            >
              <X size={24} />
            </button>

          </div>

        </div>

        {/* Body */}

        <div className="grid grid-cols-2 gap-6 p-6">

          {/* LEFT */}

          <div className="space-y-5">

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">

                <Briefcase
                  size={18}
                />

                Job Title

              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={
                  handleChange
                }
                placeholder="Senior Java Developer"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">

                <Building2
                  size={18}
                />

                Company

              </label>

              <input
                type="text"
                name="company"
                value={
                  formData.company
                }
                onChange={
                  handleChange
                }
                placeholder="ABC Technologies"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">

                <Award
                  size={18}
                />

                Experience Required

              </label>

              <input
                type="number"
                min="0"
                name="experience_years"
                value={
                  formData.experience_years
                }
                onChange={
                  handleChange
                }
                placeholder="2"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">

                Status

              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600"
              >

                <option value="open">

                  Open

                </option>

                <option value="closed">

                  Closed

                </option>

              </select>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-5">

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">

                <Code2
                  size={18}
                />

                Required Skills

              </label>

              <input
                type="text"
                name="required_skills"
                value={
                  formData.required_skills
                }
                onChange={
                  handleChange
                }
                placeholder="Java, Spring Boot, MySQL, React"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600"
              />

              <p className="mt-2 text-sm text-slate-500">

                Separate each skill with a comma.

              </p>

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">

                <FileText
                  size={18}
                />

                Job Description

              </label>

              <textarea
                rows="7"
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                placeholder="Describe the responsibilities, qualifications, technologies, and expectations for this position..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">

          <button
            onClick={() =>
              setShowModal(false)
            }
            className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium transition hover:bg-white"
          >
            Cancel
          </button>

          <button
            onClick={
              handleSubmit
            }
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {loading
              ? mode === "edit"
                ? "Saving..."
                : "Creating..."
              : mode === "edit"
              ? "Save Changes"
              : "Create Job"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default JobModal;