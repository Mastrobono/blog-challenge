"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { clsx } from "clsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helpText,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const internalRef = useRef<HTMLInputElement>(null);

    // Merge refs: support both callback refs and RefObjects
    const inputRef = useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    // Determine if input has value
    useEffect(() => {
      const currentValue = value ?? defaultValue ?? internalRef.current?.value ?? "";
      setHasValue(!!currentValue);
    }, [value, defaultValue]);

    // Determine current state
    const isFilled = hasValue || (value !== undefined && value !== "");
    const isError = !!error;
    const isActive = isFocused || isFilled;

    // Base classes
    const baseClasses =
      "w-full h-14 px-2 text-lg-medium transition-all duration-200 focus:outline-none";

    // State-specific classes
    const stateClasses = clsx({
      // Default state
      "border-t-2 border-neutral-black bg-neutral-white text-neutral-gray-light":
        !isFocused && !isFilled && !isError && !disabled,
      // Focused state
      "border-t-2 border-neutral-black bg-neutral-white text-brand-indigo shadow-[0_0_0_4px_hsl(275,47%,90%)]":
        isFocused && !isError && !disabled,
      // Filled state (when has value but not focused)
      "border-t-2 border-neutral-black bg-neutral-white text-brand-indigo":
        !isFocused && isFilled && !isError && !disabled,
      // Error state
      "border-t-2 border-status-fail bg-neutral-white text-brand-indigo":
        isError && !disabled,
      // Disabled state
      "border-2 border-neutral-gray-light bg-neutral-lightest text-neutral-gray-light cursor-not-allowed":
        disabled,
    });

    // Label classes
    const labelClasses = clsx(
      "absolute left-2 transition-all duration-200 pointer-events-none",
      {
        // Default position (inside input)
        "top-1/2 -translate-y-1/2 text-base-placeholder text-neutral-gray-light":
          !isActive && !disabled,
        // Floating position (above input)
        "top-0 translate-y-[-50%] text-xs-label text-neutral-black bg-neutral-white px-1":
          isActive || disabled,
        // Error label color
        "text-status-fail": isError && isActive,
        // Disabled label color
        "text-neutral-gray-light": disabled,
      }
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      onChange?.(e);
    };

    return (
      <div className={clsx("relative", className)}>
        {label && (
          <label
            htmlFor={props.id}
            className={labelClasses}
          >
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          className={clsx(baseClasses, stateClasses)}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={!label ? props.placeholder : undefined}
          {...props}
        />
        {(error || helpText) && (
          <div
            className={clsx(
              "mt-1 text-xs-label px-1",
              {
                "text-status-fail bg-status-fail/20": error,
                "text-neutral-dark-gray": !error && helpText,
              }
            )}
          >
            {error || helpText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

