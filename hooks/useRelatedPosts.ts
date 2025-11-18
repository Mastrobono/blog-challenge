"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRelatedPosts, createPost, CreatePostData, RelatedPost } from "@/services/postsApi";

/**
 * Hook to fetch related posts using React Query
 * Optimized for immediate execution and fast loading
 */
export function useRelatedPosts() {
  return useQuery<RelatedPost[]>({
    queryKey: ["relatedPosts"],
    queryFn: getRelatedPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh for 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes - cache persists for 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Always refetch on mount for fresh data
    refetchOnReconnect: false,
    retry: 1, // Only retry once on failure
    retryDelay: 500, // Retry after 500ms
  });
}

/**
 * Hook to create a post and invalidate related posts query
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostData) => createPost(data),
    onSuccess: () => {
      // Invalidate and refetch related posts after creating a new post
      queryClient.invalidateQueries({ queryKey: ["relatedPosts"] });
    },
  });
}

