"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import AddJobModal from "./AddJobModal";

const JobTrackerHead = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-black text-white">Job Tracker</h1>
        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
          Manage and track all your job applications.
        </p>
      </div>

      <PrimaryButton onClick={handleOpen}>
        <Plus className="w-4 h-4" /> Add Job Application
      </PrimaryButton>
      <AddJobModal open={isModalOpen} onClose={handleClose} />
    </div>
  );
};

export default JobTrackerHead;
