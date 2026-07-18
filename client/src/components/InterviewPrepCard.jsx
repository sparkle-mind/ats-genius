import { Brain, Sparkles } from "lucide-react";

const InterviewPrepCard = ({ resumeData }) => {
  const guides = resumeData?.atsAnalysis?.interviewPrep?.guide || [];
  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-orange-400" />
        <h3 className="text-lg font-bold text-white">
          Interview Preparation Guide
        </h3>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {guides.length > 0 ? (
          guides.map((guide, idx) => (
            <div className="flex items-center gap-2">
              <div
                key={idx}
                className="p-3 py-1 rounded-xl border border-orange-500/10 bg-[#ffffff18] text-zinc-300 text-sm leading-relaxed  flex gap-3"
              >
                <div>
                  <span className="text-white font-[300] block mb-0.5">
                    {guide.title || guide.question || guide}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-500 italic text-sm">
            No specific Guide.
          </p>
        )}
      </div>
    </div>
  );
};

export default InterviewPrepCard;
