import { Grid } from "@mui/material";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import CardWrp from "./CardWrp";

const ActivityInsights = ({ recentActivity, aiInsights }) => {
  return (
    <>
      <div>
        <Grid container spacing={3} className="">
          {/* Recent Activity */}
          <Grid size={{ xs: 12, lg: 7 }}>
            <CardWrp className="mt-0 h-full">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-white">
                  Recent Activity
                </h2>
                <Link
                  href="/job-tracker"
                  className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-80"
                  style={{ color: "var(--color-orange)" }}
                >
                  View all <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="flex flex-col gap-3">
                {recentActivity.map((item, idx) => {
                  const StatusIcon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/5"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${item.statusBg} flex items-center justify-center shrink-0`}
                      >
                        <StatusIcon className={`w-4 h-4 ${item.statusColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">
                          {item.role}
                        </p>
                        <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                          {item.company}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.statusBg} ${item.statusColor} capitalize`}
                        >
                          {item.status}
                        </span>
                        <p className="text-zinc-600 text-xs mt-1">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardWrp>
          </Grid>

          {/* AI Insights */}
          <Grid size={{ xs: 12, lg: 5 }}>
            <CardWrp className="mt-0 h-full">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(255,87,34,0.12)" }}
                >
                  <Zap
                    className="w-4 h-4"
                    style={{ color: "var(--color-orange)" }}
                  />
                </div>
                <h2 className="text-lg font-bold text-white">AI Insights</h2>
              </div>

              <div className="flex flex-col gap-3">
                {aiInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] transition-all hover:border-orange-500/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-white text-sm font-semibold leading-snug">
                        {insight.title}
                      </p>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${insight.priorityBg} ${insight.priorityColor}`}
                      >
                        {insight.priority}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] text-xs mt-1.5 leading-relaxed">
                      {insight.detail}
                    </p>
                  </div>
                ))}
              </div>
            </CardWrp>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ActivityInsights;
