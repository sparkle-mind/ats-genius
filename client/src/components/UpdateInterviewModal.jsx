import React from "react";
import { Grid } from "@mui/material";
import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import Select from "./atoms/select/Select";
import Textarea from "./atoms/textarea/Textarea";
import { Controller, useForm } from "react-hook-form";
import { INTERVIEW_OPTIONS } from "@/utils/constants";
const UpdateInterviewModal = ({
  open,
  onClose,
  interviewData,
  updateInterview,
  isUpdatingInterview,
}) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      score: interviewData?.score || null,
      stage: interviewData?.stage || null,
      result: interviewData?.result || "",
      notes: interviewData?.notes || "",
      feedback: interviewData?.feedback || "",
      prepLink: interviewData?.prepLink || "",
    },
  });

  const onSubmitInterviewForm = (data) => {
    const formattedData = {
      ...data,
      score: Number(data.score),
    };
    reset();
    updateInterview(formattedData);
  };

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="Update Interview"
      maxWidth="md"
    >
      <form
        onSubmit={handleSubmit(onSubmitInterviewForm)}
        className="space-y-6 text-white"
      >
        <Grid container spacing={3} className="max-h-[450px] overflow-y-scroll">
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Score
            </label>

            <Controller
              name="score"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={INTERVIEW_OPTIONS.SCORE || []}
                    placeholder="Select a score"
                    value={field.value || ""}
                    onChange={(option) => {
                      const value = option?.value ?? option;
                      field.onChange(value);
                    }}
                  />
                </>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Stage
            </label>

            <Controller
              name="stage"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={INTERVIEW_OPTIONS.STAGE || []}
                    placeholder="Select a stage"
                    value={field.value || ""}
                    onChange={(option) => {
                      const value = option?.value ?? option;
                      field.onChange(value);
                    }}
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Result
            </label>

            <Controller
              name="result"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={INTERVIEW_OPTIONS.RESULT || []}
                    placeholder="change result status"
                    value={field.value || ""}
                    onChange={(option) => {
                      const value = option?.value ?? option;
                      field.onChange(value);
                    }}
                  />
                </>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Notes
            </label>
            <Textarea
              {...register("notes")}
              error={errors?.notes?.message}
              placeholder="type here ..."
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Feedback
            </label>

            <Textarea
              {...register("feedback")}
              error={errors?.feedback?.message}
              placeholder="Write feedback here ..."
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
        </Grid>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700 mt-6"
          style={{ marginTop: "24px", paddingTop: "16px" }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-5 h-[44px] rounded-[var(--radius-md)] text-sm font-medium text-gray-400 hover:text-white hover:bg-[#1f1f1f] transition-colors focus:outline-none"
          >
            Cancel
          </button>

          <PrimaryButton type="submit" disabled={isUpdatingInterview}>
            {isUpdatingInterview ? "Updating..." : "Update"}
          </PrimaryButton>
        </div>
      </form>
    </CommonModal>
  );
};

export default UpdateInterviewModal;
