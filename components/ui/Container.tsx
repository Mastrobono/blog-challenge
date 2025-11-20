"use client";

import React from "react";
import { clsx } from "clsx";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx(
          "w-full bg-neutral-black",
          "p-6 md:px-16 md:py-16",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;

