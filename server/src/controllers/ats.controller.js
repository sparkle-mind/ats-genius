// import prisma from "../db/prisma.js";
// import { analyzeResumeATS } from "../utils/analyzeResume.js";

// export const analyzeResume = async (req, res) => {
//   try {
//     const resumeId = Number(req.params.resumeId);

//     const resume = await prisma.resume.findUnique({
//       where: {
//         id: resumeId,
//         userId: req.user.id,
//       },
//     });

//     if (!resume) {
//       return res.status(404).json({
//         message: "Resume not found",
//       });
//     }

//     const analysisText = await analyzeResumeATS(resume.parsedText);

//     const analysis = JSON.parse(analysisText);

//     await prisma.resume.update({
//       where: {
//         id: resumeId,
//         userId: req.user.id,
//       },
//       data: {
//         atsScore: analysis.score,
//         atsAnalysis: analysis,
//       },
//     });

//     return res.json({
//       score: analysis.score,
//       analysis,
//     });
//   } catch (error) {
//     console.error("Error in analyzeResume", error);

//     const isUnavailable = 
//       error?.status === 503 || 
//       error?.error?.code === 503 || 
//       error?.status === "UNAVAILABLE" || 
//       error?.error?.status === "UNAVAILABLE";

//     if (isUnavailable) {
//       return res.status(503).json({
//         message: "The AI model is currently experiencing high demand. Please try again later.",
//       });
//     }

//     return res.status(500).json({
//       message: error.message || "An error occurred while analyzing the resume.",
//     });
//   }
// };

import prisma from "../db/prisma.js";
import { analyzeResumeATS } from "../utils/analyzeResume.js";

export const analyzeResume = async (
  req,
  res
) => {
  try {
    const resumeId = Number(
      req.params.resumeId
    );

    if (Number.isNaN(resumeId)) {
      return res.status(400).json({
        message: "Invalid Resume ID",
      });
    }

    const resume =
      await prisma.resume.findUnique({
        where: {
          id: resumeId,
        },
      });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (!resume.parsedText) {
      return res.status(400).json({
        message:
          "Resume text not available",
      });
    }

    // Return cached result if already analyzed
    if (
      resume.atsScore &&
      resume.atsAnalysis
    ) {
      return res.json({
        cached: true,
        score: resume.atsScore,
        analysis: resume.atsAnalysis,
      });
    }

    const analysis =
      await analyzeResumeATS(
        resume.parsedText
      );

    await prisma.resume.update({
      where: {
        id: resumeId,
      },
      data: {
        atsScore: analysis.score,
        atsAnalysis: analysis,
        isAtsAvailable: true,
      },
    });

    return res.json({
      cached: false,
      score: analysis.score,
      analysis,
    });
  } catch (error) {
    console.error(
      "Error in analyzeResume:",
      error
    );

    return res.status(500).json({
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};
