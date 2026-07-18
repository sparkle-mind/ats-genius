import { AlertTriangle } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const WeaknessList = ({ resumeData = [] }) => {
  const weaknesses = resumeData?.atsAnalysis?.weaknesses || [];

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <CardWrp className="!mt-0 h-full">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle
            className="w-7 h-7"
            style={{ color: "#f59e0b" }}
          />
          <h2 className="text-[20px] md:text-[22px] font-bold text-white">
            Areas for Improvement / Weaknesses
          </h2>
        </div>

        <div className="grid gap-3">
          {weaknesses.length === 0 ? (
            <p className="text-zinc-400 text-sm">
              No improvement areas identified.
            </p>
          ) : (
            weaknesses.map((weakness, index) => (
              <div
                key={index}
                className="
                  group
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-white/10
                  bg-zinc-900/60
                  p-4
                  transition-all
                  duration-300
                  hover:border-amber-500/40
                  hover:bg-zinc-800/70
                "
              >
                <div className="mt-0.5 shrink-0">
                  <AlertTriangle
                    className="h-5 w-5 text-amber-400"
                    strokeWidth={2.5}
                  />
                </div>

                <p className="text-[16px] leading-relaxed text-zinc-300 group-hover:text-zinc-100">
                  {weakness}
                </p>
              </div>
            ))
          )}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default WeaknessList;