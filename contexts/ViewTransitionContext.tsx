"use client";

import React, { createContext, useContext, useRef, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

interface ViewTransitionContextType {
  registerViewTransitionName: (postId: string) => string | undefined;
}

const ViewTransitionContext = createContext<ViewTransitionContextType | null>(null);

export function ViewTransitionProvider({ children }: { children: React.ReactNode }) {
  const registeredNames = useRef<Set<string>>(new Set());
  const pathname = usePathname();

  // Reset registered names and scroll to top when pathname changes (new page)
  useEffect(() => {
    registeredNames.current.clear();
    
    // Scroll to top on navigation
    if (typeof window !== "undefined") {
      // Use requestAnimationFrame to ensure it happens after the transition starts
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    }
  }, [pathname]);

  const registerViewTransitionName = useCallback((postId: string): string | undefined => {
    const name = `post-image-${postId}`;
    
    // Only register if not already registered
    if (registeredNames.current.has(name)) {
      return undefined;
    }
    
    registeredNames.current.add(name);
    return name;
  }, []);

  return (
    <ViewTransitionContext.Provider value={{ registerViewTransitionName }}>
      {children}
    </ViewTransitionContext.Provider>
  );
}

export function useViewTransition() {
  const context = useContext(ViewTransitionContext);
  if (!context) {
    // Return a no-op function if context is not available
    return {
      registerViewTransitionName: () => undefined,
    };
  }
  return context;
}

