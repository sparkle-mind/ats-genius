"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Back = ({ text }) => {
  const route = useRouter();

  const handleBack = () => route.back();
  return (
    <div
      className="cursor-pointer w-max p-1 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200 mb-5"
      onClick={handleBack}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">{text || "Back"} </span>
    </div>
  );
};

export default Back;
