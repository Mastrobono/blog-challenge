"use client";

import React from "react";
import { clsx } from "clsx";

export interface SocialMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
  size?: "default" | "large";
}

const SocialMedia = React.forwardRef<HTMLDivElement, SocialMediaProps>(
  function SocialMedia(
    { className, variant = "light", size = "default", ...props },
    ref
  ) {
    const gapClass = size === "default" ? "gap-6" : "gap-8"; // 24px = gap-6, 32px = gap-8

    return (
      <div
        ref={ref}
        className={clsx("flex items-center", gapClass, className)}
        {...props}
      >
        {/* LinkedIn */}
        <a
          href="#"
          className="transition-opacity duration-200 hover:opacity-80 focus:outline-none"
          aria-label="LinkedIn"
        >
          <img
            src="/assets/linkedin-social.svg"
            alt="LinkedIn"
            className={clsx("w-6 h-6", {
              "brightness-0 invert": variant === "light", // White icons for light variant
              "brightness-0": variant === "dark", // Black icons for dark variant
            })}
          />
        </a>

        {/* Facebook */}
        <a
          href="#"
          className="transition-opacity duration-200 hover:opacity-80 focus:outline-none"
          aria-label="Facebook"
        >
          <img
            src="/assets/facebook-social.svg"
            alt="Facebook"
            className={clsx("w-6 h-6", {
              "brightness-0 invert": variant === "light", // White icons for light variant
              "brightness-0": variant === "dark", // Black icons for dark variant
            })}
          />
        </a>

        {/* X (Twitter) */}
        <a
          href="#"
          className="transition-opacity duration-200 hover:opacity-80 focus:outline-none"
          aria-label="X (Twitter)"
        >
          <img
            src="/assets/x-social.svg"
            alt="X"
            className={clsx("w-6 h-6", {
              "brightness-0 invert": variant === "light", // White icons for light variant
              "brightness-0": variant === "dark", // Black icons for dark variant
            })}
          />
        </a>
      </div>
    );
  }
);

SocialMedia.displayName = "SocialMedia";

export default SocialMedia;

