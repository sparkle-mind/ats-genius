import { CheckCircle, XCircle } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const SkillGap = ({ skillGap }) => {
  return (
    <Grid size={{ xs: 12, lg: 5 }}>
      <CardWrp className="mt-0">
        <h2 className="text-[20px] md:text-[22px] font-bold text-white mb-5">
          Skill Gap Analysis (static --- TODO)
        </h2>
        <p className="text-[var(--color-text-secondary)] text-xs mb-4">
          Based on top 50 matched job descriptions.
        </p>
        <div className="flex flex-col gap-2.5">
          {skillGap.map((item) => (
            <div
              key={item.skill}
              className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-zinc-300 text-sm">{item.skill}</span>
              {item.have ? (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                  <CheckCircle className="w-3 h-3" /> Present
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full">
                  <XCircle className="w-3 h-3" /> Missing
                </span>
              )}
            </div>
          ))}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default SkillGap;
