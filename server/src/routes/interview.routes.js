import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import {
  create,
  getOne,
  getPast,
  getStats,
  getUpcoming,
  update,
} from "../controllers/interview.controller.js";

const router = express.Router();

// /api/interviews
router.post("/interview", protect, create);
router.get("/interview/stats", protect, getStats);
router.get("/interview/upcoming", protect, getUpcoming);
router.get("/interview/past", protect, getPast);
router.get("/interview/past/:id", protect, getOne);
router.put("/interview/past/:id", protect, update);

export default router;
