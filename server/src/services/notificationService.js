import prisma from "../db/prisma.js";
import { emitToUser } from "../socket.js";

export const createAndEmitNotification = async (
  userId,
  type,
  title,
  message,
  metadata = {},
) => {
  // 1. Save to DB
  const notification = await prisma.notification.create({
    data: {
      userId,
      type,
      title,
      message,
      metadata,
    },
  });

  // 2. Emit via Socket.IO instantly
  emitToUser(userId, "new_notification", notification);

  // 3. Emit updated unread count
  const unreadCount = await prisma.notification.count({
    where: { userId, isRead: false },
  });
  emitToUser(userId, "unread_count_updated", { count: unreadCount });

  return notification;
};
