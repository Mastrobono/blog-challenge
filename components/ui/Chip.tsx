import React from "react";
import { clsx } from "clsx";

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ className, active = false, onRemove, children, ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center gap-2 h-[46px] px-4 rounded-[56px] transition-all duration-200";

    const stateClasses = clsx({
      // Active (Selected) state
      "bg-primary-lime text-neutral-black": active,
      // Default (Unselected) state
      "bg-transparent text-neutral-gray-light border border-neutral-gray-light":
        !active,
    });

    return (
      <div
        ref={ref}
        className={clsx(baseClasses, stateClasses, className)}
        {...props}
      >
        <span className="text-lg-medium">{children}</span>
        {active && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 flex items-center justify-center w-5 h-5 rounded-full hover:bg-neutral-black/10 transition-colors"
            aria-label="Remove"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = "Chip";

export default Chip;

