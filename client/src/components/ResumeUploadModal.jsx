import React, { useState, useRef } from "react";
import { Grid } from "@mui/material";
import {
  Upload,
  File,
  X,
  CheckCircle,
  UploadCloud,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import CommonModal from "./common/modal/CommonModal";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import Input from "./atoms/input/Input";
import Select from "./atoms/select/Select";
import { Controller, useForm } from "react-hook-form";
import { resumeSchema } from "@/lib/validation/resumeSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import SecondaryButton from "./atoms/buttons/SecondaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadResume } from "@/services/upload";
import toast from "react-hot-toast";
import { uploadResumeAPI } from "@/services/resumeService";

const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 years)",
  "Mid Level (3-5 years)",
  "Senior Level (5-8 years)",
  "Expert (8+ years)",
];

const MAX_FILE_SIZE_MB = 5;

const ResumeUploadModal = ({ open, onClose }) => {
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [cloudinaryResponse, setCloudinaryResponse] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }
    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setIsUploaded(false);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      name: "",
      email: "",
      phone: "",
      skills: "",
      experience: "",
      linkedin: "",
      portfolio: "",
      notes: "",
    },
    resolver: yupResolver(resumeSchema),
  });

  //   Resume Upload Mutation --- cloudinary
  const { mutate, isPending } = useMutation({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      setIsUploaded(true);
      setCloudinaryResponse(data);
      console.log("Cloudinary Response:", data);
      toast.success("File uploaded successfully");
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to upload resume.");
    },
  });

  const handleUploadOnCloudinary = () => {
    mutate(file);
  };
  //    Upload Mutation --- database
  const { mutate: uploadOnDb, isPending: uploadOnDbLoading } = useMutation({
    mutationFn: uploadResumeAPI,
    mutationKey: ["resumes"],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume saved successfully");
      reset();
      onClose();
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to save resume.");
    },
  });

  const handleUploadOnDatabase = async (data) => {
    if (!file) {
      toast.error("Please select a resume file first.");
      return;
    }
    if (!isUploaded || !cloudinaryResponse) {
      toast.error("Please click the orange 'Click to Upload' button to upload your resume before submitting.");
      return;
    }
    const payload = {
      ...data,
      file: cloudinaryResponse,
      parsedText: cloudinaryResponse?.parsedText,
    };

    console.log(payload);
    uploadOnDb(payload);
    reset();
  };
  console.log("cloudinaryResponse >>>>>", cloudinaryResponse)

  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title="Upload New Resume"
      maxWidth="md"
    >
      <form
        onSubmit={handleSubmit(handleUploadOnDatabase)}
        className="space-y-6 text-white"
      >
        {/* Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Resume File *
          </label>

          {!file ? (
            <div
              className={`relative border-2 border-dashed rounded-[var(--radius-lg)] p-8 text-center transition-all duration-200 ${dragActive
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 hover:border-gray-500 hover:bg-[#1f1f1f]"
                } bg-[#111111]`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Upload Resume"
              />

              <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                <div className="p-3 bg-[#1a1a1a] border border-gray-700 rounded-full text-gray-400">
                  <Upload className="w-6 h-6" />
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Click to upload or drag and drop
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    PDF, DOC, or DOCX (max. 5MB)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-max flex items-center justify-between p-4 bg-[#111111] border border-gray-700 rounded-[var(--radius-lg)]">
                  <div className="flex items-center space-x-3 pr-2">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                      <File className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white truncate max-w-[200px] sm:max-w-xs">
                        {file.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-white hover:bg-[#1f1f1f] rounded-lg transition-colors"
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {isUploaded ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-sm px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="w-4 h-4" />
                    Ready to Save
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleUploadOnCloudinary}
                    className={`h-[50px] px-6 rounded-xl flex items-center gap-2 font-bold text-sm text-white transition-all cursor-pointer ${
                      isPending
                        ? "bg-orange-500/50 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 animate-pulse border border-orange-400/40 shadow-lg shadow-orange-500/20"
                    }`}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-4 h-4" />
                        Click to Upload
                      </>
                    )}
                  </button>
                )}
              </div>

              {!isUploaded && (
                <div
                  className="flex items-start gap-2.5 p-3 rounded-xl border animate-fade-in-up"
                  style={{
                    background: "rgba(251,191,36,0.06)",
                    borderColor: "rgba(251,191,36,0.22)",
                  }}
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-300 text-xs font-bold uppercase tracking-wider">Attention Required</p>
                    <p className="text-amber-200/80 text-xs mt-0.5 leading-relaxed">
                      You have selected a file, but it hasn't been uploaded to our servers yet. Please click the orange <span className="font-bold text-amber-300">"Click to Upload"</span> button above before submitting.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Form Fields using MUI Grid */}
        <Grid container spacing={3} className="max-h-[300px] overflow-y-scroll">
          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Resume Title *
            </label>
            <Input
              placeholder="e.g. Frontend Developer - 2026"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              {...register("title")}
              error={errors.title?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Candidate Name *
            </label>

            <Input
              placeholder="John Doe"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              {...register("name")}
              error={errors.name?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Email Address *
            </label>

            <Input
              type="email"
              placeholder="john@example.com"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              {...register("email")}
              error={errors.email?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Phone Number
            </label>

            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              {...register("phone")}
              error={errors.phone?.message}
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
                    options={EXPERIENCE_LEVELS}
                    placeholder="Select level"
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

          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Skills (comma separated)
            </label>

            <Input
              placeholder="React, TypeScript, Next.js, Node.js"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              {...register("skills")}
              error={errors.skills?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              LinkedIn URL
            </label>

            <Input
              type="url"
              placeholder="https://linkedin.com/in/username"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              {...register("linkedin")}
              error={errors.linkedin?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Portfolio URL
            </label>

            <Input
              type="url"
              placeholder="https://yourwebsite.com"
              className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              {...register("portfolio")}
              error={errors.portfolio?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Additional Notes
            </label>
            <Input
              placeholder="Any specific instructions or focus areas for the analysis..."
              className={`bg-[#111111] border-gray-700 text-white placeholder:text-gray-500`}
              {...register("notes")}
              error={errors.notes?.message}
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

          <PrimaryButton type="submit" disabled={uploadOnDbLoading}>
            {uploadOnDbLoading ? (
              "Saving..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                Submit Resume
              </>
            )}
          </PrimaryButton>
        </div>
      </form>
    </CommonModal>
  );
};

export default ResumeUploadModal;
