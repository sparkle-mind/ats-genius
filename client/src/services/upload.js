import api from "@/lib/axios";

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.post("/upload", formData);

  return data; // expected: { url: "..." }
};
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const { data } = await api.post("/upload-resume", formData);

  return data; // expected: { url: "..." }
};
