import React from "react";
import { clsx } from "clsx";

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  size?: "default" | "large";
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, size = "default", ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={clsx(
          "rounded-full object-cover",
          size === "default" ? "w-8 h-8 md:w-10 md:h-10" : "w-10 h-10 md:w-12 md:h-12",
          className
        )}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;

