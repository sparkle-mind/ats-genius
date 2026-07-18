import React from "react";

const Textarea = ({
  name,
  value,
  onChange,
  placeholder = "",
  className = "",
  rows = 4,
  ...props
}) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${className} w-full bg-white/[0.04] border border-[var(--color-border)] rounded-[15px] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:bg-white/[0.06] transition-all duration-200 p-3 min-h-[100px] resize-y`}
      style={{
        borderColor: "#374151",
        outlineColor: "transparent",
      }}
      onFocus={(e) =>
        (e.target.style.borderColor = "var(--color-orange-light)")
      }
      onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
      {...props}
    />
  );
};

export default Textarea;
