import React from "react";
import { Grid } from "@mui/material";
import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import Input from "./atoms/input/Input";
import Select from "./atoms/select/Select";
import Textarea from "./atoms/textarea/Textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobByIdAPI, updateJobAPI } from "@/services/jobService";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { JOB_OPTIONS } from "@/utils/constants";
import CustomDateTimePicker from "./atoms/date-picker/CustomDateTimePicker";

const EditJobModal = ({ open, onClose, jobId }) => {
  const queryClient = useQueryClient();
  const {
    data: existingData,
    isLoading: isLoadingJob,
    error: errorJob,
  } = useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobByIdAPI(jobId),
  });

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      companyName: existingData?.job?.companyName || "",
      jobTitle: existingData?.job?.jobTitle || "",
      role: existingData?.job?.role || "",
      location: existingData?.job?.location || "",
      experience: existingData?.job?.experience || "",
      jobType: existingData?.job?.jobType || "",
      workMode: existingData?.job?.workMode || "",
      platform: existingData?.job?.platform || "",
      jobUrl: existingData?.job?.jobUrl || "",
      companyWebsite: existingData?.job?.companyWebsite || "",
      recruiterName: existingData?.job?.recruiterName || "",
      recruiterEmail: existingData?.job?.recruiterEmail || "",
      expectedSalary: existingData?.job?.expectedSalary || "",
      offeredSalary: existingData?.job?.offeredSalary || "",
      currency: existingData?.job?.currency || "",
      applicationDate: existingData?.job?.applicationDate || null,
      interviewDate: existingData?.job?.interviewDate || null,
      followUpDate: existingData?.job?.followUpDate || null,
      status: existingData?.job?.status || "",
      priority: existingData?.job?.priority || "",
      jobDescription: existingData?.job?.jobDescription || "",
      note: existingData?.job?.note || "",
      feedback: existingData?.job?.feedback || "",
    },
  });

  const { mutate: editJobMutation, isPending: isEditingJob } = useMutation({
    mutationFn: updateJobAPI,
    onSuccess: () => {
      toast.success("Job updated successfully");
      reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["job"], exact: false });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update job");
    },
  });

  const onSubmitJobForm = (data) => {
    editJobMutation({
      jobId,
      data,
    });
  };

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="Edit Job"
      subTitle={`ID ${jobId} `}
      maxWidth="md"
    >
      <form
        onSubmit={handleSubmit(onSubmitJobForm)}
        className="space-y-6 text-white"
      >
        <Grid container spacing={3} className="max-h-[450px] overflow-y-scroll">
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Company Name
            </label>

            <Input
              {...register("companyName")}
              // placeholder="e.g. Frontend Developer - 2026"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Job title
            </label>

            <Input
              {...register("jobTitle")}
              placeholder="e.g. Frontend Developer"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Role
            </label>

            <Input
              placeholder="tech@company.com"
              {...register("role")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Location
            </label>

            <Input
              placeholder="Ahmedabad,Gujarat"
              {...register("location")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Job Type
            </label>
            <Controller
              name="jobType"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={JOB_OPTIONS.JOB_TYPE}
                    placeholder="Select job type"
                    value={field.value || ""} // ✅ important
                    onChange={(val) => field.onChange(val)} // safer
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Experience Level
            </label>
            <Controller
              name="experience"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={JOB_OPTIONS.EXPERIENCE_LEVELS}
                    placeholder="Select level"
                    value={field.value || ""} // ✅ important
                    onChange={(val) => field.onChange(val)} // safer
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Work Mode
            </label>
            <Controller
              name="workMode"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={JOB_OPTIONS.WORK_MODE}
                    placeholder="Select job type"
                    value={field.value || ""} // ✅ important
                    onChange={(val) => field.onChange(val)} // safer
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Job Status
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={JOB_OPTIONS.JOB_STATUS}
                    placeholder="Select job status"
                    value={field.value || ""} // ✅ important
                    onChange={(val) => field.onChange(val)} // safer
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Priority
            </label>
            <Controller
              name="priority"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <Select
                    options={JOB_OPTIONS.PRIORITY}
                    placeholder="Select priority"
                    value={field.value || ""} // ✅ important
                    onChange={(val) => field.onChange(val)} // safer
                    onBlur={field.onBlur}
                  />
                </>
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Platform
            </label>

            <Input
              placeholder="linkdin, Naukri, Indeed,Referral,from company"
              {...register("platform")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Job URL
            </label>

            <Input
              placeholder="https://linkdin.com"
              {...register("jobUrl")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Company Website
            </label>

            <Input
              placeholder="https://microsoft.com"
              {...register("companyWebsite")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Recruiter Name
            </label>

            <Input
              placeholder="Enter Recruiter name"
              {...register("recruiterName")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Recruiter Email
            </label>

            <Input
              placeholder="Enter Recruiter email"
              {...register("recruiterEmail")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Expected Salary
            </label>

            <Input
              placeholder="Enter Expected Salary"
              {...register("expectedSalary")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Company's Offered Salary
            </label>

            <Input
              placeholder="Enter Company's Offered Salary"
              {...register("offeredSalary")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Currency
            </label>

            <Input
              placeholder="Enter currency ex: INR, USD"
              {...register("currency")}
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Application Date
            </label>
            <Controller
              name="applicationDate"
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
              Interview Date
            </label>
            <Controller
              name="interviewDate"
              control={control}
              render={({ field, fieldState }) => (
                <CustomDateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Follow Up Date
            </label>
            <Controller
              name="followUpDate"
              control={control}
              render={({ field, fieldState }) => (
                <CustomDateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Job description
            </label>
            <Controller
              control={control}
              name="jobDescription"
              render={({ field, fieldState }) => (
                <Textarea
                  {...field}
                  placeholder="Paste job description here..."
                  className={`bg-[#111111] border-gray-700 text-white placeholder:text-gray-500`}
                />
              )}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Note
            </label>
            <Controller
              control={control}
              name="note"
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

          <PrimaryButton type="submit" disabled={isEditingJob}>
            {isEditingJob ? "Editing..." : "Edit Job"}
          </PrimaryButton>
        </div>
      </form>
    </CommonModal>
  );
};

export default EditJobModal;
