import { Award, CheckCircle2 } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const StrengthList = ({ resumeData = [] }) => {
  const strengths = resumeData?.atsAnalysis?.strengths || [];

  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <CardWrp className="!mt-0 h-full">
        <div className="flex items-center gap-2 mb-5">
          <Award className="w-7 h-7" style={{ color: "var(--color-orange)" }} />
          <h2 className="text-[20px] md:text-[22px] font-bold text-white">
            Key Strengths
          </h2>
        </div>

        <div className="max-h-[350px] overflow-y-auto grid gap-3">
          {strengths.length === 0 ? (
            <p>No strengths found</p>
          ) : (
            strengths.map((strength, index) => (
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
                hover:border-emerald-500/40
                hover:bg-zinc-800/70
              "
              >
                <div className="mt-0.5 shrink-0">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-400"
                    strokeWidth={2.5}
                  />
                </div>

                <p className="text-[16px] leading-relaxed text-zinc-300 group-hover:text-zinc-100">
                  {strength}
                </p>
              </div>
            ))
          )}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default StrengthList;
