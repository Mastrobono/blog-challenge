"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  animateLogoShape,
  animateLogoShapeHover,
  type LogoShapeAnimationConfig,
} from "@/lib/animations/logoAnimations";

/**
 * Hook to animate logo shape on mount
 */
export function useLogoShapeAnimation(config?: LogoShapeAnimationConfig) {
  const shapeRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Don't animate if config is undefined
    if (!config) return;

    const shape = shapeRef.current;
    if (!shape) return;

    const animation = animateLogoShape(shape, config);

    return () => {
      animation?.kill();
    };
  }, [config]);

  return shapeRef;
}


/**
 * Hook to animate logo shape rotation on hover
 * Creates a continuous rotation animation while hovering
 * @param containerRef - Ref to the container element (logo wrapper) that triggers hover
 */
export function useLogoShapeHover(containerRef?: React.RefObject<HTMLElement | null>) {
  const shapeRef = useRef<SVGSVGElement>(null);
  const hoverAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const initialRotationRef = useRef<number>(0);

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;

    // Use container ref if provided, otherwise use shape itself
    const hoverTarget = containerRef?.current || shape;

    const handleMouseEnter = () => {
      // Get current rotation before starting hover animation
      const currentRotation = gsap.getProperty(shape, "rotation") as number;
      initialRotationRef.current = currentRotation || 0;

      // Start rotation animation
      hoverAnimationRef.current = animateLogoShapeHover(shape, {
        duration: 2,
        ease: "none",
        currentRotation: initialRotationRef.current,
      });
    };

    const handleMouseLeave = () => {
      // Stop rotation animation
      if (hoverAnimationRef.current) {
        hoverAnimationRef.current.kill();
        hoverAnimationRef.current = null;
      }
      // Smoothly return to initial rotation
      gsap.to(shape, {
        rotation: initialRotationRef.current,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    hoverTarget.addEventListener("mouseenter", handleMouseEnter);
    hoverTarget.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hoverTarget.removeEventListener("mouseenter", handleMouseEnter);
      hoverTarget.removeEventListener("mouseleave", handleMouseLeave);
      if (hoverAnimationRef.current) {
        hoverAnimationRef.current.kill();
      }
    };
  }, [containerRef]);

  return shapeRef;
}

