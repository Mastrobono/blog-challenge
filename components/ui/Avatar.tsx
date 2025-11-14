import React from "react";
import { clsx } from "clsx";

export interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  size?: number;
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, size = 40, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={clsx(
          "rounded-full object-cover",
          className
        )}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        {...props}
      />
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;

