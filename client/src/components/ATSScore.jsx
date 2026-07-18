import { FileText } from "lucide-react";
import { Grid } from "@mui/material";

const ATSScore = ({ resumeData }) => {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center gap-4 h-full">
        {/* <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(255,87,34,0.12)" }}
        >
          <FileText
            className="w-6 h-6"
            style={{ color: "var(--color-orange)" }}
          />
        </div> */}
        <div>
          <p
            className="
    inline-flex
    items-center
    px-4
    py-1.5
    rounded-full
    text-[16px]
    md:text-[18px]
    font-bold
    text-emerald-300
    bg-emerald-500/10
    border
    border-emerald-500/20
    backdrop-blur-sm
  "
          >
            ✨ Overall ATS Score
          </p>
          <div className="mt-3 relative w-36 h-36 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#1e1e30"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#scoreGrad)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - resumeData?.atsScore / 100)}`}
                className="transition-all duration-700"
              />
              <defs>
                <linearGradient
                  id="scoreGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFCCBC" />
                  <stop offset="100%" stopColor="#FF5722" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">
                {resumeData?.atsScore}
              </span>
              <span className="text-xs text-[var(--color-text-secondary)] tracking-widest">
                / 100
              </span>
            </div>
          </div>
        </div>
        <div className="w-full pt-2 border-t border-white/5">
          <p className="text-zinc-400 text-sm">
            Your resume status is{" "}
            <span
              className="ml-2 font-bold text-[20px] capitalize"
              style={{ color: "var(--color-orange-light)" }}
            >
              {resumeData?.atsAnalysis?.scoringStatus}
            </span>{" "}
          </p>
        </div>
      </div>
    </Grid>
  );
};

export default ATSScore;
