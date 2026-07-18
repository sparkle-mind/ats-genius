"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  DollarSign,
  Globe,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle,
  Sparkles,
  Bookmark,
  Building,
  CheckSquare,
  AlertCircle,
  Clock1,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJobByIdAPI,
  updateNextActionStatusAPI,
} from "@/services/jobService";
import LoadingWrpNew from "@/components/common/LoadingWrpNew";
import Back from "@/components/common/Back";
import { Checkbox, FormControlLabel } from "@mui/material";
import toast from "react-hot-toast";

const JobDetailClient = ({ id }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const queryClient = useQueryClient();

  const toggleChecklistItem = (itemId) => {
    setJob((prev) => ({
      ...prev,
      checklists: prev.checklists.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item,
      ),
    }));
  };

  const priorityBadgeStyle = {
    high: "bg-red-500/10 border-red-500/30 text-red-400",
    medium: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    low: "bg-zinc-500/10 border-zinc-500/30 text-zinc-400",
  };
  const statusConfig = {
    applied: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    interview: "bg-orange-400/10 border-orange-400/20 text-orange-400",
    offer: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
    rejected: "bg-red-400/10 border-red-400/20 text-red-400",
    screening: "bg-yellow-400/10 border-yellow-400/20 text-yellow-400",
    withdrawn: "bg-red-400/10 border-red-400/20 text-red-400",
    joined: "bg-green-400/10 border-green-400/20 text-green-400",
  };

  const {
    data: jobData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["job", id],
    queryFn: () => getJobByIdAPI(id),
  });

  const JOBS = jobData?.job;
  const NEXT_ACTIONS = jobData?.job?.nextActions || [];
  console.log("NEXT_ACTIONS", NEXT_ACTIONS);

  // Update next-actions complted status :========

  const { mutate: updateNextAction, isPending: isUpdatingAction } = useMutation(
    {
      mutationFn: ({ actionId, completed }) =>
        updateNextActionStatusAPI(actionId, {
          completed,
        }),

      onSuccess: () => {
        toast.success("Action updated successfully");

        queryClient.invalidateQueries({
          queryKey: ["job", id],
        });
      },

      onError: (error) => {
        toast.error(error?.response?.data?.message || "Error updating action");
      },
    },
  );

  const handleActionToggle = (action) => {
    updateNextAction({
      actionId: action.id,
      completed: !action.completed,
    });
  };

  if (isLoading) return <LoadingWrpNew />;
  if (isError)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400">
          {error.message || "Error loading job details"}
        </p>
      </div>
    );
  return (
    <div className="animate-fade-in-up space-y-6">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between p">
        <Back text="Back to Kanban Board" />
      </div>

      {/* Main Glassmorphic Header Card */}
      <div className="glass-card relative rounded-2xl p-6 md:p-8 overflow-hidden ">
        {/* Glow backdrop decorator */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-orange-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start  gap-4">
            <div className="absolute md:top-[90px] bottom-[-30px] right-8  tracking-tighter font-[900]  md:text-[7rem] text-[4rem] leading-[110%] scale-[1.7] opacity-[0.1] shrink-0">
              {JOBS?.companyName}
            </div>
            <div>
              <div className="flex flex-wrap flex-col  gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {JOBS?.companyName}
                </h1>
                <span className="text-sm text-zinc-400 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  {JOBS?.location}
                </span>
              </div>
              <p className="text-zinc-300 text-lg font-medium mt-1">
                {JOBS?.role}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="badge badge-primary font-semibold text-xs tracking-wide">
                  {JOBS?.jobType}
                </span>
                <span
                  className={`badge border text-xs font-semibold ${priorityBadgeStyle[JOBS.priority]}`}
                >
                  {JOBS?.priority.toUpperCase()} PRIORITY
                </span>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="flex flex-wrap items-center gap-3 border-t border-white/5 pt-4 md:pt-0 md:border-0 shrink-0">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
                Application Status
              </label>
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border mb-2 ${statusConfig[JOBS?.status]} font-bold text-sm`}
              >
                <Clock1 className="w-4 h-4 shrink-0" />
                <span>{JOBS?.status.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Secondary Metadata Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            Salary
          </span>
          <span className="text-white text-base md:text-[16px]  mt-1 truncate">
            Offered : {JOBS?.offeredSalary || "Not Specified"}
          </span>
          <span className="text-white text-base md:text-[16px]  mt-1 truncate">
            Expected : {JOBS?.expectedSalary || "Not Specified"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-orange-400" />
            Application Date
          </span>
          <span className="text-white text-base md:text-lg font-bold mt-2 truncate">
            {JOBS?.applicationDate
              ? JOBS?.applicationDate.slice(0, 10).toUpperCase()
              : "Not Tracked"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            Platform Source
          </span>
          <span className="text-white text-base md:text-lg font-bold mt-2 truncate">
            {JOBS?.platform || "Direct"}
          </span>
        </div>

        <div className="glass-card rounded-xl p-4 flex flex-col justify-between hover:scale-[1.01] transition-all">
          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            Contact Email (Recruiter's)
          </span>
          <Link
            href={JOBS?.recruiterEmail ? `mailto:${JOBS?.recruiterEmail}` : "#"}
            className="text-orange-400 hover:text-orange-300 text-sm md:text-base font-bold mt-2 truncate underline decoration-orange-500/30"
          >
            {JOBS?.recruiterEmail || "No Email Provided"}
          </Link>
        </div>
      </div>

      {/* Main Tabbed Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column - 2/3 Width: Interactive Tabs & Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Custom Tabs Navigation */}
          <div className="flex border-b border-white/5 bg-black/20 p-1.5 rounded-xl gap-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`bg-[var(--color-card)] flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "profile"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Job Profile
            </button>
            <button
              onClick={() => setActiveTab("checklist")}
              className={`bg-[var(--color-card)] flex-1 py-2.5 text-xs md:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                activeTab === "checklist"
                  ? "bg-gradient-to-tr from-orange-500 to-orange-600 text-white shadow-md glow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Notes & Checklist
            </button>
          </div>

          {/* TAB CONTENT: PROFILE */}
          {activeTab === "profile" && (
            <div className="glass-card rounded-xl p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-orange-500" />
                  Job Description
                </h3>
                <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap bg-black/20 p-4 rounded-xl border border-white/5">
                  {JOBS?.jobDescription || "No job description added yet."}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-gradient-bg-card">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-sky-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Original Posting URL
                    </h4>
                    <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">
                      {JOBS?.jobUrl}
                    </p>
                  </div>
                </div>
                <Link
                  href={JOBS?.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <span>Visit Link</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-gradient-bg-card">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-sky-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Company Website
                    </h4>
                    <p className="text-xs text-zinc-500 truncate max-w-[200px] md:max-w-md">
                      {JOBS?.companyWebsite}
                    </p>
                  </div>
                </div>
                <Link
                  href={JOBS?.companyWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 rounded-lg text-xs font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <span>Visit Website</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CHECKLIST & NOTES */}
          {activeTab === "checklist" && (
            <div className="space-y-6">
              {/* Detailed Notes Editor */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-orange-500" />
                    Application Notes
                  </h3>
                </div>

                <div className="text-zinc-300 text-sm leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5 min-h-[80px]">
                  {JOBS?.note || "No notes added yet."}
                </div>
              </div>

              {/* Milestones / Checklist */}
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-orange-500" />
                  Next Steps (Actions)
                </h3>

                {/* Add Quick Checklist Item */}
                <form className="mt-4 flex gap-2 w-full">
                  <div className="mt-5 w-full  border border-white/10 bg-white/5 backdrop-blur-md shadow-lg overflow-hidden">
                    {NEXT_ACTIONS?.map((action) => (
                      <label
                        key={action.id}
                        className="group flex cursor-pointer items-center gap-4 border-b border-white/10 px-5 py-2 transition-all duration-200 last:border-b-0 hover:bg-white/10"
                      >
                        <Checkbox
                          checked={action.completed}
                          disabled={isUpdatingAction}
                          onChange={() => handleActionToggle(action)}
                          sx={{
                            color: "#c7c5c5",
                            "&.Mui-checked": {
                              color: "#22c55e",
                            },
                            "& .MuiSvgIcon-root": {
                              fontSize: 24,
                            },
                          }}
                        />

                        <div className="flex-1">
                          <p
                            className={`text-md font-medium transition-all duration-200 ${
                              action.completed
                                ? "text-gray-400 line-through"
                                : "text-white group-hover:text-green-300"
                            }`}
                          >
                            {action.title}
                          </p>
                        </div>
                      </label>
                    ))}
                    {NEXT_ACTIONS.length <= 0 && (
                      <p className="px-5 py-3 text-center text-zinc-500 text-sm">
                        No actions added yet.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - 1/3 Width: Quick Tips, Priorities & Progress Summary */}
        <div className="space-y-6">
          {/* Pro tips banner */}
          <div className="glass-card rounded-xl p-5 border-l-2 border-l-orange-500 bg-gradient-bg-card space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              Developer Pro-Tip (TODO)
            </h4>
            <p className="text-zinc-400 text-xs leading-relaxed">
              When applying to roles, always follow up with direct hiring
              managers on LinkedIn or via email exactly 5 business days after
              submission. It boosts your call-back rate by 45%!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailClient;
