"use client";
import { getLatestResumeAPI } from "@/services/resumeService";
import { useQuery } from "@tanstack/react-query";

export const useLatestResume = () => {
  return useQuery({
    queryKey: ["latest-resume"],
    queryFn: getLatestResumeAPI,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};
