"use client";

import React from "react";
import { clsx } from "clsx";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";
import ActionButton from "../ui/ActionButton";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageSrc: string;
  imageAlt: string;
  postTitle: string;
  slug: string;
  readTime: string;
  variant?: "dark" | "light";
  titleSize?: "normal" | "large";
  badge?: string;
  avatar?: {
    src: string;
    alt: string;
    name: string;
  };
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
      onReadClick,
      ...props
    },
    ref
  ) {
    const hasBadge = !!badge;
    const hasAvatar = !!avatar;
    const hasActionButton = hasBadge && !hasAvatar;

    const handleReadClick = () => {
      onReadClick?.(slug);
    };

    return (
      <div
        ref={ref}
        className={clsx(
          "relative flex flex-col",
          "w-full h-full",
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
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative mt-auto flex flex-col">
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
          >
            {/* Post Title */}
            <h3
              className={clsx(
                {
                  "text-card-title": titleSize === "normal",
                  "text-card-title-large": titleSize === "large",
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
                <ActionButton
                  variant={variant}
                  onClick={handleReadClick}
                >
                  Read
                </ActionButton>
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
