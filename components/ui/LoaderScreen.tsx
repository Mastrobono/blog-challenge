"use client";

import React, { useEffect, useRef } from "react";
import { clsx } from "clsx";
import lottie from "lottie-web";
import { gsap } from "gsap";
import TextType from "./TextType";

export interface LoaderScreenProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Whether the loader is visible
     * @default true
     */
    isVisible?: boolean;
    /**
     * Callback when loader animation completes
     */
    onComplete?: () => void;
}

/**
 * LoaderScreen Component
 * Simple loader with Lottie animation
 */
const LoaderScreen = React.forwardRef<HTMLDivElement, LoaderScreenProps>(
    function LoaderScreen(
        { className, isVisible = true, onComplete, ...props },
        ref
    ) {
        const containerRef = useRef<HTMLDivElement>(null);
        const lottieContainerRef = useRef<HTMLDivElement>(null);
        const disclaimerRef = useRef<HTMLDivElement>(null);
        const lottieInstanceRef = useRef<any>(null);
        const timelineRef = useRef<gsap.core.Timeline | null>(null);
        const isExitingRef = useRef(false);

        // Function to execute exit timeline
        const executeExitTimeline = React.useCallback(() => {
            // Prevent multiple executions
            if (isExitingRef.current) return;
            
            const container = containerRef.current;
            const lottieContainer = lottieContainerRef.current;
            const disclaimer = disclaimerRef.current;
            
            if (!container || !lottieContainer) return;
            
            isExitingRef.current = true;
            
            // Stop Lottie animation if playing
            if (lottieInstanceRef.current) {
                lottieInstanceRef.current.stop();
            }
            
            // Create timeline for exit animation
            const exitTl = gsap.timeline({
                onComplete: () => {
                    // Call onComplete callback to hide loader and show homepage
                    if (onComplete) {
                        onComplete();
                    }
                },
            });

            // First, fade out disclaimer
            if (disclaimer) {
                exitTl.to(disclaimer, {
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }

            // Then fade out lottie
            exitTl.to(lottieContainer, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
            })
                // Finally scaleY the container to 0 from top
                .to(
                    container,
                    {
                        backgroundColor: "var(--color-neutral-black)",
                        scaleY: 0,
                        duration: 1,
                        ease: "power2.inOut",
                    },
                    "-=0.2" // Start slightly before lottie fade completes
                );

            timelineRef.current = exitTl;
        }, [onComplete]);

        useEffect(() => {
            if (!isVisible || !lottieContainerRef.current || !containerRef.current) return;

            const lottieContainer = lottieContainerRef.current;
            const container = containerRef.current;

            // Set initial state: white background, lottie hidden below
            gsap.set(container, {
                backgroundColor: "var(--color-neutral-white)",
                transformOrigin: "top",
            });
            gsap.set(lottieContainer, {
                opacity: 0,
            });

            // Load Lottie animation data
            fetch("/assets/boris.json")
                .then((res) => res.json())
                .then((animationData) => {
                    // Initialize Lottie animation (without autoplay)
                    const lottieInstance = lottie.loadAnimation({
                        container: lottieContainer,
                        renderer: "svg",
                        loop: false,
                        autoplay: true,
                        animationData: animationData,
                    });

                    // Set speed to 1.5x (0.5 faster)
                    lottieInstance.setSpeed(1.5);

                    lottieInstanceRef.current = lottieInstance;

                    // Scale Lottie SVG to fit container
                    const svg = lottieContainer.querySelector("svg");
                    if (svg) {
                        svg.style.width = "100%";
                        svg.style.height = "100%";
                        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
                    }

                    // Create entry timeline: animate lottie from translateY -50% to 0
                    const entryTl = gsap.timeline({
                       
                    });
                    entryTl.to(lottieContainer, {
                        opacity: 1,
                        translateY: "0%",
                        duration: 2,
                        ease: "power2.out",
                    });

                    // Create exit timeline when Lottie animation completes
                    lottieInstance.addEventListener("complete", () => {
                        executeExitTimeline();
                    });
                })
                .catch((error) => {
                    console.error("Error loading Lottie animation:", error);
                });

            return () => {
                if (timelineRef.current) {
                    timelineRef.current.kill();
                    timelineRef.current = null;
                }
                if (lottieInstanceRef.current) {
                    lottieInstanceRef.current.destroy();
                    lottieInstanceRef.current = null;
                }
            };
        }, [isVisible, onComplete, executeExitTimeline]);

        // Handle click and Escape key to skip loader
        useEffect(() => {
            if (!isVisible) return;

            const handleClick = () => {
                executeExitTimeline();
            };

            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    executeExitTimeline();
                }
            };

            const container = containerRef.current;
            if (container) {
                container.addEventListener("click", handleClick);
                window.addEventListener("keydown", handleEscape);
            }

            return () => {
                if (container) {
                    container.removeEventListener("click", handleClick);
                }
                window.removeEventListener("keydown", handleEscape);
            };
        }, [isVisible, executeExitTimeline]);

        return (
            <div
                ref={(node) => {
                    containerRef.current = node;
                    if (typeof ref === "function") {
                        ref(node);
                    } else if (ref) {
                        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }
                }}
                className={clsx(
                    "fixed inset-0 z-[100]",
                    "bg-[var(--color-neutral-white)]",
                    "flex items-center justify-center",
                    "origin-top", // Transform origin top for scaleY animation
                    className
                )}
                {...props}
            >
                {/* Boris Lottie - Centered */}
                <div
                    ref={lottieContainerRef}
                    className="w-[500px] h-[500px] pointer-events-none overflow-hidden"
                />

                {/* Disclaimer - Bottom right */}
                <div 
                    ref={disclaimerRef}
                    className="absolute bottom-0 right-1/2 translate-x-1/2 text-neutral-black text-xs font-base p-6 max-w-md text-center"
                >
                    <span className="font-semibold">Disclaimer:</span> <br />
                    <TextType 
                        text={["Borrowed from webArchive without permission. I really like Boris !! ❤️"]}
                        typingSpeed={40}
                        pauseDuration={150}
                        showCursor={true}
                        cursorCharacter="|"
                        loop={false}
                        className="inline"
                    />
                </div>
            </div>
        );
    }
);

LoaderScreen.displayName = "LoaderScreen";

export default LoaderScreen;
