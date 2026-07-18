import express from "express";
import upload from "../middlewares/multer.js";
import { uploadFile } from "../controllers/upload.controller.js";
import { uploadResumeFile } from "../controllers/upload-resume.controller.js";

const router = express.Router();
// router.method("/path", middleware,Controller);

router.post("/upload", upload.single("avatar"), uploadFile);
router.post("/upload-resume", upload.single("resume"), uploadResumeFile);

export default router;
