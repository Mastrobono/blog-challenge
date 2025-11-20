"use client";

import React, { useState, useCallback } from "react";
import { clsx } from "clsx";
import Card, { CardProps } from "./Card";

export interface GridCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: CardProps[]; // Can be 1, 2, or 3 cards
  mainCardPosition?: "left" | "right"; // Position for main card (only used when cards.length === 3 and equalSize is false)
  equalSize?: boolean; // If true, render 3 cards with equal size (only used when cards.length === 3)
  cta?: React.ReactNode; // CTA component to render after cards
  isFirstGrid?: boolean; // If true, images will load with priority (for first 3 cards)
}

const GridCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  function GridCard(
    { className, cards, mainCardPosition = "left", equalSize = false, cta, isFirstGrid = false, ...props },
    ref
  ) {
    const [currentMainCardPosition, setCurrentMainCardPosition] = useState<"left" | "right">(mainCardPosition);

    // Toggle main card position (only used when cards.length === 3)
    // Currently not used but kept for future functionality
    const _toggleMainCardPosition = useCallback(() => {
      setCurrentMainCardPosition((prev) => (prev === "left" ? "right" : "left"));
    }, []);

    // If no cards, return null
    if (cards.length === 0) {
      return null;
    }

    // Helper to add priority and enable view transition to cards in first grid
    const addPriorityToCard = (card: CardProps, index: number): CardProps => {
      const updatedCard = { ...card, enableViewTransition: true };
      if (isFirstGrid && index < 3) {
        updatedCard.priority = true;
      }
      return updatedCard;
    };

    // 1 card: full width, full height (100% of parent)
    if (cards.length === 1) {
      return (
        <div ref={ref} className={clsx("flex flex-col gap-10", className)} {...props}>
          <div className="w-full h-full md:h-[600px]">
            <Card {...addPriorityToCard(cards[0], 0)} />
          </div>
          {cta && <div>{cta}</div>}
        </div>
      );
    }

    // 2 cards: 50% each, same height
    if (cards.length === 2) {
      return (
        <div ref={ref} className={clsx("flex flex-col gap-10", className)} {...props}>
          <div className="w-full md:grid md:grid-cols-2 md:gap-8 md:min-h-[600px]">
            {cards.map((card, index) => (
              <div key={index} className="w-full h-full">
                <Card {...addPriorityToCard(card, index)} />
              </div>
            ))}
          </div>
          {cta && <div>{cta}</div>}
        </div>
      );
    }

    // 3 cards: either equal size or main card + 2 secondary cards
    if (equalSize) {
      // Equal size mode: 3 columns with 32px gap
      return (
        <div ref={ref} className={clsx("flex flex-col gap-10 grid-card-mobile-small-title", className)} {...props}>
          <div className="w-full md:grid md:grid-cols-3 md:gap-8 md:items-stretch md:h-full md:min-h-[600px]">
            {cards.map((card, index) => (
              <div key={index} className="flex h-full md:min-h-full">
                <Card {...addPriorityToCard(card, index)} titleSize="small" />
              </div>
            ))}
          </div>
          {cta && <div>{cta}</div>}
        </div>
      );
    }

    // Main card + 2 secondary cards layout
    const mainCardData = addPriorityToCard(cards[0], 0);
    const secondaryCards = cards.slice(1).map((card, index) => ({
      ...addPriorityToCard(card, index + 1),
      titleSize: "small" as const, // Smaller font size for stacked cards when there are 3 cards (desktop)
    }));

    return (
      <div ref={ref} className={clsx("flex flex-col gap-10 grid-card-mobile-small-title", className)} {...props}>
        <div className="w-full md:min-h-[600px]">
      <div
        className={clsx(
          "flex flex-col  gap-8 md:gap-4",
              "md:grid md:grid-cols-2 md:grid-rows-2 md:items-stretch md:gap-4 md:h-full md:min-h-0"
        )}
      >
            {currentMainCardPosition === "left" ? (
          <>
                {/* Main Card - Left */}
            <div
              className={clsx("flex h-full md:min-h-full", {
                "md:row-span-2": true,
                "md:col-span-1": true,
                "md:col-start-1": true,
                "md:row-start-1": true,
              })}
            >
                  <Card {...mainCardData} />
            </div>
                {/* Secondary Cards - Right */}
            {secondaryCards.map((card, index) => (
              <div
                key={index}
                className={clsx("flex h-full md:min-h-full", {
                  "md:row-span-1": true,
                  "md:col-span-1": true,
                  "md:col-start-2": true,
                  "md:row-start-1": index === 0,
                  "md:row-start-2": index === 1,
                })}
              >
                <Card {...card} />
              </div>
            ))}
          </>
        ) : (
          <>
                {/* Secondary Cards - Left */}
            {secondaryCards.map((card, index) => (
              <div
                key={index}
                className={clsx("flex h-full md:min-h-full", {
                  "md:row-span-1": true,
                  "md:col-span-1": true,
                  "md:col-start-1": true,
                  "md:row-start-1": index === 0,
                  "md:row-start-2": index === 1,
                })}
              >
                <Card {...card} />
              </div>
            ))}
                {/* Main Card - Right */}
            <div
              className={clsx("flex h-full md:min-h-full", {
                "md:row-span-2": true,
                "md:col-span-1": true,
                "md:col-start-2": true,
                "md:row-start-1": true,
              })}
            >
                  <Card {...mainCardData} />
            </div>
          </>
        )}
          </div>
        </div>
        {cta && <div>{cta}</div>}
      </div>
    );
  }
);

GridCard.displayName = "GridCard";

export default GridCard;

