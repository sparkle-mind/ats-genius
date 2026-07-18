import prisma from "../db/prisma.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notifications",
    });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await prisma.notification.count({
      where: { userId: req.user.id, isRead: false },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Failed to count notifications" });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await prisma.notification.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });
    if (!notification) return res.status(404).json({ error: "Not found" });

    const updated = await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true, readAt: new Date() },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to mark as read" });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user.id, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark all as read" });
  }
};
