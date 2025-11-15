"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

const buttonVariants = cva(
  // Base styles for all buttons
  "inline-flex items-center justify-center border-2 h-14 py-4 px-8 text-lg-medium transition-all duration-200 focus:outline-none cursor-pointer disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "w-[112px] bg-primary-lime text-brand-indigo border-primary-lime hover:bg-neutral-black hover:text-neutral-white hover:border-neutral-black focus:border-neutral-black active:bg-brand-indigo active:text-neutral-white active:border-brand-indigo disabled:!bg-transparent disabled:!text-neutral-gray-light disabled:!border-transparent disabled:hover:!bg-transparent disabled:hover:!text-neutral-gray-light disabled:hover:!border-transparent disabled:active:!bg-transparent disabled:active:!text-neutral-gray-light disabled:active:!border-transparent",
        secondary: "w-[112px] bg-transparent text-neutral-white border-primary-lime hover:bg-primary-lime hover:text-brand-indigo focus:border-primary-lime active:bg-primary-lime active:text-brand-indigo active:border-primary-lime disabled:hover:bg-disabled-bg disabled:hover:text-neutral-gray-light disabled:hover:border-neutral-gray-light disabled:active:bg-disabled-bg disabled:active:text-neutral-gray-light disabled:active:border-neutral-gray-light",
        black: "w-[112px] bg-neutral-black text-neutral-white border-neutral-black hover:bg-primary-lime hover:text-neutral-black hover:border-neutral-black focus:bg-primary-lime focus:text-neutral-black focus:border-neutral-black active:bg-primary-lime active:text-neutral-black active:border-neutral-black disabled:!bg-transparent disabled:!text-neutral-gray-light disabled:!border-transparent disabled:hover:!bg-transparent disabled:hover:!text-neutral-gray-light disabled:hover:!border-transparent disabled:active:!bg-transparent disabled:active:!text-neutral-gray-light disabled:active:!border-transparent",
        "green-outline": "w-[112px] bg-primary-lime text-neutral-black border-neutral-black hover:bg-neutral-black hover:text-neutral-white hover:border-neutral-black focus:bg-neutral-black focus:text-neutral-white focus:border-neutral-black active:bg-neutral-black active:text-neutral-white active:border-neutral-black disabled:!bg-transparent disabled:!text-neutral-gray-light disabled:!border-transparent disabled:hover:!bg-transparent disabled:hover:!text-neutral-gray-light disabled:hover:!border-transparent disabled:active:!bg-transparent disabled:active:!text-neutral-gray-light disabled:active:!border-transparent",
      },
      iconPosition: {
        right: "gap-[10px]",
        left: "gap-[10px]",
        none: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      iconPosition: "none",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      disabled,
      children,
      icon,
      iconPosition = "none",
      ...props
    },
    ref
  ) => {
    // Build disabled classes separately to ensure they override variant styles
    const disabledClasses = disabled
      ? variant === "primary" || variant === "black" || variant === "green-outline"
        ? "!border-transparent !bg-transparent !text-neutral-gray-light hover:!bg-transparent hover:!text-neutral-gray-light hover:!border-transparent hover:!text-neutral-gray-light active:!bg-transparent active:!text-neutral-gray-light active:!border-transparent active:!text-neutral-gray-light"
        : variant === "secondary"
        ? "!border-neutral-gray-light !bg-disabled-bg !text-neutral-gray-light hover:!bg-disabled-bg hover:!text-neutral-gray-light hover:!border-neutral-gray-light active:!bg-disabled-bg active:!text-neutral-gray-light active:!border-neutral-gray-light"
        : "!border-transparent !bg-transparent !text-neutral-gray-light hover:!bg-transparent hover:!text-neutral-gray-light hover:!border-transparent active:!bg-transparent active:!text-neutral-gray-light active:!border-transparent"
      : "";

    const iconPositionClass = icon ? (iconPosition === "right" ? "right" : "left") : "none";

    return (
      <button
        type="button"
        className={clsx(
          buttonVariants({ variant, iconPosition: iconPositionClass }),
          disabledClasses,
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {icon && iconPosition === "left" && icon}
        {children}
        {icon && iconPosition === "right" && icon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

