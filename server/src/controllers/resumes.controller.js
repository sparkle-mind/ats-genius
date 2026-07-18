import cloudinary from "../config/cloudinary.js";
import prisma from "../db/prisma.js";

// fileResult is stored as String[] where each entry is a JSON-serialized object.
// This helper parses them back into objects on read.
const parseFileResult = (fileResult = []) =>
  fileResult.map((entry) => {
    try {
      return JSON.parse(entry);
    } catch {
      return entry;
    }
  });

export const createResume = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    console.log("createResume body:", JSON.stringify(req.body, null, 2));

    const {
      file,
      parsedText,
      title,
      name,
      email,
      phone,
      skills,
      experience,
      linkedin,
      portfolio,
      notes,
    } = req.body;

    console.log("file object:", JSON.stringify(file, null, 2));
    console.log("file.result:", JSON.stringify(file?.result, null, 2));

    const fileResult = [
      JSON.stringify({ assetID: file?.result?.asset_id ?? "" }),
      JSON.stringify({ bytes: String(file?.result?.bytes ?? "") }),
      JSON.stringify({ format: file?.result?.format ?? "" }),
    ];
    const resume = await prisma.resume.create({
      data: {
        userId: req.user?.id,
        file: file?.url,
        cloudinaryPublicId: file?.public_id,
        fileResult,
        parsedText: parsedText || null,
        title,
        name,
        email,
        phone,
        skills: skills ? skills.split(",").map((s) => s.trim()) : [], // converts comma-separated string into an array
        experience,
        linkedin,
        portfolio,
        notes,
      },
    });

    res.status(200).json({
      message: "Resume uploaded successfully",
    });
  } catch (error) {
    console.error("Error in resumesController:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getResumes = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    const resumes = await prisma.resume.findMany({
      where: { userId: req.user.id },
    });

    const parsed = resumes.map((r) => ({
      ...r,
      fileResult: parseFileResult(r.fileResult),
    }));

    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in getResumes:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }
    const resumeId = Number(req.params.resumeId);
    if (Number.isNaN(resumeId)) {
      return res.status(400).json({ message: "Invalid resume ID" });
    }
    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    if (resume.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized: user not authorized" });
    }
    return res.status(200).json({
      ...resume,
      fileResult: parseFileResult(resume.fileResult),
    });
  } catch (error) {
    console.error("Error in getResumeById:", error);
    res.status(500).json({ message: error.message });
  }
};
export const getLatestResume = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized: user not found" });
    }

    const latestResume = await prisma.resume.findFirst({
      where: { userId: req.user.id },
      orderBy: {
        createdAt: "desc", // newest first
      },
    });

    if (!latestResume) {
      return res.status(404).json({ message: "No resumes found" });
    }

    return res.status(200).json({
      ...latestResume,
      fileResult: parseFileResult(latestResume.fileResult),
    });
  } catch (error) {
    console.error("Error in getLatestResume:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        message: "Unauthorized: User not found",
      });
    }

    const resumeId = Number(req.params.resumeId);

    if (Number.isNaN(resumeId)) {
      return res.status(400).json({
        message: "Invalid resume ID",
      });
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id: resumeId,
        userId: req.user.id,
      },
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    // Delete PDF from Cloudinary
    if (resume.cloudinaryPublicId) {
      let cloudinaryResponse = await cloudinary.uploader.destroy(
        resume.cloudinaryPublicId,
        {
          resource_type: "raw",
        },
      );

      // If not found as raw, try image (because old uploads used auto)
      if (cloudinaryResponse.result === "not found") {
        cloudinaryResponse = await cloudinary.uploader.destroy(
          resume.cloudinaryPublicId,
          {
            resource_type: "image",
          },
        );
      }

      console.log("Cloudinary delete response:", cloudinaryResponse);
    } else {
      console.log("No Cloudinary public_id found");
    }

    // Delete from database
    await prisma.resume.delete({
      where: {
        id: resumeId,
      },
    });

    return res.status(200).json({
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteResume:", error);

    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
