"use client";

import React from "react";
import { clsx } from "clsx";
import Link from "next/link";
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
      <Link
        href="/"
        className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity text-sm-semibold-medium font-space-grotesk"
      >
        <img
          src="/assets/back-blog.svg"
          alt="Back"
          className="w-5 h-5"
          aria-hidden="true"
        />
        <span>Blog</span>
      </Link>
    ) : null;

    return (
      <div ref={ref} className={clsx("flex flex-col mt-[80px] md:mt-[45px]  md:mb-4", className)} {...props}>
        {isPostVariant ? (
          // Post variant: Card with back button inside and custom padding
          <div className="w-full ">
            <Card
              {...card}
              variant="light"
              titleSize="large"
              maxTitleWidth="557px"
              contentPadding={contentPaddingClasses}
              topContent={backButton}
              hideBadge={true}
              priority={true}
              enableViewTransition={true}
              className="pt-24 px-6 pb-10 md:pt-[38.5px] md:px-0 md:pb-[38.5px]"
            />
          </div>
        ) : (
          // Home variant: Label + Card with standard padding
          <div className="flex flex-col gap-6">
            {/* Label */}
            {label && (
              <div className="text-white text-lg-semibold-tight md:block hidden font-space-grotesk">
                <p className="text-white text-lg-semibold-tight font-space-grotesk">
                  {label}
                </p>
              </div>
            )}

            {/* Card Container */}
            <div className="w-full">
              <Card
                {...card}
                variant="dark"
                titleSize="large"
                maxTitleWidth="557px"
                contentPadding={contentPaddingClasses}
                priority={true}
                enableViewTransition={true}
                className="!p-0 !min-h-[348px] md:!min-h-0"
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

