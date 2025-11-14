import React from "react";
import { clsx } from "clsx";

export interface LoaderBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress?: number; // 0-100
  status?: "loading" | "success" | "failure";
  showText?: boolean;
  auxiliaryText?: string;
  onCancel?: () => void;
  onRetry?: () => void;
}

const LoaderBar = React.forwardRef<HTMLDivElement, LoaderBarProps>(
  (
    {
      className,
      progress = 0,
      status = "loading",
      showText = true,
      auxiliaryText,
      onCancel,
      onRetry,
      ...props
    },
    ref
  ) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    // Track color based on status
    const trackColor = clsx({
      "bg-neutral-gray-light": status === "loading",
      "bg-status-fail": status === "failure",
      "bg-neutral-black": status === "success",
    });

    // Progress color - same for loading and success (both use neutral-black)
    const progressColor = clsx({
      "bg-neutral-black": status === "loading" || status === "success",
      "bg-status-fail": status === "failure",
    });

    return (
      <div ref={ref} className={clsx("w-full", className)} {...props}>
        {status === "success" ? (
          // Success state - show checkmark icon
          // TODO: Replace with actual checkmark.svg asset when available
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.6667 5L7.50004 14.1667L3.33337 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {showText && (
              <span className="text-base-placeholder text-neutral-black">
                Complete
              </span>
            )}
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div
              className={clsx(
                "w-full h-[10px] rounded-sm overflow-hidden",
                trackColor
              )}
            >
              <div
                className={clsx(
                  "h-full transition-all duration-300 ease-out",
                  progressColor
                )}
                style={{ width: `${clampedProgress}%` }}
              />
            </div>

            {/* Status text and auxiliary actions */}
            <div className="flex items-center justify-between mt-2">
              {showText && (
                <span className="text-base-placeholder text-neutral-black">
                  {status === "loading"
                    ? `Loading ${Math.round(clampedProgress)}%`
                    : status === "failure"
                    ? "Failed"
                    : ""}
                </span>
              )}
              <div className="flex items-center gap-2">
                {auxiliaryText && (
                  <span className="text-base-placeholder text-neutral-black">
                    {auxiliaryText}
                  </span>
                )}
                {status === "loading" && onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="text-base-placeholder text-neutral-black hover:text-neutral-dark-gray underline"
                  >
                    Cancel
                  </button>
                )}
                {status === "failure" && onRetry && (
                  <button
                    type="button"
                    onClick={onRetry}
                    className="text-base-placeholder text-neutral-black hover:text-neutral-dark-gray underline"
                  >
                    Retry
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

LoaderBar.displayName = "LoaderBar";

export default LoaderBar;

