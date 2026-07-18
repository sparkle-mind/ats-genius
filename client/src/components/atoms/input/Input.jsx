import React from "react";

const Input = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  icon = null,
  name,
  error,
  ...props
}) => {
  return (
    <>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] pointer-events-none">
            {icon}
          </div>
        )}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-11 bg-white/[0.04] border border-[var(--color-border)] rounded-xl !mb-0 text-sm text-white placeholder-zinc-600 focus:outline-none focus:bg-white/[0.06] transition-all duration-200 ${icon ? "pl-10 pr-3" : "px-3"} ${className}`}
          style={{ outlineColor: "transparent" }}
          onFocus={(e) => (e.target.style.borderColor = "rgba(255,87,34,0.50)")}
          onBlur={(e) => (e.target.style.borderColor = "")}
          {...props}
        />
      </div>
      {error && <p className="!text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default Input;
