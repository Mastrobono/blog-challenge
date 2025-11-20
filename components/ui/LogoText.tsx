"use client";

import React from "react";
import { clsx } from "clsx";

export interface LogoTextProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  animate?: boolean;
}

/**
 * LogoText Component
 * Contains the text part of the logo using HTML text with font-sans
 */
const LogoText = React.forwardRef<HTMLDivElement, LogoTextProps>(
  function LogoText({ className, ...props }, ref) {
    const text = "lite-tech";

    return (
      <div
        ref={ref}
        className={clsx(
          "text-white text-3xl font-semibold tracking-[2px] font-space-grotesk",
          "flex items-center",
          className
        )}
        {...props}
      >
        <span className="inline-block whitespace-normal">{text}</span>
      </div>
    );
  }
);

LogoText.displayName = "LogoText";

export default LogoText;
