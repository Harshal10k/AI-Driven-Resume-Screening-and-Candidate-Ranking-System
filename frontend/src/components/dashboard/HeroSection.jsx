import {
  Download,
  RefreshCw,
  BrainCircuit,
  Activity,
  Sparkles,
} from "lucide-react";

const HeroSection = ({
  onExport,
  onRescreen,
  loading,
}) => {
  return (
    <section
      className="
      relative
      overflow-hidden
      rounded-[28px]
      bg-gradient-to-r
      from-indigo-700
      via-violet-600
      to-blue-600
      shadow-xl
      px-8
      py-4
      "
    >
      {/* Glow */}

      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

      <div className="relative grid grid-cols-12 items-center gap-6">

        {/* ================= LEFT ================= */}

        <div className="col-span-9">

          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">

              <Sparkles
                size={18}
                className="text-white"
              />

            </div>

            <h1 className="text-[28px] font-semibold tracking-tight text-white">

              AI Resume Screening

            </h1>

          </div>

          <p className="mt-3 max-w-xl text-base leading-7 text-indigo-100">

            Analyze, rank and shortlist the best candidates using AI-powered
            resume intelligence.

          </p>

          <div className="mt-6 flex gap-4">

            <button
              onClick={onExport}
              className="
              flex
              h-11
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-6
              font-semibold
              text-indigo-700
              transition
              hover:scale-[1.02]
              "
            >
              <Download size={18} />

              Export Shortlist

            </button>

            <button
              onClick={onRescreen}
              disabled={loading}
              className="
              flex
              h-12
              items-center
              gap-3
              rounded-2xl
              border
              border-white/30
              px-7
              font-semibold
              text-white
              transition
              hover:bg-white/10
              disabled:cursor-not-allowed
              disabled:opacity-60
              "
            >
              <RefreshCw
                size={18}
                className={loading ? "animate-spin" : ""}
              />

              {loading
                ? "Re-screening..."
                : "Re-run AI Screen"}

            </button>

          </div>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="col-span-3 flex justify-end gap-3">

          {/* AI Accuracy */}

          <div
            className="
            w-[118px]
            rounded-3xl
            bg-white/10
            backdrop-blur-md
            px-5
            py-4
            flex
            flex-col
            "
          >

            <div className="flex justify-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">

                <BrainCircuit
                  size={34}
                  className="text-white"
                />

              </div>

            </div>

            <div className="mt-4">

              <h3 className="text-lg font-semibold text-white">

                AI Accuracy

              </h3>

            </div>

          </div>

          {/* Screening Engine */}

          <div
            className="
            w-[140px]
            rounded-3xl
            bg-white/10
            backdrop-blur-md
            px-5
            py-4
            flex
            flex-col
            "
          >

            {/* Top */}

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />

                <span className="text-base font-semibold text-white">

                  Live

                </span>

              </div>

              <Activity
                size={22}
                className="text-white"
              />

            </div>

            {/* Divider */}

            <div className="my-4 h-px bg-white/20" />

            {/* Bottom */}

            <div>

              <p className="text-base font-semibold text-white">

                Screening Engine

              </p>

              <p className="mt-1 text-sm text-indigo-100">

                Active

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;