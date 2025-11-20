"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { clsx } from "clsx";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import ActionButton from "../ui/ActionButton";
import { useViewTransition } from "@/contexts/ViewTransitionContext";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  imageAlt: string;
  postTitle: string;
  slug: string;
  readTime: string;
  variant?: "dark" | "light";
  titleSize?: "normal" | "large" | "small";
  badge?: string;
  avatar?: {
    src: string;
    alt: string;
    name: string;
  };
  maxTitleWidth?: string; // Max width for the title container (e.g., "557px")
  contentPadding?: string; // Custom padding for content overlay (e.g., "px-6 pt-[174px] pb-10")
  topContent?: React.ReactNode; // Content to render at the top of the content overlay
  hideBadge?: boolean; // Hide badge when avatar is present (for post variant)
  priority?: boolean; // High priority loading for hero/first cards
  enableViewTransition?: boolean; // Enable view transition name (only for GridCard and Hero)
  onReadClick?: (slug: string) => void;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  function Card(
    {
      className,
      imageSrc,
      imageAlt,
      postTitle,
      slug,
      readTime,
      variant = "light",
      titleSize = "normal",
      badge,
      avatar,
      maxTitleWidth,
      contentPadding,
      topContent,
      hideBadge = false,
      priority = false,
      enableViewTransition = false,
      onReadClick: _onReadClick,
      ...props
    },
    ref
  ) {
    const hasBadge = !!badge && !hideBadge;
    const hasAvatar = !!avatar;
    const hasActionButton = hasBadge && !hasAvatar;
    const { registerViewTransitionName } = useViewTransition();
    const [viewTransitionName, setViewTransitionName] = useState<string | undefined>(undefined);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    // Reset image loaded state when imageSrc changes
    useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsImageLoaded(false);
    }, [imageSrc]);

    // Extract post ID from slug (format: "post-123" or "related-123")
    // Keep the full slug for the URL to maintain the prefix
    const postUrl = `/post/${slug}`;
    
    // Extract numeric ID for view transition name (remove both prefixes)
    const numericId = slug.replace(/^(post-|related-)/, "");
    
    // Apply view-transition-name only on client-side to avoid hydration mismatch
    // Only if explicitly enabled (GridCard and Hero) and in two cases:
    // 1. Cards with "Read" button (hasActionButton) - for transition from listing to post page
    // 2. Cards in post page (hasAvatar && hideBadge) - for transition destination
    // Use context to ensure only one image per postId has the transition name on each page
    useEffect(() => {
      if (typeof window === "undefined") return;
      
      const isPostPage = hasAvatar && hideBadge;
      if (enableViewTransition && (hasActionButton || isPostPage)) {
        const name = registerViewTransitionName(numericId);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setViewTransitionName(name);
      }
    }, [enableViewTransition, hasActionButton, hasAvatar, hideBadge, numericId, registerViewTransitionName]);

    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex flex-col",
          "w-full h-full flex-1 min-h-[378px]",
          "overflow-hidden",
          "p-[10px]",
          {
            "bg-neutral-black": variant === "dark",
            "bg-neutral-white": variant === "light",
          },
          className
        )}
        {...props}
      >
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Placeholder/Skeleton while loading - only for non-priority images */}
          {!priority && !isImageLoaded && (
            <div className="absolute inset-0 bg-neutral-black" />
          )}
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={clsx(
              "object-cover md:min-h-0",
              priority 
                ? "opacity-100" // Priority images should be visible immediately for LCP
                : clsx(
                    "transition-opacity duration-500 ease-in-out",
                    isImageLoaded ? "opacity-100" : "opacity-0"
                  )
            )}
            priority={priority}
            sizes={priority ? "(max-width: 768px) calc(100vw - 48px), calc(100vw - 128px)" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            quality={85}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(true)} // Still show image even if error
            style={{
              viewTransitionName: viewTransitionName,
            }}
          />
        </div>

        {/* Dark Overlay for better contrast (only for post variant) */}
        {variant === "light" && (
          <div className="absolute inset-0 bg-black/1 z-10" />
        )}

        {/* Content Overlay */}
        <div className={clsx("relative mt-auto flex flex-col z-20", contentPadding || "px-6 pt-6 pb-3")}>
          {/* Top Content (e.g., Back Button) */}
          {topContent && (
            <div className="mb-6">
              {topContent}
            </div>
          )}
          
          {/* Badge or Avatar */}
          {hasBadge && (
            <div
              className={clsx(
                "flex min-h-[54px] max-w-max items-center gap-2 px-6 pt-6",
                {
                  "bg-neutral-black": variant === "dark",
                  "bg-neutral-white": variant === "light",
                }
              )}
            >
              <Badge>{badge}</Badge>
            </div>
          )}

          {hasAvatar && (
            <div
              className={clsx(
                "flex min-h-[54px] max-w-max items-center gap-4 px-6 pt-6",
                {
                  "bg-neutral-black": variant === "dark",
                  "bg-neutral-white": variant === "light",
                }
              )}
            >
              <Avatar src={avatar.src} alt={avatar.alt} size="default" />
              <span className="text-card-author text-neutral-dark-gray">
                {avatar.name}
              </span>
            </div>
          )}

          {/* Post Title Section */}
          <div
            className={clsx("flex flex-col gap-[10px] px-6 pb-3 pt-3", {
              "bg-neutral-black": variant === "dark",
              "bg-neutral-white": variant === "light",
            })}
            style={maxTitleWidth ? { maxWidth: maxTitleWidth } : undefined}
          >
            {/* Post Title */}
            <h3
              className={clsx(
                "line-clamp-6 md:line-clamp-3",
                {
                  "text-card-title": titleSize === "normal",
                  "text-card-title-large": titleSize === "large",
                  "text-card-title-small": titleSize === "small",
                  "text-neutral-white": variant === "dark",
                  "text-neutral-black": variant === "light",
                }
              )}
            >
              {postTitle}
            </h3>

            {/* Bottom Row: ActionButton + ReadTime or just ReadTime */}
            <div
              className={clsx("flex items-center", {
                "bg-neutral-black": variant === "dark",
                "bg-neutral-white": variant === "light",
                "justify-between": hasActionButton,
                "justify-start": !hasActionButton,
              })}
            >
              {hasActionButton && (
                <Link href={postUrl} className="inline-block">
                  <ActionButton variant={variant}>
                    Read
                  </ActionButton>
                </Link>
              )}

              <div className="flex items-center gap-2">
                <img
                  src="/assets/doc-card.svg"
                  alt=""
                  className="w-5 h-5"
                  aria-hidden="true"
                />
                <span
                  className={clsx("text-card-readtime", {
                    "text-neutral-white": variant === "dark",
                    "text-neutral-dark-gray": variant === "light",
                  })}
                >
                  {readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
