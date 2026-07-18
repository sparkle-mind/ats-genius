"use client";
import Link from "next/link";
const SecondaryButton = ({
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
      ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
      : "text-[14px] bg-white text-black hover:bg-gray-300 active:scale-[0.97] cursor-pointer";

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

export default SecondaryButton;
