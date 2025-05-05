import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  loading?: boolean;
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
}

export const Button = ({
  children,
  loading = false,
  disabled = false,
  type = "button",
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  const baseStyle = "px-4 py-2 rounded font-medium transition text-white";
  const width = fullWidth ? "w-full" : "w-fit";

  const variants: Record<string, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300",
    danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-300",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      role="button"
      className={clsx(baseStyle, variants[variant], width, "disabled:cursor-not-allowed", className)}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
