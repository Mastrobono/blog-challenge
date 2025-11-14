"use client";

import React from "react";
import { clsx } from "clsx";

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "dark" | "light";
  arrowColor?: string;
  onClick?: () => void;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children = "Read", variant = "light", arrowColor, onClick, ...props }, ref) => {
    // Determine arrow color based on variant if not explicitly provided
    const getArrowColor = () => {
      if (arrowColor) return arrowColor;
      return variant === "dark" ? "#D8F34E" : "#9C73F7"; // primary-lime for dark, arrow-purple for light
    };

    const arrowColorValue = getArrowColor();

    return (
      <button
        type="button"
        ref={ref}
        onClick={onClick}
        className={clsx(
          "inline-flex items-center gap-2",
          "text-base-semibold",
          "cursor-pointer",
          "transition-opacity duration-200",
          "hover:opacity-80",
          "focus:outline-none",
          {
            "text-neutral-white": variant === "dark",
            "text-neutral-black": variant === "light",
          },
          className
        )}
        {...props}
      >
        <span>{children}</span>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <path
            d="M17.25 8.25L21 12M21 12L17.25 15.75M21 12L3 12"
            stroke={arrowColorValue}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }
);

ActionButton.displayName = "ActionButton";

export default ActionButton;
