"use client";
import Grid from "@mui/material/Grid";
import ATSScore from "@/components/ATSScore";
import AISuggestions from "@/components/AISuggestions";
import { getResumeByIdAPI } from "@/services/resumeService";
import LoadingWrpNew from "./common/LoadingWrpNew";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import StrengthList from "./StrengthList";
import WeaknessList from "./WeaknessList";
import MissingKeyword from "./MissingKeyword";
import TopCompany from "./TopCompany";
import ProTips from "./ProTips";
import ResumeAnalysisBanner from "./ResumeAnalysisBanner";
import InterviewPrepCard from "./InterviewPrepCard";
import Back from "./common/Back";

export default function ResumeATSComp({ resumeId }) {
  const {
    data: resumeData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["resume", resumeId],
    queryFn: () => getResumeByIdAPI(resumeId),
    onSuccess: (data) => {
      toast.success("Resume loaded successfully:", data);
    },
    onError: (error) => {
      toast.error("Failed to load resume:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <LoadingWrpNew />;
  if (isError) return <p>Error: {error?.message}</p>;

  console.log("Resume data by ID", resumeData);

  return (
    <div className="animate-fade-in-up">
      <Back />
      <div className="flex overflow-hidden flex-col gap-[20px] md:gap-[30px]">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <ResumeAnalysisBanner resumeData={resumeData} />
          </Grid>
          <ATSScore resumeData={resumeData} />
        </Grid>
        <InterviewPrepCard resumeData={resumeData} />
        <ProTips resumeData={resumeData} />
        <Grid container spacing={3}>
          <MissingKeyword resumeData={resumeData} />
          <StrengthList resumeData={resumeData} />
          <WeaknessList resumeData={resumeData} />
        </Grid>
        <Grid container spacing={3}>
          <AISuggestions resumeData={resumeData} />
          <TopCompany resumeData={resumeData} />
        </Grid>
      </div>
    </div>
  );
}
