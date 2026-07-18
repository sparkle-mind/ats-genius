import AnalyticsHead from "@/components/AnalyticsHead";
import AnalyticsStats from "@/components/AnalyticsStats";
import MonthlyApplications from "@/components/MonthlyApplications";
import DemandSkills from "@/components/DemandSkills";

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in-up">
      <AnalyticsHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]">
        <AnalyticsStats />
        <MonthlyApplications />
        <DemandSkills />
      </div>
    </div>
  );
}
