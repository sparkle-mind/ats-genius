import api from "@/lib/axios";

// POST
export const jobCreateAPI = async (jobData) => {
  const res = await api.post("/job", jobData);
  return res.data;
};

// GET
export const getJobsAPI = async () => {
  try {
    const res = await api.get("/job");
    return res.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// GET by ID
export const getJobByIdAPI = async (jobId) => {
  try {
    const res = await api.get(`/job/${jobId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const updateJobStatusAPI = async ({ jobId, status }) => {
  const res = await api.patch(`/job/${jobId}`, {
    status,
  });
  return res.data;
};

// UPDATE/EDIT
export const updateJobAPI = async ({ jobId, data }) => {
  try {
    const res = await api.patch(`/job/${jobId}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

// DELETE
export const deleteJobAPI = async (jobId) => {
  try {
    const res = await api.delete(`/job/${jobId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

// UPDATE Next_actions completed status

export const updateNextActionStatusAPI = async (actionId, data) => {
  try {
    const res = await api.patch(`/next-action/${actionId}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating next action:", error);
    throw error;
  }
};