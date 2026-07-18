"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import ResumeUploadModal from "./ResumeUploadModal";

const AnalysisHead = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Resume Analysis</h1>
          <p className="text-[var(--color-text-secondary)] text-sm mt-1">
            AI-powered resume scoring and optimisation.
          </p>
        </div>

        <PrimaryButton onClick={handleOpen}>
          <Upload className="w-4 h-4" /> Upload New Resume
        </PrimaryButton>
      </div>
      
      <ResumeUploadModal open={isModalOpen} onClose={handleClose} />
    </>
  );
};

export default AnalysisHead;
