import api from "@/lib/axios";

// GET all users
export const getUsers = async () => {
  const res = await api.get("auth/users");
  return res.data;
};

// update profile
export const updateUser = async (payload) => {
  const res = await api.put(`auth/profile`, payload);
  return res.data;
};
// Delete user (delete account)
export const deleteAccount = async () => {
  try {
    const res = await api.delete("auth/user/delete-account");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
  return res.data;
};
