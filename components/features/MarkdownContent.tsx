"use client";

import React from "react";
import { clsx } from "clsx";

export interface MarkdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  htmlContent: string;
}

/**
 * MarkdownContent Component
 * Renders parsed markdown HTML with custom styles for post content
 */
const MarkdownContent = React.forwardRef<HTMLDivElement, MarkdownContentProps>(
  function MarkdownContent({ className, htmlContent, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(
          // Base styles - reset prose defaults and override
          "prose prose-lg max-w-none mb-[56px]",
          // Remove default prose styles
          "[&_*]:!font-sans",
          // Markdown Post Content Styles
          // h1 styles
          "[&_h1]:!font-sans [&_h1]:!text-markdown-h1 [&_h1]:!font-bold [&_h1]:!text-neutral-black [&_h1]:!leading-[1.5] [&_h1]:!align-middle [&_h1]:!m-0 [&_h1]:!mb-3",
          // p styles - override prose defaults completely
          "[&_p]:!font-sans [&_p]:!text-[16px] [&_p]:!font-normal [&_p]:!text-[#595959] [&_p]:!leading-[1.8] [&_p]:md:!leading-[1.7] [&_p]:!align-middle [&_p]:!tracking-[0px] [&_p]:!m-0",
          // p with mb-large class - margin bottom 64px
          "[&_p.mb-large]:!mb-16",
          // span inside p styles (for underlined text)
          "[&_p_span]:!font-sans [&_p_span]:!text-[16px] [&_p_span]:!font-normal [&_p_span]:!text-markdown-text-underline [&_p_span]:!leading-[1.8] [&_p_span]:!align-middle [&_p_span]:!underline [&_p_span]:!tracking-[0px]",
          // blockquote styles - border left 4px, padding left/right 24px, margin left/right 32px, margin bottom 64px
          "[&_blockquote]:!border-l-4 [&_blockquote]:!border-[#d8f34e] [&_blockquote]:!p-6 [&_blockquote]:!mx-8 [&_blockquote]:!mb-16 [&_blockquote]:!mt-0",
          // blockquote p styles - Space Grotesk, bold, 19px mobile / 21px desktop, line-height 150%, color black
          "[&_blockquote_p]:!font-sans [&_blockquote_p]:!text-[19px] [&_blockquote_p]:md:!text-[21px] [&_blockquote_p]:!font-bold [&_blockquote_p]:!text-neutral-black [&_blockquote_p]:!leading-[1.5] [&_blockquote_p]:!align-middle [&_blockquote_p]:!tracking-[0px] [&_blockquote_p]:!m-0",
          // img styles - margin top and bottom 64px
          "[&_img]:!my-16 [&_img]:!block",
          className
        )}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        {...props}
      />
    );
  }
);

MarkdownContent.displayName = "MarkdownContent";

export default MarkdownContent;

