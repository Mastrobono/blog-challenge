"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { clsx } from "clsx";
import InputText from "../ui/InputText";
import InputFile from "../ui/InputFile";
import LoaderBar from "../ui/LoaderBar";
import Button from "../ui/Button";

export interface ModalFormData {
  title: string;
  image: FileList | null;
}

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  headline?: string;
  subheadline?: string;
  successText?: string;
  buttonText?: string;
  successButtonText?: string;
  onClose?: () => void;
  onSubmit?: (data: ModalFormData) => Promise<void>;
}

// Mock API function for uploading image locally (client-side)
// NOTE: This simulates client-side image processing/validation
// In production, this would upload to a temporary storage or process the image
const mockUploadImageLocal = async (file: File): Promise<File> => {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return file;
};

// Mock API function for submitting the form
// NOTE: Error handling flags:
// - Image upload errors: Handled with retry/cancel (localUploadStatus === "failure")
// - Form submission errors: Assumed to always succeed per requirements
//   If submission fails in production, it would be handled by the onSubmit callback
const mockSubmitPost = async (data: ModalFormData): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log("Post submitted:", data);
};

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  function Modal(
    {
      className,
      headline = "Upload your post",
      subheadline = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse commodo libero.",
      successText = "Your post was successfully uploaded!",
      buttonText = "Confirm",
      successButtonText = "Done",
      onClose,
      onSubmit,
      ...props
    },
    ref
  ) {
    const [localUploadProgress, setLocalUploadProgress] = useState(0);
    const [localUploadStatus, setLocalUploadStatus] = useState<"idle" | "loading" | "success" | "failure">("idle");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [imageError, setImageError] = useState(false);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      watch,
      reset,
      setValue,
      trigger,
    } = useForm<ModalFormData>({
      defaultValues: {
        title: "",
        image: null,
      },
    });

    const imageFile = watch("image");

    // Mutation for local image upload (when file is selected)
    const imageUploadMutation = useMutation({
      mutationFn: async (file: File) => {
        // Validate file type before starting upload
        if (!file.type.startsWith("image/")) {
          setLocalUploadStatus("failure");
          throw new Error("File must be an image");
        }

        setLocalUploadProgress(0);
        setLocalUploadStatus("loading");
        
        // Clear any existing interval
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        
        // Simulate progress updates
        return new Promise<File>((resolve, reject) => {
          let progress = 0;
          const progressInterval = setInterval(() => {
            progress += 10;
            setLocalUploadProgress(progress);
            
            // Simulate potential failure at 60%
            if (progress === 60 && Math.random() < 0.2) {
              clearInterval(progressInterval);
              progressIntervalRef.current = null;
              setLocalUploadStatus("failure");
              reject(new Error("Failed to upload image"));
              return;
            }
            
            if (progress >= 100) {
              clearInterval(progressInterval);
              progressIntervalRef.current = null;
              mockUploadImageLocal(file)
                .then((result) => {
                  setLocalUploadStatus("success");
                  setUploadedFile(result);
                  // Keep success state for 1 second before resolving
                  setTimeout(() => {
                    resolve(result);
                  }, 1000);
                })
                .catch((error) => {
                  setLocalUploadStatus("failure");
                  reject(error);
                });
            }
          }, 200);
          
          progressIntervalRef.current = progressInterval;
        });
      },
    });

    // Mutation for form submission
    const submitMutation = useMutation({
      mutationFn: async (data: ModalFormData) => {
        if (onSubmit) {
          return await onSubmit(data);
        }
        return await mockSubmitPost(data);
      },
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error) => {
        console.error("Submit error:", error);
        // Error handling: show error message (we assume submit always succeeds per requirements)
      },
    });

    // Handle file selection - trigger local upload
    useEffect(() => {
      if (imageFile && imageFile.length > 0 && localUploadStatus === "idle") {
        const file = imageFile[0];
        
        // Clear error when file is selected
        setImageError(false);
        
        // Validate file type before starting upload
        if (!file.type.startsWith("image/")) {
          setLocalUploadStatus("failure");
          setLocalUploadProgress(0);
          return;
        }
        
        imageUploadMutation.mutate(file);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageFile, localUploadStatus]);

    // Reset local upload state when image is cleared
    useEffect(() => {
      if (!imageFile || imageFile.length === 0) {
        // Clear progress interval if it exists
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setLocalUploadProgress(0);
        setLocalUploadStatus("idle");
        setUploadedFile(null);
        setImageError(false);
        imageUploadMutation.reset();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageFile]);

    // Cleanup interval on unmount
    useEffect(() => {
      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      };
    }, []);

    const onFormSubmit = async (data: ModalFormData) => {
      // Validate title field
      const isTitleValid = await trigger("title");
      
      // Validate image
      const isImageValid = localUploadStatus === "success" && uploadedFile;
      
      // If title is invalid, react-hook-form will show the error automatically
      if (!isTitleValid) {
        // Title error is handled by react-hook-form
      }
      
      // If image is missing, show error state
      if (!isImageValid) {
        setImageError(true);
      }
      
      // Only submit if both are valid
      if (!isTitleValid || !isImageValid) {
        return;
      }
      
      // Clear errors if both are valid
      setImageError(false);
      submitMutation.mutate(data);
    };

    const handleSuccessButtonClick = () => {
      reset();
      setIsSuccess(false);
      setLocalUploadProgress(0);
      setLocalUploadStatus("idle");
      setUploadedFile(null);
      setImageError(false);
      imageUploadMutation.reset();
      submitMutation.reset();
      onClose?.();
    };

    const handleCancelUpload = () => {
      // Clear progress interval if it exists
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
      // Cancel the mutation
      imageUploadMutation.reset();
      
      // Reset all states
      setLocalUploadProgress(0);
      setLocalUploadStatus("idle");
      setUploadedFile(null);
      setImageError(false);
      
      // Clear the file input
      setValue("image", null);
    };

    const handleRetryUpload = () => {
      // Reset everything and go back to InputFile state
      // Clear progress interval if it exists
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
      // Cancel the mutation
      imageUploadMutation.reset();
      
      // Reset all states
      setLocalUploadProgress(0);
      setLocalUploadStatus("idle");
      setUploadedFile(null);
      setImageError(false);
      
      // Clear the file input to allow selecting a new file or the same file again
      setValue("image", null);
    };

    const showLoaderBar = localUploadStatus === "loading" || localUploadStatus === "success" || localUploadStatus === "failure";
    const isSubmitting = submitMutation.isPending;

    return (
      <div
        ref={ref}
        className={clsx(
          "w-full md:w-[640px]",
          "bg-primary-lime border-2 border-neutral-black",
          "shadow-hard-black",
          "p-10",
          className
        )}
        {...props}
      >
        {/* Close Button */}
        <div className="block p-[10px] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Close modal"
          >
            <img
              src="/assets/mark-modal.svg"
              alt="Close"
              className="w-full h-full"
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-6">
          {/* Headline and Subheadline Container */}
          <div className="w-full md:max-w-[480px] flex flex-col items-center gap-6">
            {/* Headline */}
            {!isSuccess ? (
              <h2 className="text-h-modal-tight text-center font-sans text-brand-indigo">
                {headline}
              </h2>
            ) : (
              <h2 className="text-h-modal-tight text-center font-sans text-brand-indigo">
                {successText}
              </h2>
            )}

            {/* Subheadline (only show in form state) */}
            {!isSuccess && (
              <p className="text-b-modal text-center font-sans text-neutral-dark-gray">
                {subheadline}
              </p>
            )}
          </div>

          {/* Form Content */}
          {!isSuccess && (
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="w-full flex flex-col items-center gap-6"
            >
              {/* Inputs Container */}
              <div className="w-full md:max-w-[400px] flex flex-col gap-6">
                {/* Input Text */}
                <InputText
                  {...register("title", {
                    required: "Post title is required",
                    onChange: () => {
                      // Clear image error when user starts typing (in case it was set)
                      if (imageError && localUploadStatus === "success" && uploadedFile) {
                        setImageError(false);
                      }
                    },
                  })}
                  placeholder="Post Title"
                  error={errors.title?.message}
                  disabled={isSubmitting}
                />

                {/* Input File or LoaderBar */}
                {!showLoaderBar ? (
                  <Controller
                    name="image"
                    control={control}
                    rules={{ required: "Image is required" }}
                    render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
                      <div className="flex flex-col">
                        <InputFile
                          {...field}
                          accept="image/*"
                          disabled={isSubmitting}
                          error={imageError}
                          onFileChange={(files) => {
                            onChange(files);
                          }}
                        />
                        {error && (
                          <div className="mt-1 text-xs-label text-status-fail">
                            {error.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                ) : (
                  <LoaderBar
                    progress={localUploadProgress}
                    status={
                      localUploadStatus === "success"
                        ? "success"
                        : localUploadStatus === "failure"
                        ? "failure"
                        : "loading"
                    }
                    onCancel={localUploadStatus === "loading" ? handleCancelUpload : undefined}
                    onRetry={localUploadStatus === "failure" ? handleRetryUpload : undefined}
                    onChange={localUploadStatus === "success" ? handleCancelUpload : undefined}
                  />
                )}
              </div>

              {/* Submit Button */}
              {!isSubmitting && (
                <div className="flex justify-center">
                  <Button
                    variant="black"
                    className="!w-auto"
                    disabled={isSubmitting || localUploadStatus === "failure"}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(onFormSubmit)();
                    }}
                  >
                    {buttonText}
                  </Button>
                </div>
              )}
            </form>
          )}

          {/* Success Button */}
          {isSuccess && (
            <div className="flex justify-center">
              <Button
                variant="black"
                className="!w-auto"
                onClick={handleSuccessButtonClick}
              >
                {successButtonText}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
