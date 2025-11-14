"use client";

import React from "react";
import Button from "./Button";

export interface UploadFileProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  onFileChange?: (files: FileList | null) => void;
  // React Hook Form compatibility - these props are passed through to the input
}

const UploadFile = React.forwardRef<HTMLInputElement, UploadFileProps>(
  (
    {
      onFileChange,
      accept,
      multiple = false,
      disabled = false,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onFileChange?.(e.target.files);
      onChange?.(e);
    };

    return (
      <Button
        variant="file-upload"
        asFileInput={true}
        disabled={disabled}
        className={className}
        fileInputProps={{
          accept,
          multiple,
          onChange: handleFileChange,
          ref,
          ...props,
        }}
        icon={
          <img
            src="/assets/upload-file.svg"
            alt="Upload"
            className="w-5 h-5"
          />
        }
        iconPosition="right"
      >
        Upload file
      </Button>
    );
  }
);

UploadFile.displayName = "UploadFile";

export default UploadFile;

