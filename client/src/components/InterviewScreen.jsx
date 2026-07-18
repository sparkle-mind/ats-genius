"use client";
import Grid from "@mui/material/Grid";
import {
  Video,
  Calendar,
  CheckCircle,
  Mic,
  BookOpen,
  TrendingUp,
  Play,
  Award,
} from "lucide-react";
import InterviewHead from "@/components/InterviewHead";
import InterviewStates from "@/components/InterviewStates";
import UpcomingInterview from "@/components/UpcomingInterview";
import PastInterviews from "@/components/PastInterviews";
import InterviewPrep from "@/components/InterviewPrep";
import MockInterview from "@/components/MockInterview";
import { useQuery } from "@tanstack/react-query";
import {
  getPastInterviewsAPI,
  getUpcomingInterviewsAPI,
} from "@/services/interviewService";

const prepResources = [
  {
    title: "System Design Fundamentals",
    category: "System Design",
    duration: "45 min",
    difficulty: "Advanced",
    icon: TrendingUp,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    diffColor: "text-red-400",
    diffBg: "bg-red-400/10",
  },
  {
    title: "Behavioural Interview Mastery",
    category: "Soft Skills",
    duration: "30 min",
    difficulty: "Beginner",
    icon: Mic,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
    diffColor: "text-emerald-400",
    diffBg: "bg-emerald-400/10",
  },
  {
    title: "React Deep Dive Q&A",
    category: "Technical",
    duration: "60 min",
    difficulty: "Intermediate",
    icon: BookOpen,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    diffColor: "text-amber-400",
    diffBg: "bg-amber-400/10",
  },
  {
    title: "Mock Interview: Live Coding",
    category: "Practice",
    duration: "90 min",
    difficulty: "Advanced",
    icon: Play,
    color: "text-orange-200",
    bg: "bg-orange-300/10",
    diffColor: "text-red-400",
    diffBg: "bg-red-400/10",
  },
];

export default function InterviewScreen() {
  const { data: upcomingInterviews, isLoading: isUpcomingLoading } = useQuery({
    queryKey: ["interviews", "upcoming"],
    queryFn: () => getUpcomingInterviewsAPI(),
    staleTime: 60 * 1000, // 1 minute
  });

  const { data: pastInterviews, isLoading: isPastLoading } = useQuery({
    queryKey: ["interviews", "past"],
    queryFn: () => getPastInterviewsAPI(),
    staleTime: 60 * 1000, // 1 minute
  });

  const averageScore =
    pastInterviews?.length > 0
      ? (
          pastInterviews.reduce(
            (sum, interview) => sum + (Number(interview.score) || 0),
            0,
          ) / pastInterviews.length
        ).toFixed(1)
      : 0;

  const summaryStats = [
    {
      label: "Total Interviews",
      value: pastInterviews?.length + upcomingInterviews?.length || "0",
      icon: Video,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      label: "Upcoming Interviews",
      value: upcomingInterviews?.length || "0",
      icon: Calendar,
      color: "text-orange-300",
      bg: "bg-orange-400/10",
    },
    {
      label: "Past Interviews",
      value: pastInterviews?.length || "0",
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Avg. Score out of 10",
      value: averageScore,
      icon: Award,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <InterviewHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]">
        <InterviewStates summaryStats={summaryStats} />
        <Grid container spacing={3} className="mt-0">
          <UpcomingInterview
            upcomingInterviews={upcomingInterviews}
            isUpcomingLoading={isUpcomingLoading}
          />
          <PastInterviews
            pastInterviews={pastInterviews}
            isPastLoading={isPastLoading}
          />
        </Grid>
        <InterviewPrep prepResources={prepResources} />
        <MockInterview />
      </div>
    </div>
  );
}
