"use client";

import React, { useCallback } from "react";
import { clsx } from "clsx";
import ActionButton from "../ui/ActionButton";
import Card from "./Card";
import { CardProps } from "./Card";

export interface RelatedPostsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * RelatedPosts Component
 * 
 * NOTE: Currently using mocked data. Once the Modal component is integrated,
 * posts will be loaded via React Query and displayed here.
 */
const RelatedPosts = React.forwardRef<HTMLDivElement, RelatedPostsProps>(
  function RelatedPosts({ className, ...props }, ref) {
    // Handle new post click internally
    const handleNewPostClick = useCallback(() => {
      console.log("New post clicked");
      // TODO: Open modal or navigate to new post page
    }, []);

    // Cards now use Link for navigation, so no need for handleReadClick

    // Mock posts - TODO: Replace with React Query data from Modal
    const mockRelatedPosts: CardProps[] = [
      {
        imageSrc: "/assets/hero-placeholder.png",
        imageAlt: "Related post 1",
        postTitle: "Related Post Title 1",
        slug: "related-post-1",
        readTime: "5 min read",
        badge: "Technology",
        variant: "light",
        titleSize: "normal",
      },
      {
        imageSrc: "/assets/hero-placeholder.png",
        imageAlt: "Related post 2",
        postTitle: "Related Post Title 2",
        slug: "related-post-2",
        readTime: "7 min read",
        badge: "AI",
        variant: "light",
        titleSize: "normal",
      },
      {
        imageSrc: "/assets/hero-placeholder.png",
        imageAlt: "Related post 3",
        postTitle: "Related Post Title 3",
        slug: "related-post-3",
        readTime: "4 min read",
        badge: "Security",
        variant: "light",
        titleSize: "normal",
      },
    ];

    return (
      <div ref={ref} className={clsx("flex flex-col gap-[10px]", className)} {...props}>
        {/* First Row: Title and ActionButton */}
        <div className="flex items-center justify-between">
          <h2 className="font-sans text-h-related-tight text-neutral-black">
            Related Posts
          </h2>
          <ActionButton variant="light" onClick={handleNewPostClick}>
            New post
          </ActionButton>
        </div>

        {/* Second Row: 3 Post Cards in horizontal layout */}
        <div className="flex flex-col md:flex-row gap-[10px]">
          {mockRelatedPosts.map((post, index) => (
            <div key={index} className="flex-1" style={{ maxHeight: "378px" }}>
              <Card {...post} className="h-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

RelatedPosts.displayName = "RelatedPosts";

export default RelatedPosts;

