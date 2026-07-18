import { TrendingUp } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const ScoreBreakdown = ({ scoreSections }) => {
  return (
    <Grid size={{ xs: 12, md: 8 }}>
      <CardWrp className="!mt-0 h-full">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp
            className="w-7 h-7"
            style={{ color: "var(--color-orange)" }}
          />
          <h2 className="text-[20px] md:text-[22px] font-bold text-white">Score Breakdown</h2>
        </div>
        <div className="flex flex-col gap-4">
          {scoreSections.map((s) => {
            const barColor =
              s.status === "good"
                ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                : s.status === "warning"
                  ? "bg-gradient-to-r from-amber-600 to-amber-400"
                  : "bg-gradient-to-r from-red-600 to-red-400";
            const textColor =
              s.status === "good"
                ? "text-emerald-400"
                : s.status === "warning"
                  ? "text-amber-400"
                  : "text-red-400";
            return (
              <div key={s.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-300 text-sm">{s.label}</span>
                  <span className={`text-sm font-bold ${textColor}`}>
                    {s.score}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${barColor}`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default ScoreBreakdown;
