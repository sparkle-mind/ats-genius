"use client";
import { useLatestResume } from "@/hooks/useLatestResume";
import Grid from "@mui/material/Grid";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Target,
  MessageSquare,
  Activity,
} from "lucide-react";
import LoadingWrpNew from "./common/LoadingWrpNew";
import { useQuery } from "@tanstack/react-query";
import { getJobsAPI } from "@/services/jobService";

export default function StatsCards() {
  const {
    data: latestResumeData,
    isLoading: isLatestResumeLoading,
    error: latestResumeError,
  } = useLatestResume();
  const { data: jobs = [] } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsAPI,
  });

  const totalApplications = jobs.length;
  const interviewRate = totalApplications
    ? (jobs.filter((job) => job.status === "interview").length /
        totalApplications) *
      100
    : 0;
  const resumeHealth = latestResumeData?.atsAnalysis?.scoringStatus;
  const stats = [
    {
      title: "Job Applications",
      value: totalApplications || "-",
      sub: "+12% this week",
      trend: "up",
      icon: FileText,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "ATS Score",
      value: latestResumeData?.atsScore ?? "-",
      sub: "Out of 100",
      trend: "up",
      icon: Target,
      color: "text-orange-300",
      bgColor: "bg-orange-400/10",
    },
    {
      title: "Interview Rate",
      value: `${interviewRate.toFixed(1)}%`,
      sub: `Out of ${totalApplications} applications`,
      trend: "up",
      icon: MessageSquare,
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Resume Health",
      value: `${resumeHealth || "-"} `,
      sub: `${latestResumeData?.atsAnalysis?.suggestions?.length || "0"} suggestions`,
      trend: "neutral",
      icon: Activity,
      color: "text-orange-200",
      bgColor: "bg-orange-300/10",
    },
  ];
  if (isLatestResumeLoading) return <LoadingWrpNew />;
  return (
    <Grid container spacing={3}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
        const trendColor =
          stat.trend === "up"
            ? "text-emerald-400"
            : stat.trend === "down"
              ? "text-red-400"
              : "text-zinc-400";

        return (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <div className="glass-card rounded-2xl p-5 h-full flex flex-col gap-4 hover:border-orange-500/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-sm font-medium">
                  {stat.title}
                </p>
                <div
                  className={`w-9 h-9 rounded-xl ${stat.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-white tracking-tight">
                {stat.value}
              </h3>
              <div
                className={`flex items-center gap-1.5 text-xs font-semibold ${trendColor}`}
              >
                {stat.trend !== "neutral" && (
                  <TrendIcon className="w-3.5 h-3.5" />
                )}
                <span>{stat.sub}</span>
              </div>
            </div>
          </Grid>
        );
      })}
    </Grid>
  );
}
