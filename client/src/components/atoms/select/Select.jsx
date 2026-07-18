"use client";
import React from "react";

const Select = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
}) => {
  return (
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`${className} w-full h-[44px] bg-white/[0.04] border border-[var(--color-border)] rounded-[25px] text-sm text-[var(--color-text-primary)] focus:outline-none focus:bg-white/[0.06] transition-all duration-200 px-3 appearance-none`}
        style={{
          borderColor: "#374151",
          outlineColor: "transparent",
        }}
        onFocus={(e) =>
          (e.target.style.borderColor = "var(--color-orange-light)")
        }
        onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
      >
        <option
          value=""
          disabled
          style={{
            backgroundColor: "#111111",
            color: "#9ca3af",
          }}
        >
          {placeholder}
        </option>

        {options.map((item) => (
          <option
            key={typeof item === "object" ? item.value : item}
            value={typeof item === "object" ? item.value : item}
            style={{
              backgroundColor: "#111111",
              color: "#ffffff",
            }}
          >
            {typeof item === "object" ? item.label : item}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
};

export default Select;
