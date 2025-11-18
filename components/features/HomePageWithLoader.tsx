"use client";

import React, { useState, useEffect } from "react";
import LoaderScreen from "@/components/ui/LoaderScreen";
import { useLenis } from "lenis/react";

interface HomePageWithLoaderProps {
  children: React.ReactNode;
}

export default function HomePageWithLoader({ children }: HomePageWithLoaderProps) {
  const [showLoader, setShowLoader] = useState(true);
  const lenis = useLenis();

  // Block scroll when loader is visible
  useEffect(() => {
    if (showLoader && lenis) {
      lenis.stop();
    } else if (!showLoader && lenis) {
      lenis.start();
    }
  }, [showLoader, lenis]);

  // Block body scroll as fallback
  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showLoader]);

  const handleLoaderComplete = () => {
    // Hide loader
    setShowLoader(false);
  };

  return (
    <>
      {/* LoaderScreen - Rendered on top with high z-index */}
      {showLoader && (
        <LoaderScreen isVisible={showLoader} onComplete={handleLoaderComplete} />
      )}

      {/* Homepage - Always rendered, loader is on top */}
      {children}
    </>
  );
}

