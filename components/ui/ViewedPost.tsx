"use client";

import React from "react";
import { clsx } from "clsx";

export interface ViewedPostProps extends React.HTMLAttributes<HTMLDivElement> {
  postHead: string;
  imageSrc: string;
  imageAlt: string;
}

const ViewedPost = React.forwardRef<HTMLDivElement, ViewedPostProps>(
  function ViewedPost({ className, postHead, imageSrc, imageAlt, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(
          "flex items-center gap-[10px] border-b border-neutral-dark-gray",
          className
        )}
        {...props}
      >
        {/* Post Headline */}
        <p className="font-sans flex-1 text-base-semibold-tight text-neutral-gray-light">
          {postHead}
        </p>

        {/* Post Image */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-20 h-20 py-[10px] object-cover flex-shrink-0"
        />
      </div>
    );
  }
);

ViewedPost.displayName = "ViewedPost";

export default ViewedPost;

