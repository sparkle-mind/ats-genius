"use client";
import Link from "next/link";

const DangerButton = ({
  children,
  onClick,
  href,
  type = "button",
  disabled = false,
  className = "",
  loading = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-5 h-9 sm:h-11 rounded-md text-[14px] font-[600] transition-all duration-200 focus:outline-none select-none";

  const styles =
    disabled || loading
      ? "bg-red-700 text-white cursor-not-allowed"
      : " bg-red-700 uppercase text-white hover:bg-red-500 active:scale-[0.97] cursor-pointer";

  const content = loading ? "Loading..." : children;

  // Link mode
  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${styles} ${className}`}>
        {content}
      </Link>
    );
  }

  // Button mode
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${styles} ${className}`}
    >
      {content}
    </button>
  );
};

export default DangerButton;
