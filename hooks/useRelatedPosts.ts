"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRelatedPosts, createPost, CreatePostData, RelatedPost } from "@/services/postsApi";

/**
 * Hook to fetch related posts using React Query
 */
export function useRelatedPosts() {
  return useQuery<RelatedPost[]>({
    queryKey: ["relatedPosts"],
    queryFn: getRelatedPosts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
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

