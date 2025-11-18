import React from "react";
import { clsx } from "clsx";

type ChipPropsBase = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export type ChipProps =
  | (ChipPropsBase & {
      variant?: "default";
      onRemove?: () => void;
    })
  | (ChipPropsBase & {
      variant: "active";
      onRemove: () => void;
    });

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, variant = "default", onRemove, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center gap-2 h-[46px] px-4 rounded-[56px] transition-all duration-200 cursor-pointer";

    const stateClasses = clsx({
      // Active (Selected) state - always has remove button
      "bg-primary-lime text-neutral-black": variant === "active",
      // Default (Unselected) state
      "bg-transparent text-neutral-gray-light border border-neutral-gray-light":
        variant === "default",
    });

    return (
      <div
        ref={ref}
        className={clsx(baseClasses, stateClasses, className)}
        {...props}
      >
        <span className="text-base-regular align-middle ">{children}</span>
        {variant === "active" && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 flex items-center justify-center w-5 h-5 rounded-full hover:bg-neutral-black/10 transition-colors cursor-pointer"
            aria-label="Remove"
          >
            <img
              src="/assets/mark-chip.svg"
              alt="Remove"
              className="w-4 h-4"
            />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export default Chip;

