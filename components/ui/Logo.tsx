"use client";

import React, { useRef } from "react";
import { clsx } from "clsx";
import LogoShape from "./LogoShape";
import LogoText from "./LogoText";
import { useLogoShapeHover } from "@/hooks/useLogoAnimation";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to animate the logo on mount
   * @default true
   */
  animate?: boolean;
}

/**
 * Logo Component
 * Combines LogoShape and LogoText with GSAP animations
 */
const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  function Logo(
    { className, animate: _animate = true, ...props },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    // Removed entry animation - only keep hover animation
    const hoverRef = useLogoShapeHover(containerRef);

    // Combine refs: only hoverRef for hover animation
    const combinedRef = React.useCallback(
      (node: SVGSVGElement | null) => {
        // Set hoverRef (for hover animation)
        if (hoverRef) {
          // eslint-disable-next-line react-hooks/immutability
          (hoverRef as React.MutableRefObject<SVGSVGElement | null>).current =
            node;
        }
      },
      [hoverRef]
    );

    // Combine container ref with forwarded ref
    const combinedContainerRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref]
    );

    return (
      <div
        ref={combinedContainerRef}
        className={clsx("flex items-center gap-2", className)}
        {...props}
      >
        <LogoShape ref={combinedRef} className="flex-shrink-0" />
        <LogoText className="flex-shrink-0" />
      </div>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;

