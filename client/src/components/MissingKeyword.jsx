import { SearchX, Hash } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const MissingKeyword = ({ resumeData }) => {
  const missingKeywords = resumeData?.atsAnalysis?.missingKeywords || [];

  return (
    <Grid size={{ xs: 12, md: 12 }}>
      <CardWrp className="!mt-0 h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
            <SearchX className="w-6 h-6 text-rose-400" />
          </div>

          <div>
            <h2 className="text-[20px] md:text-[22px] font-bold text-white">
              Missing Keywords
            </h2>
            <p className="text-zinc-400 text-sm">
              Important terms not detected in your resume
            </p>
          </div>
        </div>

        {missingKeywords.length === 0 ? (
          <div
            className="
              flex
              items-center
              justify-center
              rounded-2xl
              border
              border-emerald-500/20
              bg-emerald-500/5
              p-8
            "
          >
            <p className="text-emerald-400 font-medium">
              🎉 No missing keywords found
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-3">
              {missingKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-rose-500/40
                    bg-gradient-to-r
                    from-rose-500/10
                    to-pink-500/10
                    px-4
                    py-2.5
                    transition-all
                    duration-300
                    hover:border-rose-400/50
                    hover:scale-101
                    hover:shadow-[0_0_10px_rgba(244,63,94,0.4)]
                  "
                >
                  <Hash className="w-4 h-4 text-rose-400" />

                  <span className="text-zinc-200 text-sm font-medium">
                    {keyword}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
              <p className="text-amber-300 text-sm">
                💡 Adding these keywords naturally to your resume can improve
                ATS matching and increase visibility for recruiters.
              </p>
            </div>
          </>
        )}
      </CardWrp>
    </Grid>
  );
};

export default MissingKeyword;
