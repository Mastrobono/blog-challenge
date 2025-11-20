"use client";

import React, { useMemo, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import FilterChips from "./FilterChips";
import GridCard from "./GridCard";
import CTA from "./CTA";
import Button from "../ui/Button";
import { useFilters } from "@/contexts/FilterContext";
import { transformPostsToCards, extractUniqueTopics } from "@/lib/posts";
import { CardProps } from "./Card";
import { ApiPost } from "@/services/api";


export interface FilteredPostsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  posts: ApiPost[]; // Posts fetched from Server Component
  initialTopics?: { id: string; label: string }[]; // Optional initial topics (extracted from posts if not provided)
  hideFilterChips?: boolean; // Hide FilterChips if rendering separately
}

const FilteredPosts = React.forwardRef<HTMLDivElement, FilteredPostsProps>(
  function FilteredPosts(
    { className, title = "Topics", posts, initialTopics, hideFilterChips = false, ...props },
    ref
  ) {
    const { activeFilters, toggleFilter, chips, updateChips } = useFilters();
    const topicsExtractedRef = useRef(false);
    
    // Convert filters to query params (excluding "all")
    const queryFilters = useMemo(
      () => activeFilters.filter((id) => id !== "all"),
      [activeFilters]
    );

    // Extract unique topics from posts (once, when posts are loaded and no initial topics provided)
    useEffect(() => {
      if (
        !topicsExtractedRef.current &&
        posts.length > 0 &&
        chips.length === 0 &&
        !initialTopics
      ) {
        const uniqueTopics = extractUniqueTopics(posts);
        if (uniqueTopics.length > 0 && updateChips) {
          const topicChips = uniqueTopics.map((topic) => ({
            id: topic.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
            label: topic,
          }));
          updateChips(topicChips);
          topicsExtractedRef.current = true;
        }
      }
    }, [posts, updateChips, chips.length, initialTopics]);

    // Initialize chips from initialTopics if provided
    useEffect(() => {
      if (initialTopics && initialTopics.length > 0 && chips.length === 0 && updateChips) {
        updateChips(initialTopics);
      }
    }, [initialTopics, chips.length, updateChips]);

    // Transform API posts to CardProps
    // Cards now use Link for navigation, so no need to pass onReadClick
    const allPosts: CardProps[] = useMemo(() => {
      return transformPostsToCards(posts);
    }, [posts]);

    // Filter posts client-side based on active filters
    const filteredPosts = useMemo(() => {
      if (queryFilters.length === 0) {
        return allPosts;
      }
      
      // Get topic labels from active filter IDs
      const activeTopicLabels = queryFilters
        .map((filterId) => {
          const chip = chips.find((c) => c.id === filterId);
          return chip?.label || filterId;
        })
        .filter(Boolean);
      
      return allPosts.filter((post) => {
        return activeTopicLabels.some((topicLabel) => post.badge === topicLabel);
      });
    }, [allPosts, queryFilters, chips]);

    // Show only first 9 posts initially, then load more
    const [displayedCount, setDisplayedCount] = useState(9);
    
    // Reset displayed count when filters change
    const queryFiltersKey = useMemo(() => queryFilters.join(","), [queryFilters]);
    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayedCount(9);
    }, [queryFiltersKey]);
    
    const displayedPosts = filteredPosts.slice(0, displayedCount);
    const hasMore = filteredPosts.length > displayedCount;

    const handleLoadMore = () => {
      setDisplayedCount((prev) => prev + 9);
    };

    // Group displayed posts into GridCard sets (up to 3 posts per grid)
    const gridCardSets: CardProps[][] = [];
    for (let i = 0; i < displayedPosts.length; i += 3) {
      gridCardSets.push(displayedPosts.slice(i, i + 3));
    }

    // Update context with load more button state
    const { setHasLoadMoreButton } = useFilters();
    useEffect(() => {
      const hasButton = displayedPosts.length > 0 && hasMore;
      setHasLoadMoreButton(hasButton);
    }, [displayedPosts.length, hasMore, setHasLoadMoreButton]);

    // Determine main card position for each grid (alternating left/right)
    const getMainCardPosition = (index: number): "left" | "right" => {
      return index % 2 === 0 ? "left" : "right";
    };

    // CTA component - always show after first GridCard
    const ctaComponent = (
      <CTA
        normalText="Sign up for our newsletter"
        semiboldText="and get daily updates"
        buttonText="Subscribe"
        onSubscribe={() => {}}
      />
    );

    return (
      <div ref={ref} className={clsx("flex flex-col gap-10 pb-14", className)} {...props}>
        {/* Filter Chips */}
        {!hideFilterChips && (
          <FilterChips
            title={title}
            chips={chips}
            activeChips={activeFilters}
            onChipToggle={toggleFilter}
          />
        )}

        {/* Posts Grid */}
        {gridCardSets.length > 0 && (
          <div className="flex flex-col gap-10">
            {gridCardSets.map((cardSet, index) => {
              const position = getMainCardPosition(index);
              // Show CTA only after the first GridCard (max 3 cards)
              const showCTA = index === 0;
              // First grid gets priority loading for images
              const isFirstGrid = index === 0;
              
              return (
                <GridCard
                  key={index}
                  cards={cardSet}
                  mainCardPosition={position}
                  cta={showCTA ? ctaComponent : undefined}
                  isFirstGrid={isFirstGrid}
                />
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {gridCardSets.length > 0 && hasMore && (
          <div className="flex justify-center pt-8 md:pt-4">
            <Button
              variant="primary"
              onClick={handleLoadMore}
              className="w-full md:!w-auto"
            >
              Load more
            </Button>
          </div>
        )}

        {/* Empty State */}
        {gridCardSets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg-medium text-white">No posts found.</p>
          </div>
        )}
      </div>
    );
  }
);

FilteredPosts.displayName = "FilteredPosts";

export default FilteredPosts;

