"use client";

import React from "react";
import { useRelatedPostById } from "@/hooks/useRelatedPosts";
import { mapRelatedPostToCardProps } from "@/lib/posts";
import { CardProps } from "./Card";
import Hero from "./Hero";

export interface RelatedPostHeroProps {
  postId: number;
  fallbackCardProps?: CardProps; // Server-fetched data as fallback
  showBackButton?: boolean;
}

/**
 * RelatedPostHero Component
 * Uses React Query cache when available, falls back to server data
 */
const RelatedPostHero = React.forwardRef<HTMLDivElement, RelatedPostHeroProps>(
  function RelatedPostHero({ postId, fallbackCardProps, showBackButton = true, ...props }, ref) {
    // Try to get post from React Query cache first
    const cachedPost = useRelatedPostById(postId);
    
    // Use cached data if available, otherwise use fallback from server
    const cardProps: CardProps = React.useMemo(() => {
      if (cachedPost) {
        // Use data from React Query cache
        return {
          ...mapRelatedPostToCardProps(cachedPost),
          avatar: {
            src: `https://i.pravatar.cc/150?img=${postId % 10}`,
            alt: "Author",
            name: "Author",
          },
        };
      }
      
      // Fallback to server data
      if (fallbackCardProps) {
        return fallbackCardProps;
      }
      
      // Should not happen, but provide a fallback
      return {
        imageSrc: "/assets/hero-placeholder.png",
        imageAlt: "Post",
        postTitle: "Loading...",
        slug: `related-${postId}`,
        readTime: "5 min",
        badge: "General",
        variant: "light" as const,
        titleSize: "large" as const,
      };
    }, [cachedPost, fallbackCardProps, postId]);

    return (
      <Hero
        ref={ref}
        variant="post"
        className="!mt-0"
        card={cardProps}
        showBackButton={showBackButton}
        {...props}
      />
    );
  }
);

RelatedPostHero.displayName = "RelatedPostHero";

export default RelatedPostHero;

