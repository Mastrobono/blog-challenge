import React from "react";
import { clsx } from "clsx";

export interface LoaderBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number; // 0-100
  status?: "loading" | "success" | "failure";
  onCancel?: () => void;
  onRetry?: () => void;
}

const LoaderBar = React.forwardRef<HTMLDivElement, LoaderBarProps>(
  (
    {
      className,
      progress = 0,
      status = "loading",
      onCancel,
      onRetry,
      ...props
    },
    ref
  ) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
      <div ref={ref} className={clsx("w-full flex flex-col", className)} {...props}>
        {/* First row: Status text */}
        <div className="mb-2">
          {status === "loading" && (
            <span className="text-base-medium-tight text-neutral-black align-middle">
              Loading image {Math.round(clampedProgress)}%
            </span>
          )}
          {status === "failure" && (
            <span className="text-base-medium-tight text-neutral-black align-middle">
              Failed to upload your file
            </span>
          )}
          {status === "success" && (
            <div className="flex items-center gap-2">
              <span className="text-base-medium-tight text-neutral-black align-middle">
                Upload successful
              </span>
              <img
                src="/assets/check-successful.svg"
                alt="Success"
                className="w-5 h-5"
              />
            </div>
          )}
        </div>

        {/* Second row: Progress bar */}
        <div
          className={clsx(
            "w-full h-[10px] overflow-hidden mb-2",
            status === "loading" && "bg-neutral-gray-light",
            status === "failure" && "bg-status-fail",
            status === "success" && "bg-neutral-black"
          )}
        >
          {status === "loading" && (
            <div
              className="h-full bg-neutral-black transition-all duration-300 ease-out"
              style={{ width: `${clampedProgress}%` }}
            />
          )}
          {status === "failure" && (
            <div className="h-full w-full bg-status-fail" />
          )}
          {status === "success" && (
            <div className="h-full w-full bg-neutral-black" />
          )}
        </div>

        {/* Third row: Action button (aligned to end) */}
        <div className="flex justify-end">
          {status === "loading" && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="text-base-semibold text-neutral-black hover:text-neutral-dark-gray cursor-pointer"
            >
              Cancel
            </button>
          )}
          {status === "failure" && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="text-base-semibold text-neutral-black hover:text-neutral-dark-gray cursor-pointer"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }
);

LoaderBar.displayName = "LoaderBar";

export default LoaderBar;

