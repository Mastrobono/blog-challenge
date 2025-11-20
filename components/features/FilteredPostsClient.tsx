"use client";

import React from "react";
import { FilterProvider, useFilters } from "@/contexts/FilterContext";
import FilteredPosts from "./FilteredPosts";
import FilterChips from "./FilterChips";
import { ApiPost } from "@/services/api";

export interface FilteredPostsClientProps {
  initialPosts: ApiPost[];
  allPosts: ApiPost[];
  initialTopics: { id: string; label: string }[];
  showFilterChipsSeparately?: boolean;
  title?: string;
}

/**
 * Internal component that uses FilterContext
 */
function FilteredPostsContent({
  allPosts,
  initialTopics,
  showFilterChipsSeparately,
  title = "Topics",
}: {
  allPosts: ApiPost[];
  initialTopics: { id: string; label: string }[];
  showFilterChipsSeparately?: boolean;
  title?: string;
}) {
  const { activeFilters, toggleFilter, chips } = useFilters();

  if (showFilterChipsSeparately) {
    return (
      <>
        <FilterChips
          title={title}
          chips={chips}
          activeChips={activeFilters}
          onChipToggle={toggleFilter}
        />
        <FilteredPosts
          posts={allPosts}
          initialTopics={initialTopics}
          hideFilterChips={true}
        />
      </>
    );
  }

  return (
    <FilteredPosts posts={allPosts} initialTopics={initialTopics} title={title} />
  );
}

/**
 * Client wrapper for FilteredPosts
 * Handles hydration and provides FilterContext
 * Initial load shows 9 posts, then allows client-side filtering
 */
export default function FilteredPostsClient({
  initialPosts: _initialPosts,
  allPosts,
  initialTopics,
  showFilterChipsSeparately = false,
  title = "Topics",
}: FilteredPostsClientProps) {
  return (
    <FilterProvider initialActiveFilters={["all"]} initialChips={initialTopics}>
      <FilteredPostsContent
        allPosts={allPosts}
        initialTopics={initialTopics}
        showFilterChipsSeparately={showFilterChipsSeparately}
        title={title}
      />
    </FilterProvider>
  );
}

