"use client";
import { Grid } from "@mui/material";
import CardWrp from "./CardWrp";
import { CheckCircle, Eye, Pencil } from "lucide-react";
import LoadingWrpNew from "./common/LoadingWrpNew";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import InterviewDetailSidebar from "./InterviewDetailSidebar";
import {
  getInterviewByIdAPI,
  updateInterviewByIdAPI,
} from "@/services/interviewService";
import Link from "next/link";
import toast from "react-hot-toast";
import UpdateInterviewModal from "./UpdateInterviewModal";
const PastInterviews = ({ pastInterviews, isPastLoading }) => {
  const [currentID, setCurrentID] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const queryClient = useQueryClient();

  const viewInterview = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentID(Number(id));
    setOpenSidebar(true);
  };

  const {
    data: interviewData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["interview", currentID],
    queryFn: () => getInterviewByIdAPI(currentID),
    enabled: !!currentID,
  });

  const { mutate: updateInterview, isPending: isUpdatingInterview } =
    useMutation({
      mutationFn: (payload) => updateInterviewByIdAPI(currentID, payload),
      onSuccess: () => {
        toast.success("Interview updated successfully");
        queryClient.invalidateQueries({ queryKey: ["interview", currentID] });
        queryClient.invalidateQueries({ queryKey: ["past-interviews"] });
        setOpenUpdateModal(false);
      },
      onError: (error) => {
        toast.error(error?.message || "Error updating interview");
      },
    });

  const handleUpdateInterview = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentID(Number(id));
    setOpenUpdateModal(true);
  };
  const averageScore =
    pastInterviews?.length > 0
      ? (
          pastInterviews.reduce(
            (sum, interview) => sum + (Number(interview.score) || 0),
            0,
          ) / pastInterviews.length
        ).toFixed(1)
      : 0;
  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400">
          {error.message || "Error loading job details"}
        </p>
      </div>
    );
  console.log("interviewData current", interviewData);

  return (
    <>
      <Grid size={{ xs: 12, lg: 6 }}>
        <CardWrp className="relative mt-0 h-full">
          <div className="flex items-center gap-2 mb-5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(255,87,34,0.12)" }}
            >
              <CheckCircle
                className="w-4 h-4"
                style={{ color: "var(--color-orange)" }}
              />
            </div>
            <h2 className="text-lg font-bold text-white">Past Interviews</h2>
            <span className="absolute z-[-1] top-[-20px] leading-[100%] right-4 text-amber-100 ml-auto text-[220px] opacity-[0.05] font-bold rounded-full">
              {pastInterviews?.length}
            </span>
          </div>

          <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto">
            {isPastLoading && <LoadingWrpNew />}

            {pastInterviews?.length === 0 && (
              <p className="text-center text-[var(--color-text-secondary)]">
                No past interviews
              </p>
            )}
            {pastInterviews?.map((item) => (
              <Link
                href={`/job-tracker/${item?.applicationId}`}
                key={item?.id}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-black">
                    {item?.application?.companyName[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">
                    {item?.application?.companyName}
                  </p>
                  <p className="text-[var(--color-text-secondary)] text-xs mt-0.5">
                    {item?.scheduledDate
                      ? new Date(item.scheduledDate).toDateString()
                      : "TBD"}{" "}
                    <span className="text-green-400 flex items-center gap-1.5 text-sm capitalize">
                      <p className="text-white">Stage :</p> {item?.stage}
                    </span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={(e) => viewInterview(item?.id, e)}
                      className="cursor-pointer bg-orange-500 px-2 py-0.5 rounded-full"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={(e) => handleUpdateInterview(item?.id, e)}
                      className="cursor-pointer bg-orange-500 px-2 py-1 rounded-full"
                    >
                      <Pencil size={18} />
                    </button>
                  </div>
                  <span
                    className={`text-md font-bold px-2 py-1 mt-1 block rounded-full `}
                    style={{
                      color:
                        item?.result === "Pass"
                          ? "green"
                          : item?.result === "Fail"
                            ? "red"
                            : item?.result === "Waiting"
                              ? "yellow"
                              : "white",
                    }}
                  >
                    {item?.result || "not given yet"}
                  </span>
                  <p className="text-zinc-600 text-md mt-1">
                    Score:{" "}
                    <span className="text-white text-[16px] font-bold">
                      {item?.score || "-"}
                    </span>
                    /10
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[#a09d9d]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-zinc-400 text-sm font-medium">
                Average Interview Score
              </p>
              <span className="text-white font-black text-lg">
                {" "}
                {(averageScore / 10) * 100 || 0}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/5">
              <div
                className="progress-bar"
                style={{ width: `${(averageScore / 10) * 100}%` }}
              />
            </div>
            <p className="text-zinc-600 text-xs mt-2">
              Based on interview score out of 10
            </p>
          </div>
        </CardWrp>
      </Grid>

      <InterviewDetailSidebar
        interviewData={interviewData}
        isLoading={isLoading}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <UpdateInterviewModal
        interviewData={interviewData}
        updateInterview={updateInterview}
        isUpdatingInterview={isUpdatingInterview}
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
      />
    </>
  );
};

export default PastInterviews;
