"use client";

import React from "react";
import { FilterProvider, useFilters } from "@/contexts/FilterContext";
import FilteredPosts from "./FilteredPosts";
import FilterChips from "./FilterChips";
import { ApiPost } from "@/services/api";

export interface FilteredPostsWithChipsProps {
  allPosts: ApiPost[];
  initialTopics: { id: string; label: string }[];
  title?: string;
}

/**
 * Internal component that renders FilterChips separately
 */
function FilterChipsWrapper({ title = "Topics" }: { title?: string }) {
  const { activeFilters, toggleFilter, chips } = useFilters();
  
  return (
    <FilterChips
      title={title}
      chips={chips}
      activeChips={activeFilters}
      onChipToggle={toggleFilter}
    />
  );
}

/**
 * Internal component that renders FilteredPosts content
 */
function FilteredPostsWrapper({
  allPosts,
  initialTopics,
}: {
  allPosts: ApiPost[];
  initialTopics: { id: string; label: string }[];
}) {
  return (
    <FilteredPosts
      posts={allPosts}
      initialTopics={initialTopics}
      hideFilterChips={true}
    />
  );
}

/**
 * Provider component that exposes FilterChips and FilteredPosts separately
 */
export function FilteredPostsProvider({
  children,
  initialTopics,
}: {
  children: React.ReactNode;
  initialTopics: { id: string; label: string }[];
}) {
  return (
    <FilterProvider initialActiveFilters={["all"]} initialChips={initialTopics}>
      {children}
    </FilterProvider>
  );
}

/**
 * Exported components for use in page.tsx
 */
export { FilterChipsWrapper as FilterChipsContent, FilteredPostsWrapper as FilteredPostsContent };

