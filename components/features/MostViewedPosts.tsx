"use client";

import React from "react";
import { clsx } from "clsx";
import ViewedPost from "../ui/ViewedPost";
import { useFiltersOptional } from "@/contexts/FilterContext";

export interface MostViewedPost {
  id: number;
  postHead: string;
  imageSrc: string;
  imageAlt: string;
}

export interface MostViewedPostsProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: MostViewedPost[];
  variant?: "dark" | "light";
}

const MostViewedPosts = React.forwardRef<HTMLDivElement, MostViewedPostsProps>(
  function MostViewedPosts({ className, posts, variant = "dark", ...props }, ref) {
    const filterContext = useFiltersOptional();
    const hasLoadMoreButton = filterContext?.hasLoadMoreButton ?? false;
    
    // Calculate padding to align with last card
    // Base: pb-14 (3.5rem = 56px) from FilteredPosts container
    // With button: gap-10 (2.5rem = 40px) + pt-8/pt-4 (2rem/1rem = 32px/16px) + button height (3.5rem = 56px) + pb-14 (3.5rem = 56px)
    const paddingBottom = hasLoadMoreButton 
      ? "pb-[184px] md:pb-[168px]" // Total: 184px mobile / 168px desktop
      : "pb-14"; // 3.5rem = 56px
    
    return (
      <div ref={ref} className={clsx("flex flex-col", paddingBottom, className)} {...props}>

        <p
          className={clsx(
            "mb-6 text-lg-semibold-tight font-space-grotesk",
            variant === "dark" ? "text-neutral-white" : "text-neutral-black"
          )}
        >
          Most viewed
        </p>

        {/* Posts List */}
        <div className="flex flex-col">
          {posts.map((post) => (
           
              <ViewedPost
                key={post.id}
                postHead={post.postHead}
                imageSrc={post.imageSrc}
                imageAlt={post.imageAlt}
              />
          ))}
        </div>
      </div>
    );
  }
);

MostViewedPosts.displayName = "MostViewedPosts";

export default MostViewedPosts;

