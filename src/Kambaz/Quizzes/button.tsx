import React from "react";

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  variant = "primary",
  size = "medium",
  className = "",
}) => {
  // Determine styles based on the variant and size props
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-md",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };