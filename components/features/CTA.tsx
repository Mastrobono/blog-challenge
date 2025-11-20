"use client";

import React from "react";
import { clsx } from "clsx";
import Button from "../ui/Button";

export interface CTAProps extends React.HTMLAttributes<HTMLDivElement> {
  normalText?: string;
  semiboldText?: string;
  buttonText?: string;
  onSubscribe?: () => void;
}

const CTA = React.forwardRef<HTMLDivElement, CTAProps>(
  function CTA(
    {
      className,
      normalText = "Sign up for our newsletter",
      semiboldText = "and get daily updates",
      buttonText = "Subscribe",
      onSubscribe,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={clsx(
          "w-full bg-arrow-purple",
          "flex flex-col items-start md:gap-10 gap-6 p-10",
          "md:flex-row md:justify-between md:items-center md:gap-[40px] md:px-16 md:py-12",
          className
        )}
        {...props}
      >
        {/* Text */}
        <p className="text-white text-left text-xl-regular-tight font-space-grotesk">
          <span className="font-normal">{normalText} </span>
          <span className="font-semibold">{semiboldText}</span>
        </p>

        {/* Button */}
        <Button
          variant="primary"
          onClick={onSubscribe}
          className="w-full md:!w-auto md:px-6"
        >
          {buttonText}
        </Button>
      </div>
    );
  }
);

CTA.displayName = "CTA";

export default CTA;

