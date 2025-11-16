"use client";

import React from "react";
import { clsx } from "clsx";
import Card, { CardProps } from "./Card";

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "home" | "post";
  label?: string;
  card: CardProps;
  showBackButton?: boolean;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  function Hero({ className, variant = "home", label, card, showBackButton = false, ...props }, ref) {
    const isPostVariant = variant === "post";

    // Content padding classes based on variant (applied to content overlay inside Card)
    const contentPaddingClasses = isPostVariant
      ? "px-6 pt-[174px] pb-10 md:px-16 md:pt-[169px] md:pb-[105px]"
      : "px-6 pt-[210px] pb-6 md:p-6";

    // Back button component
    const backButton = showBackButton ? (
      <a
        href="/"
        className="flex items-center gap-2 text-white font-sans hover:opacity-80 transition-opacity text-sm-semibold-medium"
      >
        <img
          src="/assets/back-blog.svg"
          alt="Back"
          className="w-5 h-5"
          aria-hidden="true"
        />
        <span>Blog</span>
      </a>
    ) : null;

    return (
      <div ref={ref} className={clsx("flex flex-col mt-[calc(44px+80px)] mb-16", className)} {...props}>
        {isPostVariant ? (
          // Post variant: Card with back button inside and custom padding
          <div className="w-full pt-[38.5px] pb-[38.5px]">
            <Card
              {...card}
              variant="light"
              titleSize="large"
              maxTitleWidth="557px"
              contentPadding={contentPaddingClasses}
              topContent={backButton}
              hideBadge={true}
              className="!p-0"
            />
          </div>
        ) : (
          // Home variant: Label + Card with standard padding
          <div className="flex flex-col gap-6">
            {/* Label */}
            {label && (
              <p className="text-white font-sans text-lg-semibold-tight">
                {label}
              </p>
            )}

            {/* Card Container */}
            <div className="w-full">
              <Card
                {...card}
                variant="dark"
                titleSize="large"
                maxTitleWidth="557px"
                contentPadding={contentPaddingClasses}
                className="!p-0"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

Hero.displayName = "Hero";

export default Hero;

