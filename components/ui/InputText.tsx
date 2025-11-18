"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { clsx } from "clsx";

export type ValidationFunction = (value: string) => string | null | undefined;

export interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; // External error (takes precedence)
  helpText?: string;
  validate?: ValidationFunction; // Internal validation function
  validateOnBlur?: boolean; // Validate when input loses focus (default: true)
  validateOnChange?: boolean; // Validate while typing (default: false)
  onValidationChange?: (error: string | null) => void; // Callback when validation state changes
}

const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      className,
      label,
      error: externalError,
      helpText,
      disabled,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      validate,
      validateOnBlur = true,
      validateOnChange = false,
      onValidationChange,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);
    const internalRef = useRef<HTMLInputElement>(null);

    // Use external error if provided, otherwise use internal validation error
    const error = externalError || internalError || null;

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

    // Determine current input value (works for both controlled and uncontrolled)
    const getInputValue = () => {
      if (value !== undefined) {
        return value;
      }
      // For uncontrolled, check the ref value (updated by handleChange)
      return internalRef.current?.value ?? defaultValue ?? "";
    };

    // Sync hasValue with actual input value on mount and when props change
    useEffect(() => {
      const currentValue = getInputValue();
      const hasValueNow = !!currentValue && currentValue !== "";
      setHasValue(hasValueNow);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, defaultValue]);

    // Validate initial value if validateOnChange is enabled
    useEffect(() => {
      if (validateOnChange && validate) {
        const initialValue = String(value ?? defaultValue ?? "");
        if (initialValue) {
          performValidation(initialValue);
        }
      }
    }, []); // Only run on mount

    // Determine current state - use hasValue (updated by handleChange) as primary source
    // Also check currentValue as fallback for immediate updates
    const currentValue = getInputValue();
    const isFilled = hasValue || (!!currentValue && currentValue !== "");
    const isError = !!error;
    const isActive = isFocused && !isError && !disabled;
    // Label shows ONLY when input is active (focused) AND does NOT have a value
    const showLabel = !!(label && isActive && !isFilled && !disabled);
    
    // Debug logs (remove in production)
    if (process.env.NODE_ENV === 'development' && label) {
      console.log('🏷️ [InputText] Label state:', {
        label,
        hasValue,
        currentValue: String(currentValue),
        isFilled,
        isFocused,
        isActive,
        isError,
        disabled,
        showLabel,
      });
    }

    // Base classes - placeholder and written text use text-base-placeholder
    // Add padding-top when label is present and input is active
    const inputPadding = label && showLabel ? "pt-6" : "pt-2";
    const baseClasses = clsx(
      "w-full h-14 px-2 pb-2 text-base-placeholder transition-all duration-200 focus:outline-none align-bottom",
      inputPadding
    );

    // State-specific classes with transitions
    const stateClasses = clsx({
      // Default state - placeholder color
      "border-2 border-neutral-black bg-neutral-white text-neutral-gray-light transition-all duration-200":
        !isFocused && !isFilled && !isError && !disabled,
      // Active state (focused) - shadow violeta
      "border-2 border-neutral-black bg-neutral-white text-brand-indigo shadow-input-active transition-all duration-200":
        isActive,
      // Filled state (when has value but not focused) - transition immediately when typing
      "border-2 border-neutral-black bg-neutral-white text-brand-indigo transition-all duration-200":
        !isFocused && isFilled && !isError && !disabled,
      // Error state - same as filled but with red border
      "border-2 border-status-fail bg-neutral-white text-brand-indigo transition-all duration-200":
        isError && !disabled,
      // Disabled state
      "border-2 border-neutral-gray-light bg-neutral-lightest text-neutral-gray-light cursor-not-allowed":
        disabled,
    });

    // Label classes - shown when there's a value (filled) or active, with CSS transition
    const labelClasses = clsx(
      "absolute left-2 top-2 pointer-events-none text-xs-label text-brand-indigo align-middle transition-all duration-200",
      showLabel ? "opacity-100 visible" : "opacity-0 invisible"
    );

    // Internal validation function
    const performValidation = useCallback(
      (inputValue: string) => {
        if (!validate) {
          return null;
        }

        const validationResult = validate(inputValue);
        const errorMessage = validationResult || null;
        
        setInternalError(errorMessage);
        onValidationChange?.(errorMessage);
        
        return errorMessage;
      },
      [validate, onValidationChange]
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      
      // Validate on blur if enabled
      if (validateOnBlur && validate) {
        const inputValue = e.target.value;
        performValidation(inputValue);
      }
      
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setHasValue(!!newValue);
      
      // Validate on change if enabled (validate first, then decide if we need to clear)
      if (validateOnChange && validate) {
        performValidation(newValue);
      } else {
        // Only clear error if not validating on change (let validation handle it)
        if (!externalError && internalError) {
          setInternalError(null);
          onValidationChange?.(null);
        }
      }
      
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
          placeholder={!label && !isFilled ? (props.placeholder || "Post title") : undefined}
          {...props}
        />
        {error && (
          <div className="mt-1 text-xs-label text-status-fail">
            {error}
          </div>
        )}
      </div>
    );
  }
);

InputText.displayName = "InputText";

export default InputText;

