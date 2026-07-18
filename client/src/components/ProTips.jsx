import { Sparkles } from "lucide-react";

const ProTips = ({ resumeData }) => {
  return (
    <div className="glass-card rounded-xl p-5 border-l-2 border-l-orange-500 bg-gradient-bg-card space-y-2">
      <h4 className="text-md font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-orange-400" />
        Pro-Tip
      </h4>
      <p className="text-zinc-400 text-md leading-relaxed">
        {resumeData?.atsAnalysis?.interviewPrep?.developerProTip ||
          "No Tips Available !"}
      </p>
    </div>
  );
};

export default ProTips;
