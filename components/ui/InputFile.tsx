"use client";

import React, { useRef, useState } from "react";
import { clsx } from "clsx";

export interface InputFileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onFileChange?: (files: FileList | null) => void;
  error?: string | boolean;
}

const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      onFileChange,
      accept,
      multiple = false,
      disabled = false,
      error,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputRefFromProps = ref;
    const [isActive, setIsActive] = useState(false);

    // Merge refs for file input (support both callback refs and RefObjects)
    const setFileInputRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        fileInputRef.current = node;
        if (typeof inputRefFromProps === "function") {
          inputRefFromProps(node);
        } else if (inputRefFromProps) {
          (inputRefFromProps as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [inputRefFromProps]
    );

    const handleButtonClick = () => {
      if (fileInputRef.current && !disabled) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileChange?.(e.target.files);
      onChange?.(e);
    };

    const handleMouseDown = () => {
      if (!disabled) {
        setIsActive(true);
      }
    };

    const handleMouseUp = () => {
      setIsActive(false);
    };

    const handleMouseLeave = () => {
      setIsActive(false);
    };

    return (
      <>
        <input
          type="file"
          ref={setFileInputRef}
          className="hidden"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={handleFileChange}
          aria-label="Upload file"
          {...props}
        />
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={disabled}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={clsx(
            "w-full min-w-max px-8 py-4 h-[56px]",
            "inline-flex items-center justify-center gap-[10px]",
            "border-2",
            "bg-primary-lime text-neutral-black",
            "text-lg-medium",
            "cursor-pointer",
            "focus:outline-none",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-disabled-bg disabled:text-neutral-gray-light disabled:border-neutral-gray-light",
            {
              "!bg-primary-lime/80": isActive && !disabled,
              "border-status-fail": error,
              "border-neutral-black focus:border-neutral-black": !error,
            },
            className
          )}
          aria-label="Upload file"
        >
          <span>Upload file</span>
          <img
            src="/assets/upload-file.svg"
            alt=""
            className="w-5 h-5"
            aria-hidden="true"
          />
        </button>
      </>
    );
  }
);

InputFile.displayName = "InputFile";

export default InputFile;
