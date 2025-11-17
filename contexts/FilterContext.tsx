"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { FilterChipItem } from "../components/features/FilterChips";

interface FilterContextType {
  activeFilters: string[];
  toggleFilter: (filterId: string) => void;
  clearFilters: () => void;
  chips: FilterChipItem[];
  updateChips: (chips: FilterChipItem[]) => void;
  mainCardPosition: "left" | "right";
  toggleMainCardPosition: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export interface FilterProviderProps {
  children: React.ReactNode;
  initialChips?: FilterChipItem[];
  initialActiveFilters?: string[];
}

export function FilterProvider({
  children,
  initialChips = [],
  initialActiveFilters = ["all"],
}: FilterProviderProps) {
  const [chips, setChips] = useState<FilterChipItem[]>(initialChips);
  const [activeFilters, setActiveFilters] = useState<string[]>(initialActiveFilters);
  const [mainCardPosition, setMainCardPosition] = useState<"left" | "right">("left");

  const updateChips = useCallback((newChips: FilterChipItem[]) => {
    setChips(newChips);
  }, []);

  const toggleFilter = useCallback((filterId: string) => {
    setActiveFilters((prev) => {
      if (filterId === "all") {
        // If clicking "all", only allow deactivating if there are other active filters
        if (prev.includes("all")) {
          // Check if there are other active filters besides "all"
          const otherFilters = prev.filter((id) => id !== "all");
          if (otherFilters.length > 0) {
            // Keep other filters, remove "all"
            return otherFilters;
          } else {
            // Cannot deactivate "all" if it's the only filter
            return ["all"];
          }
        } else {
          // Activate "all" and clear other filters
          return ["all"];
        }
      } else {
        // Remove "all" if it exists when selecting a specific filter
        const withoutAll = prev.filter((id) => id !== "all");
        
        if (withoutAll.includes(filterId)) {
          // Remove the filter
          const newFilters = withoutAll.filter((id) => id !== filterId);
          // If no filters left, activate "all"
          return newFilters.length === 0 ? ["all"] : newFilters;
        } else {
          // Add the filter
          return [...withoutAll, filterId];
        }
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(["all"]);
  }, []);

  const toggleMainCardPosition = useCallback(() => {
    setMainCardPosition((prev) => (prev === "left" ? "right" : "left"));
  }, []);

  return (
    <FilterContext.Provider
      value={{
        activeFilters,
        toggleFilter,
        clearFilters,
        chips,
        updateChips,
        mainCardPosition,
        toggleMainCardPosition,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}

