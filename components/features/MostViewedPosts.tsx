"use client";

import React from "react";
import { clsx } from "clsx";
import ViewedPost from "../ui/ViewedPost";

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
    return (
      <div ref={ref} className={clsx("flex flex-col", className)} {...props}>
        {/* Label */}
        <p
          className={clsx(
            "font-sans mb-6 text-lg-semibold-tight",
            variant === "dark" ? "text-neutral-gray-light" : "text-neutral-black"
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

