import * as yup from "yup";

export const interviewSchema = yup.object({
  applicationId: yup
    .mixed()
    .test(
      "is-valid-id",
      "Application ID is required",
      (value) => value !== null && value !== undefined && value !== "",
    ),

  stage: yup
    .string()
    .required("Interview stage is required")
    .max(100, "Stage cannot exceed 100 characters"),

  scheduledDate: yup.date().nullable().required("Scheduled date is required"),

  interviewer: yup
    .string()
    .nullable()
    .max(100, "Interviewer name cannot exceed 100 characters"),

  duration: yup
    .number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .nullable()
    .positive("Duration must be greater than 0")
    .integer("Duration must be a whole number"),

  prepLink: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .url("Enter a valid URL"),

  notes: yup
    .string()
    .nullable()
    .max(1000, "Notes cannot exceed 1000 characters"),
});

