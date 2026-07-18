"use client";
import { getJobsAPI } from "@/services/jobService";
import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart2,
  Target,
  Users,
  XCircle,
} from "lucide-react";

const AnalyticsStats = () => {
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsAPI,
  });
  const offerRate = (
    (jobs.filter((job) => job.status === "offer").length / jobs.length) *
    100
  ).toFixed(2);
  const responseRate = jobs.length
    ? (
        (jobs.filter(
          (job) =>
            job.status === "interview" ||
            job.status === "offer" ||
            job.status === "rejected",
        ).length /
          jobs.length) *
        100
      ).toFixed(2)
    : 0;
  const rejectedCount = jobs.filter((job) => job.status === "rejected").length;

  const rejectionRate = jobs.length
    ? ((rejectedCount / jobs.length) * 100).toFixed(2)
    : "0";
  const kpis = [
    {
      label: "Total Applications",
      value: jobs.length || "0",
      icon: BarChart2,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      label: "Response Rate",
      value: `${responseRate || "0"}%`,
      icon: Users,
      color: "text-orange-300",
      bg: "bg-orange-400/10",
    },
    {
      label: "Offer Rate",
      value: `${offerRate || "0"}%`,
      icon: Award,
      color: "text-orange-200",
      bg: "bg-orange-300/10",
    },
    {
      label: "Rejection Rate",
      value: `${rejectionRate || "0"}%`,
      icon: XCircle,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },
  ];
  return (
    <Grid container spacing={3}>
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <Grid key={kpi.label} size={{ xs: 12, sm: 6, xl: 3 }}>
            <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:border-orange-500/25">
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-sm font-medium">{kpi.label}</p>
                <div
                  className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-white">{kpi.value}</h3>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AnalyticsStats;
