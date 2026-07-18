import React from "react";

const LoadingWrpNew = ({ text = "Loading...", ...props }) => {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 w-full py-8 px-4"
      {...props}
    >
      <div className="relative flex items-center justify-center h-14 w-14">
        {/* Glow behind loader */}
        <div className="absolute inset-0 rounded-full bg-[var(--color-orange-dim)] blur-md animate-pulse" />
        
        {/* Concentric rotating dash ring */}
        <div className="absolute inset-0 rounded-full border border-[var(--color-border)]" />
        <div className="absolute inset-0 rounded-full border-t border-r border-orange-500 animate-spin" style={{ animationDuration: "1s" }} />
        
        {/* Inner reverse rotating dash ring */}
        <div className="absolute inset-2 rounded-full border border-dashed border-orange-300/20 animate-spin" style={{ animationDuration: "4s", animationDirection: "reverse" }} />
        
        {/* Center glowing dot */}
        <div className="absolute w-2 h-2 rounded-full bg-orange-500 animate-ping" />
      </div>
      
      {text && (
        <span className="text-sm font-semibold tracking-wide text-[var(--color-text-secondary)] flex items-center gap-1.5 animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingWrpNew;
