import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", fullWidth, className, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6B5C] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
          {
            "bg-[#0B6B5C] text-white hover:bg-[#095A4C] active:scale-95":
              variant === "primary",
            "bg-[#F7FAF9] text-[#0B6B5C] border-2 border-[#0B6B5C] hover:bg-[#E8F0ED]":
              variant === "secondary",
            "text-[#0B6B5C] hover:bg-[#E8F0ED]": variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
