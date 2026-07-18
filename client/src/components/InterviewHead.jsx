"use client";
import { Calendar } from "lucide-react";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import { useState } from "react";

const InterviewHead = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-white">Interviews</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
          Track, prepare, and ace every interview.
        </p>
      </div>
      <PrimaryButton onClick={handleOpen}>
        <Calendar className="w-4 h-4" /> Schedule Interview
      </PrimaryButton>
      <ScheduleInterviewModal open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default InterviewHead;
