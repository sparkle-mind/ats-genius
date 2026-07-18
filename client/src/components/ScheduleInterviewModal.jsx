import React from "react";
import { Grid } from "@mui/material";
import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import Input from "./atoms/input/Input";
import Select from "./atoms/select/Select";
import Textarea from "./atoms/textarea/Textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { jobSchema } from "@/lib/validation/jobSchema";
import { INTERVIEW_OPTIONS, JOB_OPTIONS } from "@/utils/constants";
import CustomDateTimePicker from "./atoms/date-picker/CustomDateTimePicker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getJobsAPI, jobCreateAPI } from "@/services/jobService";
import { interviewSchema } from "@/lib/validation/interviewSchema";
import { scheduleInterviewAPI } from "@/services/interviewService";

const ScheduleInterviewModal = ({ open, onClose }) => {
  const queryClient = useQueryClient();
  const formatDateTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();

    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${dd}-${mm}-${yyyy} time: ${hh}:${min}`;
  };

  // FETCH APPLICATON/JOBS FOR APPLICATION ID
  const {
    data: jobs,
    isLoading: jobsLoading,
    error: jobsError,
    isError: jobsIsError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () => getJobsAPI(),
  });
  console.log("my jobs", jobs);

  const APPLICATIONS_OPTIONS = jobs?.map((job) => {
    return {
      label: `${job.companyName} - ${job.jobTitle}`,
      value: job.id,
    };
  });

  // SCHEDULE INTERVIEW
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(interviewSchema),
    defaultValues: {
      applicationId: "",
      stage: "",
      scheduledDate: null,
      interviewer: "",
      duration: "",
      prepLink: "",
      notes: "",
    },
  });

  const {
    mutate: scheduleInterviewMutation,
    isPending: isSchedulingInterview,
    error: interviewScheduleError,
    isError: isInterviewScheduleError,
  } = useMutation({
    mutationFn: scheduleInterviewAPI,
    onSuccess: () => {
      toast.success("Interview scheduled successfully");
      reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error) => {
      const message =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to create interview";
      toast.error(message);
    },
  });

  const onSubmitInterviewForm = (data) => {
    console.log("FORM DATA >>>>>>>>>> ", data);
    const formattedData = {
      ...data,
      applicationId: Number(data.applicationId),
    };
    console.log("formattedData DATA >>>>>>>> ", formattedData);

    scheduleInterviewMutation(formattedData);
  };

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="Schedule Interview"
      maxWidth="md"
    >
      <form
        onSubmit={handleSubmit(onSubmitInterviewForm)}
        className="space-y-6 text-white"
      >
        <Grid container spacing={3} className="max-h-[450px] overflow-y-scroll">
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Which job is this for?
            </label>

            <Controller
              name="applicationId"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={APPLICATIONS_OPTIONS || []}
                    placeholder="Select a job/application"
                    value={field.value || ""}
                    onChange={(option) => {
                      const value = option?.value ?? option;
                      field.onChange(value);
                    }}
                  />

                  {fieldState.error && (
                    <p className="text-red-500 text-xs mt-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Interview Stage
            </label>
            <Controller
              name="stage"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={INTERVIEW_OPTIONS.STAGE}
                    placeholder="Select stage"
                    value={field.value || ""} // ✅ important
                    onChange={(val) => field.onChange(val)} // safer
                    onBlur={field.onBlur}
                  />

                  {fieldState.error && (
                    <p className="!text-red-500 text-xs mt-2">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Interview Date & Time
            </label>
            <Controller
              name="scheduledDate"
              control={control}
              render={({ field, fieldState }) => (
                <CustomDateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState?.error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Interviewer
            </label>

            <Input
              {...register("interviewer")}
              error={errors?.interviewer?.message}
              placeholder="ex. Sarah Chen"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Duration
            </label>

            <Input
              {...register("duration")}
              error={errors?.duration?.message}
              placeholder="ex. 45 minutes"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Preparation Link
            </label>

            <Input
              {...register("prepLink")}
              error={errors?.prepLink?.message}
              placeholder="ex. https://google.com"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Note
            </label>
            <Controller
              control={control}
              name="notes"
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  placeholder="Write note here..."
                  className={`bg-[#111111] border-gray-700 text-white placeholder:text-gray-500`}
                />
              )}
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

          <PrimaryButton type="submit" disabled={isSchedulingInterview}>
            {isSchedulingInterview ? "Scheduling..." : "Schedule"}
          </PrimaryButton>
        </div>
      </form>
    </CommonModal>
  );
};

export default ScheduleInterviewModal;
