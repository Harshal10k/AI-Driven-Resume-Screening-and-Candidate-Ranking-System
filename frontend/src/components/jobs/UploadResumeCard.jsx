import { useEffect, useRef, useState } from "react";

import {
  UploadCloud,
  Loader2,
  Sparkles,
  Upload,
  FileText,
  BrainCircuit,
  Target,
  Trophy,
  CheckCircle2,
} from "lucide-react";

import { useResumes } from "../../context/ResumeContext";
import { useJobs } from "../../context/JobsContext";

const UploadResumeCard = ({
  selectedJob,
}) => {

  const inputRef = useRef(null);

  const { uploadFiles } = useResumes();

  const { fetchJobs } = useJobs();

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [currentFile, setCurrentFile] =
    useState("");

  const [currentStep, setCurrentStep] =
    useState("upload");

  const [completed, setCompleted] =
    useState(false);

  const pipeline = [

    {
      key: "upload",
      label: "Upload",
      icon: Upload,
    },

    {
      key: "parsing",
      label: "Parsing",
      icon: FileText,
    },

    {
      key: "skills",
      label: "Skills",
      icon: BrainCircuit,
    },

    {
      key: "score",
      label: "AI Score",
      icon: Target,
    },

    {
      key: "ranking",
      label: "Ranking",
      icon: Trophy,
    },

  ];

  const statusMessages = {

    upload:
      "Uploading resume...",

    parsing:
      "Parsing document...",

    skills:
      "Extracting skills...",

    score:
      "Calculating AI match score...",

    ranking:
      "Ranking candidate...",

  };

  const order = [
    "upload",
    "parsing",
    "skills",
    "score",
    "ranking",
  ];

  const currentIndex =
    order.indexOf(currentStep);

  /* =====================================
      Animate Pipeline While Backend Works
  ===================================== */

  useEffect(() => {

    if (!uploading) return;

    const steps = [
      "upload",
      "parsing",
      "skills",
      "score",
      "ranking",
    ];

    let step = 0;

    let value = 5;

    const interval = setInterval(() => {

      if (value < 92) {

        value += 2;

        setProgress(value);

      }

      if (
        step < steps.length - 1 &&
        value % 20 === 0
      ) {

        step++;

        setCurrentStep(
          steps[step]
        );

      }

    }, 250);

    return () =>
      clearInterval(interval);

  }, [uploading]);

  /* =====================================
      Upload Files
  ===================================== */

  const handleFiles = async (
    files
  ) => {

    if (
      !files.length ||
      !selectedJob
    )
      return;

    try {

      setCompleted(false);

      setUploading(true);

      setCurrentFile(
        files[0].name
      );

      setCurrentStep("upload");

      setProgress(5);

      await uploadFiles(
        selectedJob._id,
        files
      );

      await fetchJobs();

      setCurrentStep(
        "ranking"
      );

      setProgress(100);

      setCompleted(true);

    } finally {

      setUploading(false);

    }

  };

      return (

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* ================= HEADER ================= */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-2xl bg-indigo-100 p-3">

          <Sparkles
            size={22}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">

            Upload Resumes

          </h2>

          <p className="text-sm text-slate-500">

            AI automatically parses, analyzes and ranks every uploaded resume.

          </p>

        </div>

      </div>

      {/* ================= DROP ZONE ================= */}

      <div
        onClick={() =>
          !uploading &&
          inputRef.current.click()
        }
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDrop={(e) => {

          e.preventDefault();

          if (uploading) return;

          handleFiles(
            Array.from(
              e.dataTransfer.files
            )
          );

        }}
        className={`rounded-3xl border-2 border-dashed px-8 py-10 text-center transition-all

        ${
          uploading

            ? "cursor-not-allowed border-indigo-300 bg-indigo-50 opacity-80"

            : "cursor-pointer border-indigo-200 bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50 hover:border-indigo-500 hover:shadow-md"

        }`}
      >

        <UploadCloud
          size={54}
          className={`mx-auto transition-all

          ${
            uploading

              ? "animate-bounce text-indigo-500"

              : "text-indigo-600"

          }`}
        />

        <h3 className="mt-5 text-xl font-semibold text-slate-900">

          {uploading

            ? "AI is Processing Resume..."

            : "Drag & Drop Resume Files"}

        </h3>

        <p className="mt-2 text-slate-500">

          Supports PDF, DOC & DOCX

        </p>

        <button
          disabled={uploading}
          className="mt-6 rounded-2xl bg-indigo-600 px-8 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
        >

          {uploading

            ? "Uploading..."

            : "Choose Files"}

        </button>

        <input
          ref={inputRef}
          hidden
          multiple
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            handleFiles(
              Array.from(
                e.target.files
              )
            )
          }
        />

      </div>

      {/* ================= AI PIPELINE ================= */}

      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">

        <div className="mb-5">

          <h3 className="text-lg font-semibold text-slate-900">

            AI Screening Pipeline

          </h3>

          <p className="text-sm text-slate-500">

            Live processing of uploaded resumes.

          </p>

        </div>

        <div className="flex items-center justify-between">

          {pipeline.map((step, index) => {

            const Icon = step.icon;

            const completedStep =
              index < currentIndex ||
              completed;

            const active =
              index === currentIndex &&
              uploading;

            return (

              <div
                key={step.key}
                className="flex flex-1 items-center"
              >

                <div className="flex flex-col items-center">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-500

                    ${

                      completedStep

                        ? "bg-green-500 text-white shadow-lg"

                        : active

                        ? "bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse"

                        : "bg-slate-200 text-slate-400"

                    }`}
                  >

                    {

                      completedStep

                        ? <CheckCircle2 size={20} />

                        : <Icon size={20} />

                    }

                  </div>

                  <span
                    className={`mt-2 text-xs font-medium

                    ${

                      completedStep || active

                        ? "text-slate-800"

                        : "text-slate-400"

                    }`}
                  >

                    {step.label}

                  </span>

                </div>

                {

                  index !==
                  pipeline.length - 1 && (

                    <div
                      className={`mx-2 h-1 flex-1 rounded-full transition-all duration-500

                      ${

                        completedStep

                          ? "bg-green-400"

                          : "bg-slate-300"

                      }`}
                    />

                  )

                }

              </div>

            );

          })}

        </div>

        {/* ================= CURRENT PROCESSING ================= */}

                {/* ================= CURRENT PROCESSING ================= */}

        <div className="mt-6 rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-50 via-violet-50 to-blue-50 p-5">

          <div className="flex items-start justify-between">

            <div>

              <h3 className="text-lg font-semibold text-slate-900">

                AI Processing

              </h3>

              <p className="mt-1 text-sm text-slate-500">

                {currentFile || "Waiting for resume upload..."}

              </p>

            </div>

            <div
              className={`rounded-xl px-4 py-2 font-bold transition-all

              ${
                completed

                  ? "bg-green-100 text-green-700"

                  : uploading

                  ? "bg-indigo-100 text-indigo-700"

                  : "bg-slate-100 text-slate-500"

              }`}
            >

              {completed

                ? "Completed"

                : uploading

                ? `${progress}%`

                : "Idle"}

            </div>

          </div>

          {/* Progress */}

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-violet-600 to-blue-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

          {/* Live Status */}

          <div className="mt-5 flex items-center gap-3">

            {

              uploading ? (

                <Loader2
                  size={18}
                  className="animate-spin text-indigo-600"
                />

              ) : completed ? (

                <CheckCircle2
                  size={18}
                  className="text-green-600"
                />

              ) : (

                <div className="h-2 w-2 rounded-full bg-slate-400" />

              )

            }

            <div>

              <p className="font-semibold text-slate-800">

                {

                  uploading

                    ? statusMessages[currentStep]

                    : completed

                    ? "AI Screening Completed Successfully"

                    : "Ready to upload resumes"

                }

              </p>

              <p className="text-sm text-slate-500">

                {

                  uploading

                    ? "Please wait while our AI analyzes the resume."

                    : completed

                    ? "Candidate ranking has been updated."

                    : "Drop one or more resumes to begin."

                }

              </p>

            </div>

          </div>

          {/* Live Activity */}

          {uploading && (

            <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">

              <div className="mb-3 flex items-center justify-between">

                <span className="font-semibold text-slate-700">

                  Live Activity

                </span>

                <span className="text-xs text-slate-400">

                  Running...

                </span>

              </div>

              <div className="space-y-3">

                {pipeline.map((step, index) => {

                  const completedStep =
                    index < currentIndex;

                  const active =
                    index === currentIndex;

                  return (

                    <div
                      key={step.key}
                      className="flex items-center justify-between"
                    >

                      <span className="text-sm">

                        {step.label}

                      </span>

                      {

                        completedStep ? (

                          <CheckCircle2
                            size={16}
                            className="text-green-600"
                          />

                        ) : active ? (

                          <Loader2
                            size={16}
                            className="animate-spin text-indigo-600"
                          />

                        ) : (

                          <div className="h-3 w-3 rounded-full bg-slate-300" />

                        )

                      }

                    </div>

                  );

                })}

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default UploadResumeCard;