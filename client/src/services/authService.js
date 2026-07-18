import api from "@/lib/axios";

// Register
export const registerUserAPI = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// Login
export const loginUserAPI = async (userData) => {
  const res = await api.post("/auth/login", userData);
  return res.data;
};
// Me
export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data.user;
};
// Logout
export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

// forgot password
export const forgotPasswordAPI = async (email) => {
  const res = await api.post(`/auth/forgot-password`, { email });
  return res.data;
};

// reset password
export const resetPasswordAPI = async ({ token, password }) => {
  const res = await api.post(`/auth/reset-password/${token}`, {
    password,
  });

  return res.data;
};

// change  password
export const changePasswordAPI = async ({ currentPassword, newPassword }) => {
  const res = await api.post(`/auth/change-password`, {
    currentPassword,
    newPassword,
  });

  return res.data;
};
