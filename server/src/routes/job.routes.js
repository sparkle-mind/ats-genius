import express from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
  updateNextAction,
} from "../controllers/job.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

//  Job Creation
router.post("/job", protect, createJob);

// // Get all jobs of a user
router.get("/job", protect, getAllJobs);

// // Get single job by id
router.get("/job/:id", protect, getJobById);

// Update a job
router.patch("/job/:id", protect, updateJob);

// Delete a job
router.delete("/job/:id", protect, deleteJob);

// update the completed status
router.patch("/next-action/:actionId", protect, updateNextAction);

export default router;
