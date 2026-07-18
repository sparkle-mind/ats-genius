import LoadingWrpNew from "@/components/common/LoadingWrpNew";
import { Loader2 } from "lucide-react";

const loading = ({
  title = "Loading",
  text = "Please wait...",
  height = "400px",
}) => {
  return (
    // <div className={`flex min-h-[${height}] items-center justify-center`}>
    //   <div className="relative flex flex-col items-center">
    //     {/* Glow */}
    //     <div className="absolute h-32 w-32 rounded-full bg-[var(--color-orange-glow)] blur-3xl animate-pulse" />

    //     {/* Spinner Circle */}
    //     <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--color-bg)] backdrop-blur-md">
    //       <Loader2 className="h-10 w-10 animate-spin text-[var(--color-orange)]" />
    //     </div>

    //     {/* Text */}
    //     <div className="mt-6 text-center">
    //       <h3 className="text-xl font-bold text-white tracking-wide">
    //         {title}
    //       </h3>

    //       <p className="mt-2 text-sm text-slate-400">{text}</p>
    //     </div>

    //     {/* Loading Dots */}
    //     <div className="mt-4 flex gap-2">
    //       <span className="h-2 w-2 rounded-full bg-[var(--color-orange)] animate-bounce" />
    //       <span
    //         className="h-2 w-2 rounded-full bg-[var(--color-orange)] animate-bounce"
    //         style={{ animationDelay: "0.15s" }}
    //       />
    //       <span
    //         className="h-2 w-2 rounded-full bg-[var(--color-orange)] animate-bounce"
    //         style={{ animationDelay: "0.3s" }}
    //       />
    //     </div>
    //   </div>
    // </div>
    <div className="flex h-[100dvh] w- items-center justify-center">
      <LoadingWrpNew />
    </div>
  );
};

export default loading;
