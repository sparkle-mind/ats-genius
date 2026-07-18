import api from "@/lib/axios";

// POST
export const uploadResumeAPI = async (resumeData) => {
  const res = await api.post("/resume", resumeData);
  return res.data;
};

// GET
export const getResumesAPI = async () => {
  const res = await api.get("/resume");
  return res.data;
};

// GET RESUME BY ID
export const getResumeByIdAPI = async (resumeId) => {
  const res = await api.get(`/resume/${resumeId}`);
  return res.data;
};
export const getLatestResumeAPI = async () => {
  try {
    const res = await api.get(`/resume-latest`);
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    console.error("Error in getLatestResumeAPI:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching the latest resume.",
    );
  }
};
// DELETE
export const deleteResumeAPI = async (resumeId) => {
  const res = await api.delete(`/resume/${resumeId}`);
  return res.data;
};


//  CHECK ATS (RESUME AI ANALYSIS) API
export const analyzeResumeAPI = async (resumeId) => {
  try {
    const res = await api.post(`/ats/analyze-resume/${resumeId}`);
    return res.data;
  } catch (error) {
    console.error("Error in analyzeResumeAPI:", error);
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while analyzing the resume.",
    );
  }
};
