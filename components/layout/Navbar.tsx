"use client";

import React from "react";
import Link from "next/link";
import { clsx } from "clsx";

export interface NavbarProps extends React.HTMLAttributes<HTMLNavElement> {
  buttonClick?: React.ReactNode;
}

const Navbar = React.forwardRef<HTMLNavElement, NavbarProps>(
  function Navbar({ className, buttonClick, style, ...props }, ref) {
    return (
      <nav
        ref={ref}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50",
          "w-full",
          "flex items-center justify-between",
          // Mobile padding: 16px top/bottom, 24px left/right
          "py-4 px-6",
          // Desktop padding: 26px top/bottom, 64px left/right
          "md:py-[26px] md:px-16",
          // Minimum height using navbar-height token (80px) for consistency
          "min-h-[80px]",
          // Background: #000 at 80% opacity with backdrop blur
          "backdrop-blur-[8px]",
          className
        )}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)", // Using neutral-black with 80% opacity
          ...style,
        }}
        {...props}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/assets/logo.svg"
            alt="Lite-Tech"
            className="h-auto"
          />
        </Link>

        {/* Button */}
        {buttonClick && (
          <div className="flex items-center">
            {buttonClick}
          </div>
        )}
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";

export default Navbar;

