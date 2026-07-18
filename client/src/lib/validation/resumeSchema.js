import * as yup from "yup";

export const resumeSchema = yup.object().shape({
  // file: yup.mixed().required("File is required"),
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phone: yup.string().required("Phone is required"),
  skills: yup.string().required("Skills is required"),
  experience: yup.string().required("Experience is required"),
  linkedin: yup.string().required("LinkedIn is required"),
  portfolio: yup.string().required("Portfolio is required"),
  notes: yup.string().required("Notes is required"),
});
