"use client";

import React from "react";
import { clsx } from "clsx";
import SocialMedia from "../ui/SocialMedia";

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
  function Footer({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(
          "w-full bg-arrow-purple px-16 py-[66px] md:mt-6",
          "flex flex-col items-center gap-[56px]",
          "md:items-start md:gap-[40px]",
          className
        )}
        {...props}
      >
        {/* First Row: Logo and Social Media */}
        <div className="flex flex-col items-center gap-[56px] md:flex-row md:items-center md:justify-between md:gap-10 md:w-full">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/assets/logo.svg"
              alt="Lite-Tech"
              className="h-auto"
            />
          </div>

          {/* Social Media */}
          <SocialMedia variant="dark" size="default" />
        </div>

        {/* Second Row: Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-white text-center md:text-left font-sans text-sm-regular">
            <span className="md:inline">
              © Copyright Lite-Tech.
            </span>
            <br className="md:hidden" />
            <span className="md:inline md:ml-1">
              <span className="md:hidden inline-block" style={{ width: "1.2ch" }}></span>
              All Rights Reserved
            </span>
          </p>
        </div>
      </div>
    );
  }
);

Footer.displayName = "Footer";

export default Footer;

