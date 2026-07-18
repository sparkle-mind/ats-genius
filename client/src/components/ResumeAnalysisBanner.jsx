import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

const ResumeAnalysisBanner = ({ resumeData }) => {
  return (
    <div className="w-full mx-auto h-full overflow-hidden">
      <div
        className="rounded-2xl border h-full  border-zinc-800 p-8 py-12  overflow-hidden shadow-2xl"
        style={{
          backgroundImage: "url(/images/resume-analiser-person.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0,0,0,0.6)",
          backgroundBlendMode: "overlay",
        }}
      >
        <div className="flex flex-col  gap-4">
          {/* Resume Title */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-3 border border-blue-500/20">
              <FileText className="h-6 w-6 text-blue-400" />
            </div>

            <h1 className="text-[18px] md:text-2xl font-bold text-white tracking-tight capitalize">
              {resumeData?.name}'s Resume Analysis
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-zinc-400 ">
            AI-powered insights, resume scoring, strengths, weaknesses, and
            recommendations for improvement.
          </p>

          {/* Resume Link */}
          <Link
            href={resumeData?.file || "#"}
            target="_blank"
            className="w-fit group inline-flex items-center gap-2 rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-blue-400 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/20 hover:text-blue-300 hover:shadow-lg hover:shadow-blue-500/20"
          >
            <FileText className="h-5 w-5" />
            <span className="font-medium">View Resume PDF</span>
            <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisBanner;
