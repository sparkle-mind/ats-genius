"use client";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
  Bookmark,
  XCircleIcon,
  TvMinimalPlay,
  BanknoteArrowDown,
  Check,
  EyeIcon,
} from "lucide-react";
import JobTrackerHead from "@/components/JobTrackerHead";
import JobStates from "@/components/JobStates";
import ApplicationBoard from "@/components/ApplicationBoard";
import { useQuery } from "@tanstack/react-query";
import { getJobsAPI } from "@/services/jobService";
import Image from "next/image";
import { useState } from "react";

const columns = [
  {
    id: "saved",
    label: "Saved (interested)",
    icon: Bookmark,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
  },
  {
    id: "applied",
    label: "Applied",
    icon: Clock,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
  },
  {
    id: "screening",
    label: "Screening",
    icon: TvMinimalPlay,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20",
  },
  {
    id: "interview",
    label: "Interview",
    icon: MessageSquare,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
  },

  {
    id: "offer",
    label: "Offer",
    icon: Star,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: "joined",
    label: "Joined",
    icon: Check,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-400/20",
  },
  {
    id: "rejected",
    label: "Rejected",
    icon: XCircle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },

  {
    id: "withdrawn",
    label: "Withdrawn",
    icon: BanknoteArrowDown,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
  },
];


const JobTrackerComponents = () => {
  const [showProcessDiagram, setShowProcessDiagram] = useState(false);
  const handleShowProcessDiagram = () => {
    setShowProcessDiagram(!showProcessDiagram);
  };
  const {
    data: jobsData,
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery({
    queryKey: ["job"],
    queryFn: getJobsAPI,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
  const summaryStats = [
    {
      label: "Total Tracked",
      value: jobsData?.length || 0,
      icon: Briefcase,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      label: "Applied",
      value: jobsData?.filter((job) => job.status === "applied")?.length,
      icon: CheckCircle,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Interviews",
      value: jobsData?.filter((job) => job.status === "interview")?.length || 0,
      icon: MessageSquare,
      color: "text-orange-300",
      bg: "bg-orange-400/10",
    },
    {
      label: "Offers",
      value: jobsData?.filter((job) => job.status === "offer")?.length || 0,
      icon: Star,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="animate-fade-in-up">
      <JobTrackerHead />
      <div className="flex flex-col gap-[20px] md:gap-[30px]  ">
        <JobStates summaryStats={summaryStats} />
        <div className="text-right ml-auto">
          <button
            onClick={handleShowProcessDiagram}
            className="text-primary text-sm flex items-center gap-2 font-semibold hover:underline transition cursor-pointer"
          >
            {showProcessDiagram ? (
              <>
                <XCircleIcon className="w-4 h-4 text-red-500" /> Hide Process
                Diagram
              </>
            ) : (
              <>
                <EyeIcon className="w-4 h-4 text-emerald-500" /> Show Process
                Diagram
              </>
            )}
          </button>
        </div>

        {showProcessDiagram && (
          <div className="w-[70%] m-[0_auto_30px_auto] transition-all ease-in-out">
            <Image
              src={"/images/jobs-pipline.png"}
              alt="job"
              width={500}
              height={300}
              className="w-full object-contain"
              priority
              unoptimized
            />
          </div>
        )}
        <ApplicationBoard columns={columns} />
      </div>
    </div>
  );
};

export default JobTrackerComponents;
