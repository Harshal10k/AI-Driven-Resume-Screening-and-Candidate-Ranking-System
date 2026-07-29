import {
  UploadCloud,
  FileText,
  BrainCircuit,
  Target,
  Trophy,
} from "lucide-react";

const steps = [
  {
    key: "upload",
    label: "Upload",
    icon: UploadCloud,
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

const order = [
  "upload",
  "parsing",
  "skills",
  "score",
  "ranking",
];

const ScreeningPipeline = ({
  currentStep,
}) => {

  const currentIndex =
    order.indexOf(currentStep);

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="mb-5">

        <h3 className="text-lg font-bold text-slate-900">

          AI Screening Pipeline

        </h3>

        <p className="text-sm text-slate-500">

          Resume processing workflow

        </p>

      </div>

      <div className="flex items-center justify-between">

        {steps.map((step, index) => {

          const Icon = step.icon;

          const completed =
            index < currentIndex;

          const active =
            index === currentIndex;

          return (

            <div
              key={step.key}
              className="flex flex-1 items-center"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-all
                  ${
                    completed
                      ? "bg-green-500 text-white"

                      : active
                      ? "bg-indigo-600 text-white animate-pulse"

                      : "bg-slate-100 text-slate-400"
                  }`}
                >

                  <Icon size={22} />

                </div>

                <span
                  className={`mt-2 text-xs font-medium
                  ${
                    completed || active
                      ? "text-slate-800"

                      : "text-slate-400"
                  }`}
                >

                  {step.label}

                </span>

              </div>

              {index !==
                steps.length - 1 && (

                <div
                  className={`mx-2 h-1 flex-1 rounded-full
                  ${
                    completed
                      ? "bg-green-400"

                      : "bg-slate-200"
                  }`}
                />

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

};

export default ScreeningPipeline;