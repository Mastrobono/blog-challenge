import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts, ApiPost } from "@/services/api";
import { CardProps } from "@/components/features/Card";

/**
 * Map API post to CardProps format (Strapi structure)
 */
function mapApiPostToCardProps(post: ApiPost): CardProps {
  const attrs = post.attributes;
  const imageUrl = attrs.coverImg?.data?.attributes?.url;
  const fullImageUrl = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `https://lite-tech-api.litebox.ai${imageUrl}`
    : "https://via.placeholder.com/600x400/000000/FFFFFF?text=No+Image";

  return {
    imageSrc: fullImageUrl,
    imageAlt: attrs.coverImg?.data?.attributes?.alternativeText || attrs.title || "Post image",
    postTitle: attrs.title || "Untitled",
    slug: `post-${post.id}`, // API doesn't provide slug, use ID
    readTime: attrs.readTime ? `${attrs.readTime} min read` : "5 min read",
    badge: attrs.topic || "General",
    // No avatar - FilteredPosts doesn't use avatar variant
    onReadClick: (slug: string) => {
      // Navigate to post detail page
      console.log(`Navigate to post: ${slug}`);
      // In Next.js: router.push(`/posts/${post.id}`);
    },
  };
}

/**
 * Hook to fetch posts with infinite scroll
 */
export function usePosts(
  filters: string[] = [], 
  perPage: number = 9, 
  availableTopics: { id: string; label: string }[] = []
) {
  // Map all active filter IDs to topic labels for API filtering
  const activeTopicIds = filters.filter((id) => id !== "all");
  const topics: string[] = [];
  
  if (activeTopicIds.length > 0) {
    activeTopicIds.forEach((filterId) => {
      // Try to find the topic label from availableTopics
      const foundTopic = availableTopics.find((t) => t.id === filterId);
      if (foundTopic) {
        topics.push(foundTopic.label);
      } else {
        // If not found, use the filter ID directly as fallback
        topics.push(filterId);
      }
    });
    
    console.log("🔎 usePosts - Active filters:", {
      filterIds: activeTopicIds,
      topicLabels: topics,
      availableTopicsCount: availableTopics.length,
    });
  } else {
    console.log("🔎 usePosts - No active filters, fetching all posts");
  }

  // Sort topics to ensure consistent queryKey
  const sortedTopics = [...topics].sort();

  return useInfiniteQuery({
    queryKey: ["posts", sortedTopics],
    queryFn: ({ pageParam = 0 }) =>
      fetchPosts({
        page: pageParam,
        pageSize: perPage,
        topics: sortedTopics.length > 0 ? sortedTopics : undefined,
      }),
    getNextPageParam: (lastPage) => {
      const pagination = lastPage.meta?.pagination;
      if (pagination?.page !== undefined && pagination?.pageCount !== undefined) {
        const currentPage = pagination.page;
        const totalPages = pagination.pageCount;
        return currentPage < totalPages - 1 ? currentPage + 1 : undefined;
      }
      // Fallback: assume there are more pages if we got a full page
      return lastPage.data.length === perPage ? (pagination?.page || 0) + 1 : undefined;
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true, // Always enabled, even when fetching all posts
  });
}

/**
 * Transform API posts to CardProps array
 */
export function transformPostsToCards(posts: ApiPost[]): CardProps[] {
  return posts.map(mapApiPostToCardProps);
}

/**
 * Extract unique topics from API posts
 */
export function extractUniqueTopics(posts: ApiPost[]): string[] {
  const topics = new Set<string>();
  posts.forEach((post) => {
    const topic = post.attributes.topic;
    if (topic && topic.trim() !== "") {
      topics.add(topic);
    }
  });
  return Array.from(topics).sort();
}

