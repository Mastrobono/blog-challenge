import React from "react";
import { clsx } from "clsx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "secondary";
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center text-sm-semibold px-2 py-1";

    const variantClasses = clsx({
      // Default variant - typically used on cards
      "bg-primary-lime text-neutral-black": variant === "default",
      // Primary variant
      "bg-brand-indigo text-neutral-white": variant === "primary",
      // Secondary variant
      "bg-neutral-dark-gray text-neutral-white": variant === "secondary",
    });

    return (
      <span
        ref={ref}
        className={clsx(baseClasses, variantClasses, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

