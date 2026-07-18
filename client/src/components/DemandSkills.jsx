"use client";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { TrendingUp } from "lucide-react";
import { useLatestResume } from "@/hooks/useLatestResume";
import LoadingWrpNew from "./common/LoadingWrpNew";

const DemandSkills = () => {
  const { data: latestResumeData, isLoading: isLatestResumeLoading } =
    useLatestResume();

  const skillDemand = latestResumeData?.atsAnalysis?.inDemandSkills || [];
  if (isLatestResumeLoading) return <LoadingWrpNew />;
  return (
    <CardWrp>
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp
          className="w-5 h-5"
          style={{ color: "var(--color-orange)" }}
        />
        <h2 className="text-lg font-bold text-white">
          In-Demand Skills for Your Profile
        </h2>
      </div>
      <Grid container spacing={3}>
        {skillDemand.map((item) => (
          <Grid key={item.skill} size={{ xs: 12, sm: 6, md: 4 }}>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 text-sm font-medium">
                  {item?.skill}
                </span>
                <span className="text-white text-sm font-bold">
                  {item?.demandPercentage || "-"}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-white/5">
                <div
                  className="progress-bar"
                  style={{ width: `${item?.demandPercentage}%` }}
                />
              </div>
            </div>
          </Grid>
        ))}
        {skillDemand.length <= 0 && (
          <div className="text-center py-8">
            <p className="text-zinc-400">No in-demand skills found</p>
          </div>
        )}
      </Grid>
    </CardWrp>
  );
};

export default DemandSkills;
