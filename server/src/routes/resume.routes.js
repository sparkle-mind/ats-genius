import express from "express";
import {
  createResume,
  deleteResume,
  getLatestResume,
  getResumeById,
  getResumes,
} from "../controllers/resumes.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/resume", protect, createResume);
router.get("/resume", protect, getResumes);
router.get("/resume/:resumeId", protect, getResumeById);
router.get("/resume-latest", protect, getLatestResume);
router.delete("/resume/:resumeId", protect, deleteResume);

export default router;
