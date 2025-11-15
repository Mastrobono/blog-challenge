"use client";

import React from "react";
import { clsx } from "clsx";
import Card, { CardProps } from "./Card";

export interface GridCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cards: CardProps[];
  mainCard?: {
    position: "left" | "right";
    index: number; // Index of the card that will be full height (0-2)
  } | null; // If null, all 3 cards will have the same size (3 columns with 32px gap)
}

const GridCard = React.forwardRef<HTMLDivElement, GridCardProps>(
  function GridCard(
    { className, cards, mainCard = { position: "left", index: 0 }, ...props },
    ref
  ) {
    if (cards.length !== 3) {
      console.warn("GridCard expects exactly 3 cards");
      return null;
    }

    // Equal size mode: 3 columns with 32px gap (when mainCard is null)
    if (mainCard === null) {
      return (
        <div
          ref={ref}
          className={clsx(
            className,
            "flex flex-col gap-4",
            "md:grid md:grid-cols-3 md:gap-8 md:items-stretch md:h-full md:min-h-0"
          )}
          {...props}
        >
          {cards.map((card, index) => (
            <div key={index} className="flex h-full md:min-h-full">
              <Card {...card} />
            </div>
          ))}
        </div>
      );
    }

    let { position: mainCardPosition, index: mainCardIndex } = mainCard;

    if (mainCardIndex < 0 || mainCardIndex > 2) {
      console.warn("mainCard.index must be between 0 and 2, defaulting to 0");
      mainCardIndex = 0;
    }

    const mainCardData = cards[mainCardIndex];
    const secondaryCards = cards.filter((_, index) => index !== mainCardIndex);

    return (
      <div
        ref={ref}
        className={clsx(
          className,
          "flex flex-col gap-4",
          "md:grid md:grid-cols-2 md:grid-rows-[1fr_1fr] md:items-stretch md:gap-4 md:h-full md:min-h-0"
        )}
        {...props}
      >
        {mainCardPosition === "left" ? (
          <>
            {/* Main Card - Left (appears first in mobile, left in desktop) */}
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
            {/* Secondary Cards - Right (appear after main in mobile, right column in desktop) */}
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
            {/* Secondary Cards - Left (appear first in mobile, left column in desktop) */}
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
            {/* Main Card - Right (appears last in mobile, right column in desktop) */}
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
    );
  }
);

GridCard.displayName = "GridCard";

export default GridCard;

