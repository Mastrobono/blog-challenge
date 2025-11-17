"use client";

import React, { useCallback, useMemo } from "react";
import { clsx } from "clsx";
import ActionButton from "../ui/ActionButton";
import Card from "./Card";
import { CardProps } from "./Card";
import { useRelatedPosts } from "@/hooks/useRelatedPosts";
import { useModal } from "@/contexts/ModalContext";

export interface RelatedPostsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * RelatedPosts Component
 * Fetches and displays the last 3 posts using React Query
 */
const RelatedPosts = React.forwardRef<HTMLDivElement, RelatedPostsProps>(
  function RelatedPosts({ className, ...props }, ref) {
    const { openModal } = useModal();
    const { data: posts, isLoading, error } = useRelatedPosts();

    // Handle new post click - open modal
    const handleNewPostClick = useCallback(() => {
      openModal();
    }, [openModal]);

    // Transform API posts to CardProps
    const relatedPosts: CardProps[] = useMemo(() => {
      if (!posts || posts.length === 0) return [];

      return posts.slice(0, 3).map((post) => ({
        imageSrc: post.imageUrl,
        imageAlt: post.title,
        postTitle: post.title,
        slug: `post-${post.id}`, // Generate slug from ID
        readTime: "5 min read", // Default read time, can be updated if API provides it
        badge: post.topic || "General",
        variant: "light" as const,
        titleSize: "normal" as const,
      }));
    }, [posts]);

    // Show loading state
    if (isLoading) {
      return (
        <div ref={ref} className={clsx("flex flex-col gap-[10px]", className)} {...props}>
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-h-related-tight text-neutral-black">
              Related Posts
            </h2>
            <ActionButton variant="light" onClick={handleNewPostClick}>
              New post
            </ActionButton>
          </div>
          <div className="text-center py-8 text-neutral-gray-light">
            Cargando posts...
          </div>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div ref={ref} className={clsx("flex flex-col gap-[10px]", className)} {...props}>
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-h-related-tight text-neutral-black">
              Related Posts
            </h2>
            <ActionButton variant="light" onClick={handleNewPostClick}>
              New post
            </ActionButton>
          </div>
          <div className="text-center py-8 text-status-fail">
            Error al cargar los posts. Por favor, intenta de nuevo.
          </div>
        </div>
      );
    }

    // Show empty state
    if (relatedPosts.length === 0) {
      return (
        <div ref={ref} className={clsx("flex flex-col gap-[10px]", className)} {...props}>
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-h-related-tight text-neutral-black">
              Related Posts
            </h2>
            <ActionButton variant="light" onClick={handleNewPostClick}>
              New post
            </ActionButton>
          </div>
          <div className="text-center py-8 text-neutral-gray-light">
            No hay posts disponibles. ¡Crea el primero!
          </div>
        </div>
      );
    }

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

        {/* Second Row: Post Cards in horizontal layout */}
        <div className="flex flex-col md:flex-row gap-[10px]">
          {relatedPosts.map((post, index) => (
            <div key={post.slug || index} className="flex-1" style={{ maxHeight: "378px" }}>
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

