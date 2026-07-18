import api from "@/lib/axios";

// Base URL is already /api — no /api prefix needed here

// ========== NOTIFICATIONS ==========
export const getUnreadCount = async () => {
  const { data } = await api.get("/notifications/unread-count");
  return data; // { count: number }
};

export const fetchNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data;
};

export const markAsRead = async (id) => {
  const { data } = await api.put(`/notifications/${id}/read`);
  return data;
};

export const markAllAsRead = async () => {
  const { data } = await api.put("/notifications/read-all");
  return data;
};
