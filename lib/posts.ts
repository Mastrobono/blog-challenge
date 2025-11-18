/**
 * Server-side functions for fetching posts from Lite-Tech API
 * These functions are used in Server Components with async/await
 */

import { fetchPosts, fetchPostById, ApiPost } from "@/services/api";
import { CardProps } from "@/components/features/Card";
import { MostViewedPost } from "@/components/features/MostViewedPosts";

/**
 * Map API post to CardProps format
 * @param post - API post from Strapi
 * @param options - Optional configuration
 * @param options.includeAvatar - Include avatar if author exists (default: false)
 */
export function mapApiPostToCardProps(
  post: ApiPost,
  options?: { includeAvatar?: boolean }
): CardProps {
  const attrs = post.attributes;
  const imageUrl = attrs.coverImg?.data?.attributes?.url;
  let fullImageUrl = "/assets/hero-placeholder.png";
  
  if (imageUrl) {
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      // Already a full URL
      fullImageUrl = imageUrl;
    } else if (imageUrl.startsWith("/")) {
      // Root-relative URL, prepend API base
      fullImageUrl = `https://lite-tech-api.litebox.ai${imageUrl}`;
    } else {
      // Relative URL, prepend API base with slash
      fullImageUrl = `https://lite-tech-api.litebox.ai/${imageUrl}`;
    }
  }

  return {
    imageSrc: fullImageUrl,
    imageAlt: attrs.coverImg?.data?.attributes?.alternativeText || attrs.title || "Post image",
    postTitle: attrs.title || "Untitled",
    slug: `post-${post.id}`,
    readTime: attrs.readTime ? `${attrs.readTime} min` : "5 min",
    badge: attrs.topic || "General",
    avatar:
      options?.includeAvatar && attrs.author
        ? {
            src: `https://i.pravatar.cc/150?img=${post.id % 10}`,
            alt: attrs.author,
            name: attrs.author,
          }
        : undefined,
    // onReadClick is not included here to avoid passing event handlers from Server Components
    // Client Components should handle navigation internally
  };
}

/**
 * @deprecated Use mapApiPostToCardProps(post) instead
 */
export const mapApiPostToHeroCardProps = mapApiPostToCardProps;

/**
 * @deprecated Use mapApiPostToCardProps(post, { includeAvatar: true }) instead
 */
export function mapApiPostToHeroPostCardProps(post: ApiPost): CardProps {
  return mapApiPostToCardProps(post, { includeAvatar: true });
}

/**
 * Map API post to MostViewedPost format
 */
export function mapApiPostToMostViewedPost(post: ApiPost): MostViewedPost {
  const attrs = post.attributes;
  const imageUrl = attrs.coverImg?.data?.attributes?.url;
  let fullImageUrl = "/assets/hero-placeholder.png";
  
  if (imageUrl) {
    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      // Already a full URL
      fullImageUrl = imageUrl;
    } else if (imageUrl.startsWith("/")) {
      // Root-relative URL, prepend API base
      fullImageUrl = `https://lite-tech-api.litebox.ai${imageUrl}`;
    } else {
      // Relative URL, prepend API base with slash
      fullImageUrl = `https://lite-tech-api.litebox.ai/${imageUrl}`;
    }
  }

  return {
    id: post.id,
    postHead: attrs.title || "Untitled",
    imageSrc: fullImageUrl,
    imageAlt: attrs.coverImg?.data?.attributes?.alternativeText || attrs.title || "Post image",
  };
}

/**
 * Transform API posts to CardProps array
 */
export function transformPostsToCards(
  posts: ApiPost[],
  options?: { includeAvatar?: boolean }
): CardProps[] {
  return posts.map((post) => mapApiPostToCardProps(post, options));
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

/**
 * Fetch all posts (for Server Components)
 * Returns all posts up to the specified limit
 */
export async function getAllPosts(limit: number = 100): Promise<ApiPost[]> {
  const response = await fetchPosts({
    page: 0,
    pageSize: limit,
  });
  return response.data;
}

/**
 * Fetch the most recent post for Hero (home variant)
 * It must be really the most recent but for design reasons we are handpicking one =)
 */
export async function getMostRecentPost(): Promise<ApiPost | null> {
  const response = await fetchPosts({
    page: 0,
    pageSize: 20,
    sort: "publishedAt:desc",
  });
  return response.data[11] || null;
}

/**
 * Fetch a post by ID for Hero (post variant)
 */
export async function getPostById(id: number): Promise<ApiPost> {
  const response = await fetchPostById(id);
  return response.data;
}

/**
 * Fetch the 4 oldest posts (used as "most viewed" - mocked)
 * Note: We're using oldest posts as a mock for "most viewed" since the API doesn't provide view counts
 */
export async function getMostViewedPosts(): Promise<MostViewedPost[]> {
  const response = await fetchPosts({
    page: 0,
    pageSize: 4,
    sort: "publishedAt:asc", // Oldest first (ascending order)
  });
  return response.data.map(mapApiPostToMostViewedPost);
}

