"use client";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { useLatestResume } from "@/hooks/useLatestResume";

const TopCompanies = () => {
  const { data: latestResumeData, isLoading: isLatestResumeLoading } =
    useLatestResume();

  const topCompaniesData = latestResumeData?.atsAnalysis?.topCompanies || [];

  if (isLatestResumeLoading) return <div>Loading top companies ...</div>;

  return (
    <Grid size={{ xs: 12, lg: 5 }}>
      <CardWrp className="mt-0">
        <h2 className="text-lg font-bold text-white mb-5">Top Companies</h2>
        <div className="flex flex-col gap-3">
          {topCompaniesData.map((co) => (
            <div
              key={co.name}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {co?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{co.name}</p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full text-[#2cc90c]`}
              >
                {co?.industry}
              </span>
            </div>
          ))}
          {topCompaniesData.length <= 0 && (
            <div className="text-center py-8">
              <p className="text-zinc-400">No comapanies found</p>
            </div>
          )}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default TopCompanies;
