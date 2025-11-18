"use client";

import React from "react";

export interface LogoShapeProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * LogoShape Component
 * Contains the geometric shape (rects) part of the logo
 */
const LogoShape = React.forwardRef<SVGSVGElement, LogoShapeProps>(
  function LogoShape({ className, ...props }, ref) {
    return (
      <svg
        ref={ref}
        width="29"
        height="28"
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <rect
          x="28.1074"
          y="12.0684"
          width="3.86207"
          height="28.1077"
          transform="rotate(90 28.1074 12.0684)"
          fill="#D8F34E"
        />
        <rect
          x="15.9922"
          y="28"
          width="3.87692"
          height="28"
          transform="rotate(-180 15.9922 28)"
          fill="#D8F34E"
        />
        <rect
          width="3.8695"
          height="28.0539"
          transform="matrix(-0.708462 0.705749 -0.708462 -0.705749 25.3633 22.5342)"
          fill="#D8F34E"
        />
        <rect
          width="3.8695"
          height="28.0539"
          transform="matrix(-0.708462 -0.705749 0.708462 -0.705749 5.48633 25.2646)"
          fill="#D8F34E"
        />
      </svg>
    );
  }
);

LogoShape.displayName = "LogoShape";

export default LogoShape;

