"use client";
import React, { useState } from "react";
import {
  FileText,
  Eye,
  Trash2,
  Calendar,
  HardDrive,
  Award,
  User,
  Mail,
  Phone,
  Briefcase,
  Link as LinkIcon,
  FileCheck,
  AlertTriangle,
  FileBarChart2,
  Loader2,
  SearchCheckIcon,
} from "lucide-react";
import CardWrp from "./CardWrp";
import CommonModal from "./common/modal/CommonModal";
import {
  analyzeResumeAPI,
  deleteResumeAPI,
  getResumesAPI,
} from "@/services/resumeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import LoadingWrpNew from "./common/LoadingWrpNew";
import { useRouter } from "next/navigation";

const ResumeHistory = () => {
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const [analyzingResumeId, setAnalyzingResumeId] = useState(null);
  const queryClient = useQueryClient();
  const route = useRouter();
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getScoreColor = (score) => {
    if (score >= 85)
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 70)
      return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-orange-400 bg-orange-500/10 border-orange-500/20";
  };

  // fetching all resumes of the user
  const {
    data: resumesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["resumes"],
    queryFn: () => getResumesAPI(),
    onSuccess: (data) => {
      console.log("Resumes loaded successfully:", data);
    },
    onError: (error) => {
      console.error("Failed to load resumes:", error);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleDeleteClick = (resume, e) => {
    e.stopPropagation();
    setResumeToDelete(resume);
  };

  const handleConfirmDelete = (resumeId) => {
    if (!resumeId) return;
    deleteResume(resumeId);
  };
  //   Resume Delete Mutation
  const { mutate: deleteResume, isPending: deleteResumeLoading } = useMutation({
    mutationFn: deleteResumeAPI,
    mutationKey: ["resumes"],
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      toast.success("Resume deleted successfully");
      setResumeToDelete(null);
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete resume.");
    },
  });

  //  CHECK ATS (RESUME AI ANALYSIS) MUTATION
  const { mutate: analyzeResume, isPending: analyzeResumeLoading } =
    useMutation({
      mutationFn: analyzeResumeAPI,
      mutationKey: ["resumes"],
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["resumes"] });
        toast.success("Resume analyzed successfully");
        setAnalyzingResumeId(null);
      },
      onError: (error) => {
        toast.error(error?.message || "Failed to analyze resume.");
        setAnalyzingResumeId(null);
      },
    });

  const handleAtsAnalysis = (resumeId) => {
    setAnalyzingResumeId(resumeId);
    analyzeResume(resumeId);
  };

  const viewResumeATSAnalysis = (resumeId) => {
    route.push(`/resume-analysis/${resumeId}`);
  };
  console.log("resumesData", resumesData);
  if (isLoading) return <LoadingWrpNew />;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <CardWrp className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">
              Uploaded Resume History
            </h2>
            <p className="text-zinc-400 text-xs mt-0.5">
              Manage your uploaded resumes, scores, and candidate profiles.
            </p>
          </div>
          <span className="text-center text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
            {resumesData.length} Total
          </span>
        </div>

        {resumesData.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 border border-dashed border-zinc-800 rounded-xl bg-black/20 text-center">
            <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-500 mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-white">No resumes found</p>
            <p className="text-xs text-zinc-500 mt-1 max-w-[280px]">
              Upload a new resume using the action card or "Resume Analysis"
              button.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resumesData.map((resume) => (
              <div
                key={resume.id}
                className="glass-card border border-white/5 hover:border-orange-500/20 bg-zinc-900/40 rounded-xl p-4 flex flex-col justify-between gap-4 transition-all duration-200 group relative overflow-hidden"
              >
                {/* Header section with score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white text-sm font-bold truncate group-hover:text-orange-400 transition-colors">
                        {resume?.title}
                      </h3>
                      <p className="text-zinc-400 text-xs font-medium truncate mt-0.5">
                        Candidate: {resume?.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-zinc-500 text-[11px] border-t border-white/5 pt-3">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Calendar className="w-3.5 h-3.5 text-zinc-200 shrink-0" />
                    <span className="truncate text-zinc-100">
                      {formatDate(resume?.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <HardDrive className="w-3.5 h-3.5 text-zinc-200 shrink-0" />
                    <span className="truncate text-zinc-100">
                      {resume?.fileResult?.[1]?.bytes
                        ? `${(Number(resume.fileResult[1].bytes) / 1024).toFixed(2)} KB`
                        : "Unknown size"}
                    </span>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="flex items-center gap-2 mt-1 pt-3 border-t border-white/5">
                  <button
                    onClick={() => setSelectedResume(resume)}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-1.5 h-9 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors border border-zinc-700"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={(e) => handleDeleteClick(resume, e)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white text-xs font-semibold transition-all duration-150 border border-red-500/20 hover:border-red-500"
                    title="Delete Resume"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center justify-end">
                  {!resume?.isAtsAvailable ? (
                    <button
                      onClick={() => handleAtsAnalysis(resume.id)}
                      disabled={analyzingResumeId === resume.id}
                      className="
        inline-flex items-center gap-2
        px-4 py-2
        rounded-xl
        bg-zinc-900
        border border-zinc-700
        text-zinc-100
        text-sm font-medium
        transition-all duration-200
        hover:bg-zinc-800
        hover:border-cyan-500/50
        hover:shadow-lg hover:shadow-cyan-500/10
        disabled:opacity-60
        disabled:cursor-not-allowed
        cursor-pointer
      "
                    >
                      {analyzingResumeId === resume.id ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-cyan-400" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <SearchCheckIcon className="h-4 w-4 text-cyan-400" />
                          Check ATS Analysis
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => viewResumeATSAnalysis(resume.id)}
                      className="
                      inline-flex items-center gap-2
                      px-4 py-2
                      rounded-xl
                      bg-gradient-to-r
                      from-orange-600
                      to-orange-800
                      text-white
                      text-sm font-semibold
                      transition-all duration-200
                      active:scale-[0.98]
                      cursor-pointer
                    "
                    >
                      <FileBarChart2 className="h-4 w-4" />
                      View ATS Report
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* VIEW DETAILS MODAL */}
      {selectedResume && (
        <CommonModal
          open={!!selectedResume}
          onClose={() => setSelectedResume(null)}
          title="Resume Profile & Metadata"
          maxWidth="md"
        >
          <div className="space-y-6 text-white max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {/* Header info card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#141414] border border-zinc-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {selectedResume?.title}
                  </h3>
                  <p className="text-zinc-400 text-xs mt-0.5">
                    Uploaded {formatDate(selectedResume?.createdAt)}
                  </p>
                </div>
              </div>
              {/* {selectedResume?.score && ( */}
              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="text-zinc-400 text-xs">AI Evaluation:</span>
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${getScoreColor(selectedResume?.score)}`}
                >
                  {selectedResume?.atsScore ? (
                    <>
                      <Award className="w-4 h-4" />
                      <span>{selectedResume?.atsScore}/100 ATS Score</span>
                    </>
                  ) : (
                    "Pending ATS "
                  )}
                </div>
              </div>
              {/* )} */}
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Contact details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Candidate Contact
                </h4>

                <div className="space-y-3 bg-[#111] p-4 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4.5 h-4.5 text-orange-400 shrink-0" />
                    <div>
                      <p className="text-[10px] text-zinc-500 uppercase">
                        Name
                      </p>
                      <p className="font-semibold text-zinc-200">
                        {selectedResume?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm border-t border-zinc-800/60 pt-2.5">
                    <Mail className="w-4.5 h-4.5 text-orange-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-zinc-500 uppercase">
                        Email
                      </p>
                      <p className="font-semibold text-zinc-200 truncate">
                        {selectedResume?.email}
                      </p>
                    </div>
                  </div>

                  {selectedResume?.phone && (
                    <div className="flex items-center gap-3 text-sm border-t border-zinc-800/60 pt-2.5">
                      <Phone className="w-4.5 h-4.5 text-orange-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase">
                          Phone
                        </p>
                        <p className="font-semibold text-zinc-200">
                          {selectedResume?.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedResume.experience && (
                    <div className="flex items-center gap-3 text-sm border-t border-zinc-800/60 pt-2.5">
                      <Briefcase className="w-4.5 h-4.5 text-orange-400 shrink-0" />
                      <div>
                        <p className="text-[10px] text-zinc-500 uppercase">
                          Experience Level
                        </p>
                        <p className="font-semibold text-zinc-200">
                          {selectedResume?.experience}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Files and Links */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  File & Links
                </h4>

                <div className="space-y-3 bg-[#111] p-4 rounded-xl border border-zinc-800/80">
                  <div className="flex items-center gap-3 text-sm">
                    <FileCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-zinc-500 uppercase">
                        Uploaded Document
                      </p>
                      <Link
                        href={selectedResume?.file}
                        target="_blank"
                        className="w-[95%] truncate font-semibold text-blue-500 block"
                      >
                        {selectedResume?.file || "unknown_file"}
                      </Link>
                      {/* <p className="text-[10px] text-zinc-400">
                        {selectedResume?.file || "unknown_file"}
                      </p> */}
                    </div>
                  </div>

                  {(selectedResume?.linkedin || selectedResume?.portfolio) && (
                    <div className="border-t border-zinc-800/60 pt-2.5 space-y-2">
                      {selectedResume?.linkedin && (
                        <div className="flex items-center gap-3 text-sm">
                          <LinkIcon className="w-4 h-4 text-orange-300 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[10px] text-zinc-500 uppercase font-medium">
                              LinkedIn
                            </p>
                            <a
                              href={selectedResume?.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-orange-400 hover:underline truncate block"
                            >
                              {selectedResume?.linkedin}
                            </a>
                          </div>
                        </div>
                      )}

                      {selectedResume?.portfolio && (
                        <div className="flex items-center gap-3 text-sm pt-1">
                          <LinkIcon className="w-4 h-4 text-orange-300 shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[10px] text-zinc-500 uppercase font-medium">
                              Portfolio
                            </p>
                            <a
                              href={selectedResume?.portfolio}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-orange-400 hover:underline truncate block"
                            >
                              {selectedResume?.portfolio}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills & Notes Row */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Analysis Highlights
              </h4>

              <div className="space-y-4 bg-[#111] p-5 rounded-xl border border-zinc-800/80">
                {selectedResume?.skills && (
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase mb-2 font-semibold">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedResume?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs px-2.5 py-1 rounded bg-zinc-800 text-zinc-200 border border-zinc-700/60 font-medium"
                        >
                          {skill?.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedResume?.notes && (
                  <div className="border-t border-zinc-800/60 pt-4">
                    <p className="text-[10px] text-zinc-500 uppercase mb-1 font-semibold">
                      User Notes
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed italic bg-black/20 p-3 rounded-lg border border-zinc-800/40">
                      "{selectedResume?.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Parsed Text From Resume (pdf)
              </h4>

              <div className="space-y-4 bg-[#111] p-5 rounded-xl border border-zinc-800/80">
                <p className="text-sm text-zinc-300 leading-relaxed italic bg-black/20 p-3 rounded-lg border border-zinc-800/40">
                  "{selectedResume?.parsedText || "No parsed text found"}"
                </p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-end pt-4 border-t border-zinc-800 mt-6">
            <button
              type="button"
              onClick={() => setSelectedResume(null)}
              className="px-6 h-[40px] rounded-lg text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors focus:outline-none"
            >
              Close Profile
            </button>
          </div>
        </CommonModal>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {resumeToDelete && (
        <CommonModal
          open={!!resumeToDelete}
          onClose={() => setResumeToDelete(null)}
          title="Delete Resume Confirmation"
          maxWidth="xs"
        >
          <div className="text-center p-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 mb-4 animate-pulse">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">
              Are you absolutely sure?
            </h3>
            <p className="text-xs text-zinc-400 mt-2">
              This will permanently delete the resume{" "}
              <strong className="text-zinc-200">
                "{resumeToDelete.title}"
              </strong>{" "}
              and its calculated metrics. This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setResumeToDelete(null)}
                className="px-4 h-9 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all border border-transparent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleConfirmDelete(resumeToDelete?.id)}
                className="px-4 h-9 rounded-lg text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-all border border-red-500"
              >
                {deleteResumeLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  "Confirm Delete"
                )}
              </button>
            </div>
          </div>
        </CommonModal>
      )}
    </CardWrp>
  );
};

export default ResumeHistory;
