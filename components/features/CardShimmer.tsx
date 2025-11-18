"use client";

import React from "react";
import { clsx } from "clsx";

export interface CardShimmerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light";
}

/**
 * CardShimmer Component
 * Displays a subtle shimmer loading state for Card components
 */
const CardShimmer = React.forwardRef<HTMLDivElement, CardShimmerProps>(
  function CardShimmer({ className, variant = "light", ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex flex-col",
          "w-full h-full flex-1 min-h-[378px]",
          "overflow-hidden",
          "p-[10px]",
          {
            "bg-neutral-black": variant === "dark",
            "bg-neutral-white": variant === "light",
          },
          className
        )}
        {...props}
      >
        {/* Background Image Shimmer - subtle gradient animation */}
        <div className="absolute inset-0 bg-neutral-lightest">
          <div 
            className="w-full h-full bg-gradient-to-r from-neutral-lightest via-neutral-gray-light/10 to-neutral-lightest bg-[length:200%_100%] animate-shimmer"
            style={{
              backgroundImage: "linear-gradient(90deg, hsl(0, 0%, 96%) 0%, hsl(0, 0%, 92%) 50%, hsl(0, 0%, 96%) 100%)",
            }}
          />
        </div>

        {/* Content Overlay Shimmer */}
        <div className="relative mt-auto flex flex-col px-6 pt-6 pb-3">
          {/* Badge Shimmer */}
          <div className="mb-4">
            <div className="h-[30px] w-[100px] bg-neutral-gray-light/20 rounded animate-pulse" />
          </div>

          {/* Title Shimmer */}
          <div className={clsx(
            "flex flex-col gap-3 px-6 pb-3 pt-3",
            {
              "bg-neutral-white": variant === "light",
              "bg-neutral-black": variant === "dark",
            }
          )}>
            <div className={clsx(
              "h-6 rounded animate-pulse",
              {
                "bg-neutral-gray-light/20": variant === "light",
                "bg-neutral-gray-light/30": variant === "dark",
              }
            )} style={{ width: "75%" }} />
            <div className={clsx(
              "h-6 rounded animate-pulse",
              {
                "bg-neutral-gray-light/20": variant === "light",
                "bg-neutral-gray-light/30": variant === "dark",
              }
            )} style={{ width: "50%" }} />
            
            {/* Bottom Row Shimmer */}
            <div className="flex items-center justify-between mt-2">
              <div className={clsx(
                "h-8 w-20 rounded animate-pulse",
                {
                  "bg-neutral-gray-light/20": variant === "light",
                  "bg-neutral-gray-light/30": variant === "dark",
                }
              )} />
              <div className={clsx(
                "h-5 w-24 rounded animate-pulse",
                {
                  "bg-neutral-gray-light/20": variant === "light",
                  "bg-neutral-gray-light/30": variant === "dark",
                }
              )} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CardShimmer.displayName = "CardShimmer";

export default CardShimmer;

