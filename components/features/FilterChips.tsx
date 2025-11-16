"use client";

import React from "react";
import { clsx } from "clsx";
import Chip from "../ui/Chip";

export interface FilterChipItem {
  id: string;
  label: string;
}

export interface FilterChipsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  chips: FilterChipItem[];
  activeChips: string[];
  onChipToggle: (chipId: string) => void;
}

const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  function FilterChips(
    { className, title = "Topics", chips, activeChips, onChipToggle, ...props },
    ref
  ) {
    const handleChipClick = (chipId: string) => {
      onChipToggle(chipId);
    };

    const handleAllClick = () => {
      // If "all" is already active, do nothing (or you could clear all)
      // Otherwise, activate "all" which should clear other selections
      if (!activeChips.includes("all")) {
        onChipToggle("all");
      }
    };

    const isAllActive = activeChips.includes("all");

    return (
      <div
        ref={ref}
        className={clsx(
          "w-full",
          "flex flex-col gap-6",
          className
        )}
        {...props}
      >
        {/* Title */}
        <h2 className="text-lg-bold font-sans text-white">
          {title}
        </h2>

        {/* Chips Container - Full width with horizontal scroll */}
        <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
          <div className="flex items-center gap-2 min-w-max pb-1">
          {/* "All" Chip - Always first */}
          <Chip
            variant={isAllActive ? "active" : "default"}
            onClick={handleAllClick}
            onRemove={isAllActive ? () => onChipToggle("all") : undefined}
          >
            All
          </Chip>

          {/* Other Chips */}
          {chips.map((chip) => {
            const isActive = activeChips.includes(chip.id);
            return (
              <Chip
                key={chip.id}
                variant={isActive ? "active" : "default"}
                onClick={() => onChipToggle(chip.id)}
                onRemove={isActive ? () => onChipToggle(chip.id) : undefined}
              >
                {chip.label}
              </Chip>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
);

FilterChips.displayName = "FilterChips";

export default FilterChips;

