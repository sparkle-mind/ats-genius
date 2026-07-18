import * as yup from "yup";

export const jobSchema = yup.object({
  companyName: yup.string().required("Company name is required").max(255),

  jobTitle: yup.string().required("Job title is required").max(255),

  role: yup.string().max(255).nullable(),

  location: yup.string().required("Location is required").max(255),

  experience: yup
    .string()
    .oneOf([
      "Entry Level (0-2 years)",
      "Mid Level (3-5 years)",
      "Senior Level (5-8 years)",
      "Expert (8+ years)",
    ])
    .required(),

  jobType: yup
    .string()
    .oneOf(["FullTime", "PartTime", "Contract", "Freelance", "Internship"])
    .required(),

  workMode: yup.string().oneOf(["Remote", "Hybrid", "Onsite"]).required(),

  platform: yup.string().required("Platform is required").max(100),

  source: yup.string().max(100).nullable(),

  jobUrl: yup.string().url("Invalid job URL").nullable(),

  companyWebsite: yup.string().url("Invalid company website").nullable(),

  recruiterName: yup.string().max(255).nullable(),

  recruiterEmail: yup.string().email("Invalid recruiter email").nullable(),

  expectedSalary: yup.number().min(0).nullable(),

  offeredSalary: yup.number().min(0).nullable(),

  currency: yup.string().default("INR"),

  applicationDate: yup.date().nullable(),

  // interviewDate: yup.date().nullable(),

  // followUpDate: yup.date().nullable(),

  status: yup
    .string()
    .oneOf([
      "saved",
      "applied",
      "interview",
      "offer",
      "rejected",
      "screening",
      "withdrawn",
      "joined",
    ])
    .default("saved"),

  priority: yup.string().oneOf(["LOW", "MEDIUM", "HIGH"]).default("MEDIUM"),

  jobDescription: yup.string().nullable(),

  note: yup.string().nullable(),

  feedback: yup.string().nullable(),
});
