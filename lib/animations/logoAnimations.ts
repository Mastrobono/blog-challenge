"use client";

import { gsap } from "gsap";

/**
 * Animation configuration for logo shape
 */
export interface LogoShapeAnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  rotationFrom?: number;
}

/**
 * Animation configuration for logo text
 */
export interface LogoTextAnimationConfig {
  duration?: number;
  delay?: number;
  stagger?: number;
  xFrom?: number;
}

/**
 * Animate logo shape with rotation from left
 * @param element - The SVG element to animate
 * @param config - Animation configuration
 * @returns GSAP timeline
 */
export function animateLogoShape(
  element: SVGSVGElement | null,
  config: LogoShapeAnimationConfig = {}
): gsap.core.Timeline | null {
  if (!element) return null;

  const {
    duration = 2,
    delay = 0,
    ease = "bounce.in",
    rotationFrom = -360,
  } = config;

  const tl = gsap.timeline({ delay });

  tl.from(element, {
    rotation: rotationFrom,
    x: -60,
    opacity: 0,
    duration,
    ease,
  });

  return tl;
}

/**
 * Animate logo text with character-by-character reveal
 * @param element - The HTML div element containing character spans
 * @param config - Animation configuration
 * @returns GSAP timeline
 */
export function animateLogoText(
  element: HTMLDivElement | null,
  config: LogoTextAnimationConfig = {}
): gsap.core.Timeline | null {
  if (!element) return null;

  const {
    duration = 2,
    delay = 0,
    stagger = 0.5,
    xFrom = -100,
  } = config;

  // Get all character spans
  const chars = element.querySelectorAll<HTMLElement>(".logo-text-char");

  if (chars.length === 0) return null;

  // Convert NodeList to Array (already in correct order: L, i, t, e, T, e, c, h)
  const charsArray = Array.from(chars);

  const tl = gsap.timeline({ delay });

  // Set initial state for all characters
  gsap.set(charsArray, {
    opacity: 0,
    x: xFrom,
  });

  // Animate each character with stagger (from first to last character)
  tl.to(charsArray, {
    opacity: 1,
    x: 0,
    duration,
    stagger,
    ease: "power3.in",
  }, "-=0.5");

  return tl;
}

/**
 * Animate logo shape rotation on hover
 * Creates a continuous rotation animation while hovering
 * @param element - The SVG element to animate
 * @param config - Animation configuration
 * @returns GSAP timeline
 */
export function animateLogoShapeHover(
  element: SVGSVGElement | null,
  config: { duration?: number; ease?: string; currentRotation?: number } = {}
): gsap.core.Timeline | null {
  if (!element) return null;

  const { duration = 2, ease = "none", currentRotation = 0 } = config;

  const tl = gsap.timeline({ repeat: -1 });

  // Use relative rotation to continue from current position
  tl.to(element, {
    rotation: `+=360`,
    duration,
    ease,
    transformOrigin: "center center",
  });

  return tl;
}

