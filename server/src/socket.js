import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import prisma from "./db/prisma.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "https://careertrackerai.vercel.app/",
      credentials: true,
    },
  });

  // Socket Authentication Middleware
  io.use(async (socket, next) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers.cookie || "");

      const token = cookies.accessToken;

      if (!token) {
        return next(new Error("Unauthorized: Missing token"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
        select: {
          id: true,
          email: true,
          fullName: true,
        },
      });

      if (!user) {
        return next(new Error("User not found"));
      }

      socket.user = user;

      next();
    } catch (error) {
      console.error("Socket auth error:", error.message);
      next(new Error("Unauthorized"));
    }
  });

  // Connection Handler
  io.on("connection", (socket) => {
    const userId = socket.user.id;

    console.log(`✅ Socket connected: ${socket.user.email}`);

    socket.join(`user:${userId}`);

    socket.on("disconnect", (reason) => {
      console.log(`❌ Socket disconnected ${userId}:`, reason);
    });
  });

  return io;
};

// Emit notification to user
export const emitToUser = (userId, event, payload) => {
  if (!io) {
    console.warn("Socket.IO not initialized");
    return;
  }

  io.to(`user:${userId}`).emit(event, payload);
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized");
  }

  return io;
};
