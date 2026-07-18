"use client";

import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import { Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { deleteAccount } from "@/services/userService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const DeleteAccountModal = ({ open, onClose }) => {
  const router = useRouter();

  const { mutate: deleteMutation, isPending } = useMutation({
    mutationKey: ["deleteAccount"],
    mutationFn: deleteAccount,

    onSuccess: (data) => {
      toast.success(data?.message || "Account deleted successfully");
      onClose();
      router.replace("/login");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete account");
    },
  });

  return (
    <CommonModal open={open} onClose={onClose} maxWidth="sm">
      <div className="py-4">
        <div className="flex items-center justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20">
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-[30px] font-semibold text-white mb-2">
            Are you sure?
          </h3>

          <p className="text-md text-gray-400 leading-relaxed">
            You are about to permanently delete{" "}
            <span className="text-white font-medium">your account</span>.
          </p>

          <p className="text-xl text-red-500 mt-2">
            This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-5 border-t border-gray-700 mt-6">
        <button
          type="button"
          onClick={onClose}
          disabled={isPending}
          className="px-5 h-[44px] rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1f1f1f] transition-colors disabled:opacity-50"
        >
          Cancel
        </button>

        <PrimaryButton
          type="button"
          onClick={() => deleteMutation()}
          disabled={isPending}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {isPending ? "Deleting..." : "Delete Account"}
        </PrimaryButton>
      </div>
    </CommonModal>
  );
};

export default DeleteAccountModal;
