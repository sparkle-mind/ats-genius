import { Building2, Building2Icon } from "lucide-react";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";

const TopCompany = ({ resumeData }) => {
  const companies = resumeData?.atsAnalysis?.topCompanies || [];

  return (
    <Grid size={{ xs: 12, lg: 6 }}>
      <CardWrp className="mt-0 bg-[#0b0f17] border border-white/5 rounded-2xl shadow-xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-5">
            <Building2Icon
              className="w-7 h-7"
              style={{ color: "var(--color-orange)" }}
            />
            <h2 className="text-[20px] md:text-[22px] font-bold text-white">
              Top Companies for You
            </h2>
          </div>
          <p className="text-zinc-400 text-xs mt-1">
            Based on skill-market alignment and hiring trends
          </p>
        </div>

        {/* Company List */}
        <div className="flex flex-col gap-3">
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <div
                key={index}
                className="group flex items-center justify-between p-4 rounded-xl
                           bg-white/5 hover:bg-white/10 transition-all duration-300
                           border border-white/5 hover:border-white/10"
              >
                {/* Company Name */}
                <span className="text-zinc-200 text-sm font-medium group-hover:text-white transition-colors">
                  {company?.company || company?.name || "not found"}
                </span>

                {/* Badge */}
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold 
                                 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  {company?.score != null ? `Score: ${company.score}` : company?.industry || "N/A"}
                </span>
              </div>
            ))
          ) : (
            <div className="text-zinc-500 text-sm p-4 border border-dashed border-white/10 rounded-xl">
              No company recommendations available
            </div>
          )}
        </div>
      </CardWrp>
    </Grid>
  );
};

export default TopCompany;
