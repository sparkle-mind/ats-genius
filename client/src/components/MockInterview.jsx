import CardWrp from "./CardWrp";
import { Mic, Play } from "lucide-react";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import { useLatestResume } from "@/hooks/useLatestResume";

const MockInterview = () => {
  const { data: latestResume } = useLatestResume();
  const aiMockInterview =
    latestResume?.atsAnalysis?.aiMockInterview?.sessionUrl || "";
  return (
    <>
      <CardWrp>
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="absolute top-[-40px] right-[-40px] w-[200px] h-[200px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: "rgba(255,87,34,0.12)" }}
          />
          <div
            className="absolute bottom-[-40px] left-[-40px] w-[180px] h-[180px] rounded-full blur-[80px] pointer-events-none"
            style={{ background: "rgba(255,112,67,0.08)" }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 p-2">
            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 pulse-glow"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,87,34,0.25), rgba(255,112,67,0.15))",
                  borderColor: "rgba(255,87,34,0.25)",
                }}
              >
                <Mic
                  className="w-7 h-7"
                  style={{ color: "var(--color-orange)" }}
                />
              </div>
              <div>
                <h3 className="text-white font-black text-lg">
                  AI Mock Interview
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm mt-0.5">
                  Practice with our AI interviewer and get instant feedback on
                  your answers.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <PrimaryButton href={aiMockInterview || "#"} target="_blank">
                <Play className="w-4 h-4" /> Start Session
              </PrimaryButton>
            </div>
          </div>
        </div>
      </CardWrp>
    </>
  );
};

export default MockInterview;
