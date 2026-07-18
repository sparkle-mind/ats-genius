"use client";

import { useForm } from "react-hook-form";
import PrimaryButton from "./atoms/buttons/PrimaryButton";
import Input from "./atoms/input/Input";
import CardWrp from "./CardWrp";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { changePasswordAPI } from "@/services/authService";
import toast from "react-hot-toast";

const Passwords = () => {
  const passwordSchema = yup.object({
    currentPassword: yup.string().required("Current password is required"),

    newPassword: yup
      .string()
      .required("New password is required")
      .notOneOf(
        [yup.ref("currentPassword")],
        "New password cannot be the same as current password",
      ),

    confirmNewPassword: yup
      .string()
      .required("Please confirm your new password")
      .oneOf([yup.ref("newPassword")], "Passwords do not match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const { mutate: passwordMutation } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: (data) => changePasswordAPI(data),
    onSuccess: (res) => {
      toast.success(res?.message || "Password changed successfully");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    },
  });

  const onSubmitPasswordForm = (data) => {
    const sendData = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    passwordMutation(sendData);
  };
  return (
    <>
      <div className="flex flex-col gap-6">
        <CardWrp className="mt-0">
          <h2 className="text-base font-bold text-white mb-5">
            Change Password
          </h2>
          <form
            onSubmit={handleSubmit(onSubmitPasswordForm)}
            className="flex flex-col gap-4 max-w-md"
          >
            <div className="my-1 flex flex-col gap-2">
              <label htmlFor="currentPassword">Current Password</label>
              <Input
                id="currentPassword"
                type="text"
                {...register("currentPassword")}
                error={errors?.currentPassword?.message}
                placeholder="********"
                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="my-1 flex flex-col gap-2">
              <label htmlFor="newPassword">New Password</label>
              <Input
                id="newPassword"
                type="text"
                {...register("newPassword")}
                error={errors?.newPassword?.message}
                placeholder="********"
                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="my-1 flex flex-col gap-2">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <Input
                id="confirmNewPassword"
                type="text"
                {...register("confirmNewPassword")}
                error={errors?.confirmNewPassword?.message}
                placeholder="********"
                className="bg-[#111111] border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="pt-1">
              <PrimaryButton type="submit">Update Password</PrimaryButton>
            </div>
          </form>
        </CardWrp>
      </div>
    </>
  );
};

export default Passwords;
