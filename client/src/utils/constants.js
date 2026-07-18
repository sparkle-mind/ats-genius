export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return (
    Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  );
};

export const JOB_OPTIONS = {
  EXPERIENCE_LEVELS: [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (5-8 years)",
    "Expert (8+ years)",
  ],
  JOB_TYPE: ["FullTime", "PartTime", "Contract", "Freelance", "Internship"],
  WORK_MODE: ["Remote", "Hybrid", "Onsite"],
  PRIORITY: ["LOW", "MEDIUM", "HIGH"],
  JOB_STATUS: [
    "saved",
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
    "withdrawn",
    "joined",
  ],
};

export const INTERVIEW_OPTIONS = {
  STAGE: [
    "phone_screen",
    "technical_interview",
    "behavioral_interview",
    "case_study",
    "final_interview",
    "panel_interview",
    "group_interview",
    "technical_assessment",
  ],
  SCORE: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  RESULT: ["Pending", "Pass", "Fail", "Waiting"],
};
