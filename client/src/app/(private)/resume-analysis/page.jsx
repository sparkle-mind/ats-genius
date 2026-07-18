import Grid from "@mui/material/Grid";
import AnalysisHead from "@/components/AnalysisHead";
import ResumeHistory from "@/components/ResumeHistory";
export default function ResumeAnalysisPage() {
  return (
    <div className="animate-fade-in-up">
      <AnalysisHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]">
        <Grid container spacing={3}>
          <ResumeHistory />
        </Grid>
      </div>
    </div>
  );
}
