"use client";
import * as React from "react";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditIcon, MapPin, Trash2 } from "lucide-react";
import CardWrp from "./CardWrp";
import Select from "./atoms/select/Select";
import EditJobModal from "./EditJobModal";
import DeleteJobModal from "./DeleteJobModal";
import Link from "next/link";
import LoadingWrpNew from "./common/LoadingWrpNew";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deleteJobAPI,
  getJobsAPI,
  updateJobStatusAPI,
} from "@/services/jobService";

const options = ["edit", "delete"];

const ApplicationBoard = ({ columns }) => {
  const queryClient = useQueryClient();
  const [view, setView] = useState("board");
  const STATUS = [
    "saved",
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
    "withdrawn",
    "joined",
  ];

  // ======================
  // FETCH JOBS (SINGLE SOURCE OF TRUTH)
  // ======================
  const {
    data: jobs = [],
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobsAPI,
  });

  // ======================
  // MODALS STATE
  // ======================
  const [editJobID, setEditJobID] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // MENU
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // ======================
  // STATUS UPDATE (OPTIMISTIC)
  // ======================
  const { mutate: updateStatus } = useMutation({
    mutationFn: updateJobStatusAPI,

    onMutate: async ({ jobId, status }) => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      const previousJobs = queryClient.getQueryData(["jobs"]);

      queryClient.setQueryData(["jobs"], (old = []) =>
        old.map((job) => (job.id === jobId ? { ...job, status } : job)),
      );

      return { previousJobs };
    },

    onSuccess: (_, variables) => {
      toast.success(`Status updated to "${variables.status}"`);
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },

    onError: (err, variables, context) => {
      queryClient.setQueryData(["jobs"], context?.previousJobs);

      toast.error(err?.response?.data?.message || "Failed to update status");
    },
  });

  const handleChangeStatus = (jobId, newStatus) => {
    updateStatus({ jobId, status: newStatus });
  };

  // ======================
  // MENU HANDLERS
  // ======================
  const handleClick = (event, jobId) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedJobId(jobId);
  };

  const handleClose = () => setAnchorEl(null);

  // ======================
  // MODALS
  // ======================
  const handleEditModalOpen = (jobId) => {
    setEditJobID(jobId);
    setIsEditModalOpen(true);
    handleClose();
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditJobID(null);
  };
  // ======================
  // DELETE JOB BY ID
  // ======================
  const { mutate: deleteJob } = useMutation({
    mutationFn: deleteJobAPI,
    onSuccess: () => {
      toast.success(`Job deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["jobs"], exact: false });
    },

    onError: (err) => {
      toast.error(err.message || "Failed to update status");
    },
  });
  const handleDeleteJob = (jobId) => {
    deleteJob(jobId);
    handleClose();
  };

  const handleDeleteConfirm = (jobId) => {
    queryClient.setQueryData(["jobs"], (old = []) =>
      old.filter((job) => job.id !== jobId),
    );

    setIsDeleteModalOpen(false);
    setSelectedJobId(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedJobId(null);
  };

  // ======================
  // LOADING / ERROR
  // ======================
  if (jobsLoading) return <LoadingWrpNew />;

  if (jobsError)
    return (
      <div className="text-white text-2xl">
        {jobsError.message || "Something went wrong"}
      </div>
    );

  // ======================
  // RENDER
  // ======================
  return (
    <>
      <div className="flex justify-end  gap-2">
        <button
          onClick={() => setView("board")}
          className={`px-4 py-2 rounded-[12px] ${
            view === "board"
              ? "!bg-[var(--color-white)] text-black"
              : "bg-white/10 text-white"
          }`}
        >
          Board View
        </button>

        <button
          onClick={() => setView("table")}
          className={`px-4 py-2 rounded-[12px] ${
            view === "table"
              ? "!bg-[var(--color-white)] text-black"
              : "bg-white/10 text-white"
          }`}
        >
          Table View
        </button>
      </div>
      {view === "board" && (
        <CardWrp>
          <h2 className="text-lg font-bold text-white mb-5">
            Application Board
          </h2>

          <div className="flex gap-4 overflow-x-auto w-full">
            {columns.map((col) => {
              const ColIcon = col.icon;

              const colJobs = jobs.filter((job) => job.status === col.id);

              return (
                <div
                  key={col.id}
                  className="flex-shrink-0 w-[310px] rounded-xl"
                >
                  <div className="flex flex-col gap-5">
                    {/* HEADER */}
                    <div
                      className={`flex items-center justify-between px-3 py-2 rounded-xl border ${col.border} ${col.bg}`}
                    >
                      <div className="flex items-center gap-2">
                        <ColIcon className={`w-4 h-4 ${col.color}`} />
                        <span className={`text-sm font-bold ${col.color}`}>
                          {col.label}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full bg-black/20 ${col.color}`}
                      >
                        {colJobs.length}
                      </span>
                    </div>

                    {/* JOBS */}
                    <div className="flex flex-col gap-4 min-h-[120px]">
                      {colJobs.map((job) => (
                        <div
                          key={job.id}
                          className="glass-card rounded-xl p-4 flex flex-col gap-3"
                        >
                          {/* TOP */}
                          <div className="flex items-start justify-between gap-2 pl-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                                <span className="text-white text-xs font-bold">
                                  {job?.companyName?.slice(0, 1) || "?"}
                                </span>
                              </div>

                              <span className="text-white text-sm font-bold">
                                {job?.companyName || "Unknown"}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Select
                                value={job.status}
                                onChange={(e) =>
                                  handleChangeStatus(job.id, e.target.value)
                                }
                                options={STATUS}
                                className="!w-[100px] !h-[30px]"
                              />

                              <IconButton
                                onClick={(e) => handleClick(e, job.id)}
                              >
                                <MoreVertIcon sx={{ color: "#fff" }} />
                              </IconButton>
                            </div>
                          </div>

                          {/* ROLE */}
                          <p className="text-white text-sm pl-6">
                            {job?.role || "-"}
                          </p>

                          {/* LOCATION */}
                          <div className="pl-6 text-xs text-white">
                            <MapPin className="w-3 h-3 inline mr-1" />
                            {job?.location || "-"}
                          </div>

                          {/* VIEW */}
                          <Link
                            href={`/job-tracker/${job.id}`}
                            className="px-4 py-2 text-center border border-dashed border-green-500/50 w-full rounded-full text-white text-xs font-bold"
                          >
                            View Details
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {jobs.length === 0 && (
            <div className="text-center py-10 text-white/60">
              No applications found
            </div>
          )}
        </CardWrp>
      )}
      {view === "table" && (
        <CardWrp>
          <h2 className="text-lg font-bold text-white mb-5">
            Applications Table
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-white">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4">Company</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="md:p-4 p-2 md:min-w-[300px] min-w-[200px]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <span className="text-xs font-bold">
                            {job?.companyName?.slice(0, 1) || "?"}
                          </span>
                        </div>

                        {job?.companyName || "Unknown"}
                      </div>
                    </td>

                    <td className="md:p-4 p-2 min-w-[200px]">{job?.role || "-"}</td>

                    <td className="md:p-4 p-2 min-w-[200px]">{job?.location || "-"}</td>

                    <td className="md:p-4 p-2 min-w-[140px]">
                      <Select
                        value={job.status}
                        onChange={(e) =>
                          handleChangeStatus(job.id, e.target.value)
                        }
                        options={STATUS}
                        // className="!w-[120px]"
                      />
                    </td>

                    <td className="md:p-4 p-2">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/job-tracker/${job.id}`}
                          className="px-3 py-1 rounded-full border border-green-500/50 text-xs"
                        >
                          View
                        </Link>

                        <IconButton onClick={(e) => handleClick(e, job.id)}>
                          <MoreVertIcon sx={{ color: "#fff" }} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {jobs.length === 0 && (
              <div className="text-center py-10 text-white/60">
                No applications found
              </div>
            )}
          </div>
        </CardWrp>
      )}
      {/* MENU */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              if (option === "edit") {
                handleEditModalOpen(selectedJobId);
              } else {
                handleDeleteJob(selectedJobId);
              }
            }}
          >
            {option === "edit" ? (
              <>
                <EditIcon size={20} /> Edit
              </>
            ) : (
              <>
                <Trash2 size={20} /> Delete
              </>
            )}
          </MenuItem>
        ))}
      </Menu>

      {/* MODALS */}
      <EditJobModal
        open={isEditModalOpen}
        onClose={handleEditModalClose}
        jobId={editJobID}
      />

      <DeleteJobModal
        open={isDeleteModalOpen}
        onClose={handleDeleteModalClose}
        jobId={selectedJobId}
        onDelete={() => handleDeleteConfirm(selectedJobId)}
      />
    </>
  );
};

export default ApplicationBoard;
