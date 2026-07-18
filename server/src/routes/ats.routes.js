import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { analyzeResume } from "../controllers/ats.controller.js";

const router = express.Router();

router.post("/analyze-resume/:resumeId", protect, analyzeResume);

export default router;
