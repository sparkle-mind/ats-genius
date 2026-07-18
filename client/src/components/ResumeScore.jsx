"use client";

import { useLatestResume } from "@/hooks/useLatestResume";
import { Grid } from "@mui/material";
import { TrendingUp } from "lucide-react";

const ResumeScore = () => {
  const { data: latestResume } = useLatestResume();

  const totalKeywords = latestResume?.atsAnalysis?.inDemandSkills?.length || 0;

  const missingKeywords =
    latestResume?.atsAnalysis?.missingKeywords?.length || 0;

  const keywordMatchScore =
    totalKeywords > 0
      ? Math.round(((totalKeywords - missingKeywords) / totalKeywords) * 100)
      : 0;

  const profileCompleteness = 91; // TODO: calculate dynamically
  const strengths = latestResume?.atsAnalysis?.strengths?.length || 0;

  const weaknesses = latestResume?.atsAnalysis?.weaknesses?.length || 0;

  const resumeStrengthScore = Math.round(
    (strengths / (strengths + weaknesses)) * 100 || 0,
  );

  const scoreBreakdown = [
    {
      label: "Resume Quality",
      score: latestResume?.atsScore || 0,
    },
    {
      label: "Keyword Match",
      score: keywordMatchScore,
    },
    {
      label: "Profile Completeness",
      score: profileCompleteness,
    },
    {
      label: "Resume Strength",
      score: resumeStrengthScore,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(255,87,34,0.12)" }}
          >
            <TrendingUp
              className="w-4 h-4"
              style={{ color: "var(--color-orange)" }}
            />
          </div>

          <h2 className="text-lg font-bold text-white">
            Resume Score Breakdown
          </h2>
        </div>
      </div>

      {/* Score Cards */}
      <Grid container spacing={3}>
        {scoreBreakdown.map((item) => (
          <Grid key={item.label} size={{ xs: 12, sm: 6 }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">{item.label}</span>

                <span className="text-white text-sm font-bold">
                  {item.score}%
                </span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(item.score, 100)}%`,
                    background:
                      "linear-gradient(90deg, #ff5722 0%, #ff9800 100%)",
                  }}
                />
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ResumeScore;
