"use client";

import { useMemo } from "react";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import CardWrp from "./CardWrp";
import TopCompanies from "./TopCompanies";
import { getJobsAPI } from "@/services/jobService";

const MonthlyApplications = () => {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsAPI,
  });

  // Create monthly statistics
  const monthlyData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = months.map((month) => ({
      month,
      apps: 0,
      interviews: 0,
    }));

    jobs.forEach((job) => {
      if (!job.createdAt) return;

      const monthIndex = new Date(job.createdAt).getMonth();

      // Count applications
      data[monthIndex].apps++;

      // Count interviews
      if (job.status?.toLowerCase() === "interview") {
        data[monthIndex].interviews++;
      }
    });

    return data;
  }, [jobs]);

  // Find maximum value for scaling bars
  const maxValue = useMemo(() => {
    return Math.max(
      ...monthlyData.flatMap((item) => [item.apps, item.interviews]),
      1,
    );
  }, [monthlyData]);

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <Grid container spacing={3} className="mt-0">
      <Grid size={{ xs: 12, lg: 7 }}>
        <CardWrp className="mt-0 flex flex-col h-full ">
          <h2 className="text-lg font-bold text-white mb-6">
            Monthly Applications vs Interviews
          </h2>
          <div className="flex-1 flex flex-col p-4">
            <div className="flex items-end gap-2 h-full ">
              {monthlyData.map((item) => (
                <div
                  key={item.month}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full flex items-end gap-1 h-44">
                    {/* Applications */}
                    <div
                      className="flex-1 rounded-t-md transition-all duration-700"
                      style={{
                        height: `${(item.apps / maxValue) * 100}%`,
                        background: "linear-gradient(to top, #E64A19, #FF7043)",
                      }}
                      title={`Applications: ${item.apps}`}
                    />

                    {/* Interviews */}
                    <div
                      className="flex-1 rounded-t-md transition-all duration-700"
                      style={{
                        height: `${(item.interviews / maxValue) * 100}%`,
                        background: "linear-gradient(to top, #FF8A65, #FFCCBC)",
                      }}
                      title={`Interviews: ${item.interviews}`}
                    />
                  </div>

                  <span className="text-zinc-400 text-xs">{item.month}</span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{
                    background: "linear-gradient(to top, #E64A19, #FF7043)",
                  }}
                />
                <span className="text-white leading-1 text-[18px]">
                  Applications
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{
                    background: "linear-gradient(to top, #FF8A65, #FFCCBC)",
                  }}
                />
                <span className="text-white leading-1 text-[18px]">
                  Interviews
                </span>
              </div>
            </div>
          </div>
        </CardWrp>
      </Grid>

      <TopCompanies />
    </Grid>
  );
};

export default MonthlyApplications;
