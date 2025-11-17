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
          {isAllActive ? (
            <Chip
              variant="active"
              onClick={handleAllClick}
              onRemove={() => onChipToggle("all")}
            >
              All
            </Chip>
          ) : (
            <Chip
              variant="default"
              onClick={handleAllClick}
            >
              All
            </Chip>
          )}

          {/* Other Chips */}
          {chips.map((chip) => {
            const isActive = activeChips.includes(chip.id);
            return isActive ? (
              <Chip
                key={chip.id}
                variant="active"
                onClick={() => onChipToggle(chip.id)}
                onRemove={() => onChipToggle(chip.id)}
              >
                {chip.label}
              </Chip>
            ) : (
              <Chip
                key={chip.id}
                variant="default"
                onClick={() => onChipToggle(chip.id)}
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

