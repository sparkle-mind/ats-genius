"use client";
import React from "react";
import CommonSidebar from "./common/CommonSidebar";
import LoadingWrpNew from "./common/LoadingWrpNew";

import {
  Hash,
  User,
  Clock,
  CalendarDays,
  Star,
  Layers,
  NotebookText,
  MessageSquareText,
  Link2,
  CheckCircle2Icon,
} from "lucide-react";
import Link from "next/link";

const InterviewDetailSidebar = ({
  interviewData,
  isLoading,
  openSidebar,
  setOpenSidebar,
}) => {
  return (
    <CommonSidebar
      open={openSidebar}
      onClose={() => setOpenSidebar(false)}
      title="Interview Details"
      width={600}
    >
      {isLoading ? (
        <LoadingWrpNew />
      ) : (
        <div className="space-y-6 text-white">
          {/* HEADER */}
          <div className="rounded-2xl bg-gradient-to-r from-orange-500/20 to-orange-700/5 border border-orange-500/20 p-6">
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              <span className="text-md">Application ID</span>
              <Hash size={18} />
              {interviewData?.applicationId}
            </div>

            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <span className="text-md">Interview ID</span>
              <Hash size={18} />
              {interviewData?.id}
            </div>
          </div>

          {/* QUICK INFO */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <User size={16} />
                <span className="text-sm">Interviewer</span>
              </div>
              <p className="font-semibold mt-2">
                {interviewData?.interviewer || "-"}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={16} />
                <span className="text-sm">Duration</span>
              </div>
              <p className="font-semibold mt-2">
                {interviewData?.duration
                  ? `${interviewData.duration} min`
                  : "-"}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <CalendarDays size={16} />
                <span className="text-sm">Scheduled Date</span>
              </div>
              <p className="font-semibold mt-2">
                {interviewData?.scheduledDate
                  ? new Date(interviewData.scheduledDate).toDateString()
                  : "Not scheduled"}
              </p>
            </div>

            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Star size={16} />
                <span className="text-sm">Score</span>
              </div>
              <p className="font-semibold mt-2">
                {interviewData?.score ?? "Not evaluated"}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div className="flex gap-3 flex-wrap items-center">
            <div className="flex items-center gap-2 text-gray-400">
              <Layers size={16} />
              <span>Stage</span>
            </div>

            <span className="rounded-full bg-orange-500/15 text-orange-400 px-4 py-2 text-sm font-semibold capitalize">
              {interviewData?.stage}
            </span>

            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle2Icon size={16} />
              <span>Result</span>
            </div>
            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize`}
              style={{
                backgroundColor: interviewData?.result === "Pass"
                  ? "green"
                  : interviewData?.result === "Fail"
                    ? "red"
                    : "orange",
                color: "white",
              }}
            >
              {interviewData?.result}
            </span>
          </div>

          {/* NOTES */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3 text-orange-400">
              <NotebookText size={18} />
              <h3 className="font-semibold">Notes</h3>
            </div>

            <p className="text-gray-300 whitespace-pre-wrap">
              {interviewData?.notes || "No notes"}
            </p>
          </div>

          {/* FEEDBACK */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <div className="flex items-center gap-2 mb-3 text-orange-400">
              <MessageSquareText size={18} />
              <h3 className="font-semibold">Feedback</h3>
            </div>

            <p className="text-gray-300 whitespace-pre-wrap">
              {interviewData?.feedback || "No feedback yet"}
            </p>
          </div>

          {/* PREP LINK */}
          {interviewData?.prepLink && (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="flex items-center gap-2 mb-3 text-orange-400">
                <Link2 size={18} />
                <h3 className="font-semibold">Prep Link</h3>
              </div>

              <Link
                href={interviewData?.prepLink}
                target="_blank"
                className="text-blue-400 underline"
              >
                {interviewData?.prepLink}
              </Link>
            </div>
          )}
        </div>
      )}
    </CommonSidebar>
  );
};

export default InterviewDetailSidebar;
