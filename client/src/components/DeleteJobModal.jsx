import React from "react";
import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import { Trash2 } from "lucide-react";

const DeleteJobModal = ({
  open,
  onClose,
  onDelete,
  jobId,
  loading = false,
}) => {
  console.log("selectedJobId", jobId);

  return (
    <CommonModal open={open} onClose={onClose} maxWidth="sm">
      {/* Body */}
      <div className="py-4">
        {/* Warning Icon */}
        <div className="flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>
        </div>

        {/* Warning Text */}
        <div className="text-center">
          <h3 className="text-[30px] font-semibold text-white mb-2">
            Are you sure?
          </h3>

          <p className="text-md text-gray-400 leading-relaxed">
            You are about to permanently delete{" "}
            <span className="text-white font-medium">
              ID # {jobId || "this job"}
            </span>
            .
          </p>

          <p className="text-sm text-red-400 mt-2">
            This action cannot be undone.
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-700 mt-6">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-5 h-[44px] rounded-[var(--radius-md)] text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1f1f1f] transition-colors focus:outline-none disabled:opacity-50"
        >
          Cancel
        </button>

        <PrimaryButton
          type="button"
          onClick={onDelete}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {loading ? "Deleting..." : "Delete Job"}
        </PrimaryButton>
      </div>
    </CommonModal>
  );
};

export default DeleteJobModal;
