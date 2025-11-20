"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useLenis } from "lenis/react";
import { useModal } from "@/contexts/ModalContext";
import Modal from "./Modal";

export function ModalWrapper() {
  const { isOpen, closeModal } = useModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();
  const [shouldRender, setShouldRender] = useState(false);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  // Create portal container
  useEffect(() => {
    if (typeof window !== "undefined") {
      const containerElement = document.createElement("div");
      containerElement.setAttribute("id", "modal-root");
      document.body.appendChild(containerElement);
      containerRef.current = containerElement;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setContainer(containerElement);

      return () => {
        if (containerRef.current) {
          document.body.removeChild(containerRef.current);
          containerRef.current = null;
          setContainer(null);
        }
      };
    }
  }, []);

  // Block/unblock scroll when modal opens/closes
  useEffect(() => {
    if (isOpen && lenis) {
      lenis.stop();
    } else if (!isOpen && lenis) {
      lenis.start();
    }
  }, [isOpen, lenis]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  // Handle render state
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
    }
  }, [isOpen]);

  // Animate modal in/out
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !shouldRender) return;

    const overlay = overlayRef.current;
    const modal = modalRef.current;

    if (isOpen && overlay && modal) {
      // Show elements - use flex for proper centering
      gsap.set(overlay, { display: "flex", opacity: 0 });
      gsap.set(modal, { display: "block", scale: 0.9, opacity: 0, y: 20 });

      // Animate in
      const tl = gsap.timeline();
      tl.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
        .to(
          modal,
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "back.out(1.2)",
          },
          "-=0.2"
        );
    } else if (!isOpen && overlay && modal) {
      // Animate out
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide elements and unmount after animation
          if (overlay && modal) {
            gsap.set(overlay, { display: "none" });
            gsap.set(modal, { display: "none" });
          }
          setShouldRender(false);
        },
      });

      tl.to(modal, {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      }).to(
        overlay,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        "-=0.1"
      );
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender || !container) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-5 font-space-grotesk"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={(e) => {
        // Close modal when clicking directly on the overlay
        if (e.target === e.currentTarget) {
          closeModal();
        }
      }}
      onMouseDown={(e) => {
        // Prevent closing if clicking starts inside the modal
        if (e.target !== e.currentTarget) {
          e.stopPropagation();
        }
      }}
    >
      <div 
        ref={modalRef} 
        className="relative"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Modal onClose={closeModal} />
      </div>
    </div>,
    container
  );
}

