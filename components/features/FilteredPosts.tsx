"use client";

import React, { useMemo, useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import FilterChips from "./FilterChips";
import GridCard from "./GridCard";
import CTA from "./CTA";
import Button from "../ui/Button";
import Container from "../ui/Container";
import { useFilters } from "@/contexts/FilterContext";
import { usePosts, transformPostsToCards, extractUniqueTopics } from "@/hooks/usePosts";
import { CardProps } from "./Card";
import { ApiPost } from "@/services/api";


export interface FilteredPostsProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  apiEndpoint?: string;
}

const FilteredPosts = React.forwardRef<HTMLDivElement, FilteredPostsProps>(
  function FilteredPosts(
    { className, title = "Topics", apiEndpoint, ...props },
    ref
  ) {
    const { activeFilters, toggleFilter, chips, updateChips } = useFilters();
    const topicsExtractedRef = useRef(false);
    
    // Convert filters to query params (excluding "all")
    const queryFilters = useMemo(
      () => activeFilters.filter((id) => id !== "all"),
      [activeFilters]
    );

    // Debug logs
    useEffect(() => {
      console.log("🔍 FilteredPosts Debug:", {
        activeFilters,
        queryFilters,
        chips: chips.length,
        chipsData: chips,
      });
    }, [activeFilters, queryFilters, chips]);

    // Fetch ALL posts (no filters) - we'll filter client-side
    const {
      data,
      isLoading,
      isError,
      error,
    } = usePosts([], 100, chips); // Fetch up to 100 posts initially

    // Extract all API posts from all pages (always, since we fetch all posts)
    const allApiPosts: ApiPost[] = useMemo(() => {
      if (!data?.pages) return [];
      return data.pages.flatMap((page) => page.data);
    }, [data]);

    // Extract unique topics from all posts (once, when posts are loaded)
    useEffect(() => {
      // Only extract topics if:
      // 1. We haven't extracted them yet (ref check)
      // 2. We have posts loaded (allApiPosts.length > 0)
      // 3. Chips haven't been initialized yet (chips.length === 0)
      // 4. Loading is complete (!isLoading)
      if (
        !topicsExtractedRef.current &&
        allApiPosts.length > 0 &&
        chips.length === 0 &&
        !isLoading
      ) {
        const uniqueTopics = extractUniqueTopics(allApiPosts);
        if (uniqueTopics.length > 0 && updateChips) {
          const topicChips = uniqueTopics.map((topic) => ({
            id: topic.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
            label: topic,
          }));
          updateChips(topicChips);
          topicsExtractedRef.current = true;
        }
      }
    }, [allApiPosts, updateChips, chips.length, isLoading]);

    // Flatten all pages into a single array of CardProps
    const allPosts: CardProps[] = useMemo(() => {
      if (!data?.pages) {
        console.log("📭 No data pages");
        return [];
      }
      const posts = data.pages.flatMap((page) => transformPostsToCards(page.data));
      console.log("📦 All posts:", {
        pagesCount: data.pages.length,
        postsPerPage: data.pages.map((p) => p.data.length),
        totalPosts: posts.length,
        posts: posts.map((p) => ({ title: p.postTitle, badge: p.badge })),
      });
      return posts;
    }, [data]);

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
    useEffect(() => {
      setDisplayedCount(9);
    }, [queryFilters]);
    
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
    
    console.log("🎴 GridCard sets:", {
      totalPosts: filteredPosts.length,
      displayedPosts: displayedPosts.length,
      gridCardSetsCount: gridCardSets.length,
      sets: gridCardSets.map((set, idx) => ({ index: idx, cardsCount: set.length })),
      hasMore,
    });

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
        onSubscribe={() => console.log("Subscribe clicked")}
      />
    );

    return (
      <Container ref={ref} className={clsx("flex flex-col gap-10", className)} {...props}>
        {/* Filter Chips */}
        <FilterChips
          title={title}
          chips={chips}
          activeChips={activeFilters}
          onChipToggle={toggleFilter}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-lg-medium text-white">Loading posts...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-8">
            <p className="text-lg-medium text-status-fail">
              Error loading posts: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && gridCardSets.length > 0 && (
          <div className="flex flex-col gap-10">
            {gridCardSets.map((cardSet, index) => {
              const position = getMainCardPosition(index);
              // Show CTA only after the first GridCard (max 3 cards)
              const showCTA = index === 0;
              
              return (
                <GridCard
                  key={index}
                  cards={cardSet}
                  mainCardPosition={position}
                  cta={showCTA ? ctaComponent : undefined}
                />
              );
            })}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading && gridCardSets.length > 0 && hasMore && (
          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              onClick={handleLoadMore}
              className="!w-auto"
            >
              Load more
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && gridCardSets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg-medium text-white">No posts found.</p>
          </div>
        )}
      </Container>
    );
  }
);

FilteredPosts.displayName = "FilteredPosts";

export default FilteredPosts;

