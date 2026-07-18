"use client";
import DangerButton from "@/components/atoms/buttons/DangerButton";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import Colors from "@/components/atoms/colors/Colors";
import CustomDateTimePicker from "@/components/atoms/date-picker/CustomDateTimePicker";
import Input from "@/components/atoms/input/Input";
import Select from "@/components/atoms/select/Select";
import Textarea from "@/components/atoms/textarea/Textarea";
import dayjs from "dayjs";
import { Lock } from "lucide-react";
import React, { useState } from "react";

const page = () => {
  const [formData, setFormData] = useState({ password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const EXPERIENCE_LEVELS = [
    "Entry Level (0-2 years)",
    "Mid Level (3-5 years)",
    "Senior Level (5-8 years)",
    "Expert (8+ years)",
  ];
  ``;

  const [dateValue, setDateValue] = useState(dayjs("2026-06-20T10:00:00"));
  const onChangeDate = (newValue) => {
    setDateValue(newValue);
  };
  return (
    <div className="p-5 flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="my-5">
        <CustomDateTimePicker
          label="Application Date"
          value={dateValue}
          onChange={onChangeDate}
          error={"static error"}
        />
      </div>

      <Input
        type="text"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Enter password"
        icon={<Lock size={16} />}
        className="mb-4 !w-[250px]"
      />
      <br />
      <Select
        name="experience"
        value={formData.experience}
        onChange={handleInputChange}
        options={EXPERIENCE_LEVELS}
        placeholder="Select"
        className={"!w-[250px]"}
      />
      <br />
      <br />
      <Textarea
        name="notes"
        // value={"write something"}
        onChange={handleInputChange}
        placeholder="Any specific instructions or focus areas for the analysis..."
        className="!w-[300px]"
      />
      <br />

      <div className="flex gap-4 mb-4">
        <PrimaryButton onClick={() => console.log(formData)}>
          Create Account
        </PrimaryButton>
        <PrimaryButton disabled>Submit</PrimaryButton>
        <PrimaryButton loading>Processing</PrimaryButton>
        <PrimaryButton href="/login">Go to Login</PrimaryButton>
      </div>
      <div className="flex gap-4 mb-4">
        <SecondaryButton onClick={() => console.log("Secondary clicked")}>
          Secondary Action
        </SecondaryButton>
        <SecondaryButton disabled>Disabled</SecondaryButton>
      </div>
      <div className="flex gap-4 mb-4">
        <DangerButton onClick={() => console.log("Danger clicked")}>
          Delete Account
        </DangerButton>
      </div>
      <div className="flex gap-4">
        <Colors />
      </div>
    </div>
  );
};

export default page;
