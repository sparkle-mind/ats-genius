import api from "@/lib/axios";

// POST
export const scheduleInterviewAPI = async (interviewData) => {
  const res = await api.post("/interview", interviewData);
  return res.data;
};

// GET UPCOMING INTERVIEWS
export const getUpcomingInterviewsAPI = async () => {
  try {
    const res = await api.get("/interview/upcoming");
    return res.data;
  } catch (error) {
    console.error("Error fetching upcoming interviews:", error);
    throw error;
  }
};

// GET PAST INTERVIEWS
export const getPastInterviewsAPI = async () => {
  try {
    const res = await api.get("/interview/past");
    return res.data;
  } catch (error) {
    console.error("Error fetching past interviews:", error);
    throw error;
  }
};
// GET PAST INTERVIEW BY ID

export const getInterviewByIdAPI = async (id) => {
  try {
    const res = await api.get(`/interview/past/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching interview by id:", error);
    throw error;
  }
};
// UPDATE PAST INTERVIEW BY ID

export const updateInterviewByIdAPI = async (id, jobData) => {
  try {
    const res = await api.put(`/interview/past/${id}`, jobData);
    return res.data;
  } catch (error) {
    console.error("Error updating interview by id:", error);
    throw error;
  }
};