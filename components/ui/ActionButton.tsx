"use client";

import React, { useRef, useEffect } from "react";
import { clsx } from "clsx";
import { gsap } from "gsap";

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "dark" | "light";
  arrowColor?: string;
  onClick?: () => void;
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, children = "Read", variant = "light", arrowColor, onClick, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const arrowRef = useRef<SVGSVGElement>(null);

    // Combine refs
    const combinedRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref]
    );

    // Animate arrow on hover
    useEffect(() => {
      const button = buttonRef.current;
      const arrow = arrowRef.current;
      if (!button || !arrow) return;

      const handleMouseEnter = () => {
        gsap.to(arrow, {
          rotation: -25,
          duration: 0.3,
          ease: "power2.out",
          transformOrigin: "center center",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(arrow, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }, []);

    // Determine arrow color based on variant if not explicitly provided
    // Using token values from CSS variables
    const getArrowColor = () => {
      if (arrowColor) return arrowColor;
      // Using token values: primary-lime (#D8F34E) for dark, arrow-purple (#9C73F7) for light
      return variant === "dark" 
        ? "var(--color-primary-lime)" 
        : "var(--color-arrow-purple)";
    };

    const arrowColorValue = getArrowColor();

    return (
      <button
        type="button"
        ref={combinedRef}
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
          ref={arrowRef}
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
