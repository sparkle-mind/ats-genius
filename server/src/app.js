import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/upload.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import jobRoutes from "./routes/job.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import atsRoutes from "./routes/ats.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
); // >>>> it allows the frontend to make requests to the backend
app.use(express.json()); // >>>> it parse the incoming json data from the body of the request
app.use(cookieParser()); // >>> it helps to read the cookies from the browser
app.use(express.static("public")); // >>> it serves the static files from the public folder

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", resumeRoutes);
app.use("/api", jobRoutes);
app.use("/api", interviewRoutes);
app.use("/api/ats", atsRoutes);
app.use("/api/notifications", notificationRoutes);

// Debug Route - just for checking the request object
app.get("/debug", (req, res) => {
  res.json({
    method: req.method,
    url: req.url,
    path: req.path,
    query: req.query,
    params: req.params,
    body: req.body,
    headers: req.headers,
    ip: req.ip,
    protocol: req.protocol,
    hostname: req.hostname,
    userAgent: req.headers["user-agent"],
  });
});

export default app;

// https://console.neon.tech/app/org-frosty-waterfall-64292337/projects?modal=create_project
