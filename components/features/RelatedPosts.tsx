"use client";

import React, { useCallback, useMemo } from "react";
import { clsx } from "clsx";
import ActionButton from "../ui/ActionButton";
import Card, { CardProps } from "./Card";
import CardShimmer from "./CardShimmer";
import { useRelatedPosts } from "@/hooks/useRelatedPosts";
import { useModal } from "@/contexts/ModalContext";

export interface RelatedPostsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Post ID to exclude from the list (current post)
   */
  excludePostId?: number;
}

/**
 * RelatedPosts Component
 * Fetches and displays the last 3 posts using React Query
 */
const RelatedPosts = React.forwardRef<HTMLDivElement, RelatedPostsProps>(
  function RelatedPosts({ className, excludePostId, ...props }, ref) {
    const { openModal } = useModal();
    const { data: posts, isLoading, error } = useRelatedPosts();

    // Handle new post click - open modal
    const handleNewPostClick = useCallback(() => {
      openModal();
    }, [openModal]);

    // Transform API posts to CardProps and filter out current post
    const relatedPosts: CardProps[] = useMemo(() => {
      if (!posts || posts.length === 0) return [];

      // Filter out the current post if excludePostId is provided
      const filteredPosts = excludePostId 
        ? posts.filter((post) => post.id !== excludePostId)
        : posts;

      return filteredPosts.slice(0, 3).map((post) => ({
        imageSrc: post.imageUrl,
        imageAlt: post.title,
        postTitle: post.title,
        slug: `related-${post.id}`, // Generate slug with related prefix to differentiate from API posts
        readTime: "5 min", // Default read time, can be updated if API provides it
        badge: post.topic || "General",
        variant: "light" as const,
        titleSize: "normal" as const,
      }));
    }, [posts, excludePostId]);

    // Show loading state with shimmers only if no data exists (initial load)
    // If data exists but isFetching, show stale data (background revalidation)
    if (isLoading && !posts) {
      return (
        <div ref={ref} className={clsx("flex flex-col gap-[10px] ", className)} {...props}>
          <div className="flex items-center justify-between">
            <h2 className="text-h-related-tight text-neutral-black font-space-grotesk">
              Related Posts
            </h2>
            <ActionButton variant="light" onClick={handleNewPostClick}>
              New post
            </ActionButton>
          </div>
          {/* Shimmer Cards - 3 cards of equal size */}
          <div className="flex flex-col md:flex-row gap-[10px]">
            {[1, 2, 3].map((index) => (
              <div key={index} className="flex-1" style={{ maxHeight: "378px" }}>
                <CardShimmer variant="light" className="h-full" />
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Show error state
    if (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load posts";
      const errorDetails = error instanceof Error && (error as any).status 
        ? ` (Status: ${(error as any).status})` 
        : "";
      
      return (
        <div ref={ref} className={clsx("flex flex-col gap-[10px] ", className)} {...props}>
          <div className="flex items-center justify-between">
            <h2 className="text-h-related-tight text-neutral-black font-space-grotesk">
              Related Posts
            </h2>
            <ActionButton variant="light" onClick={handleNewPostClick}>
              New post
            </ActionButton>
          </div>
          <div className="text-center py-8 text-status-fail">
            <p>Failed to load posts. Please try again.</p>
            {process.env.NODE_ENV === "development" && (
              <p className="text-xs mt-2 opacity-75">{errorMessage}{errorDetails}</p>
            )}
          </div>
        </div>
      );
    }

    // Show empty state
    if (relatedPosts.length === 0) {
      return (
        <div ref={ref} className={clsx("flex flex-col gap-[10px] ", className)} {...props}>
          <div className="flex items-center justify-between">
            <h2 className="text-h-related-tight text-neutral-black font-space-grotesk">
              Related Posts
            </h2>
            <ActionButton variant="light" onClick={handleNewPostClick}>
              New post
            </ActionButton>
          </div>
          <div className="text-center py-8 text-neutral-gray-light">
            No posts available. Create the first one!
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={clsx("flex flex-col gap-[10px] ", className)} {...props}>
        {/* First Row: Title and ActionButton */}
        <div className="flex items-center justify-between">
          <h2 className="text-h-related-responsive text-neutral-black font-space-grotesk">
            Related Posts
          </h2>
          <ActionButton variant="light" onClick={handleNewPostClick}>
            New post
          </ActionButton>
        </div>

        {/* Second Row: Post Cards in horizontal scrollable layout */}
        <div className="pb-2 md:pb-0">
          {/* Mobile: wrapper with padding so scrollbar starts from content */}
          <div className="-mx-6 px-6 md:hidden">
            <div className="overflow-x-auto custom-scrollbar-light pb-3">
              <div className="flex gap-[10px] min-w-max">
                {relatedPosts.map((post, index) => (
                  <div 
                    key={post.slug || index} 
                    className="flex-shrink-0 w-[calc(83.33vw-40px)]" 
                    style={{ maxHeight: "378px" }}
                  >
                    <Card {...post} className="h-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Desktop: no wrapper, scrollbar starts from edge */}
          <div className="hidden md:block overflow-x-auto custom-scrollbar-light">
            <div className="flex md:flex-row gap-[10px]">
              {relatedPosts.map((post, index) => (
                <div 
                  key={post.slug || index} 
                  className="flex-1" 
                  style={{ maxHeight: "378px" }}
                >
                  <Card {...post} className="h-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

RelatedPosts.displayName = "RelatedPosts";

export default RelatedPosts;

