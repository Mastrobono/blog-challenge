// API Service for Lite-Tech API (Strapi format)
const API_BASE_URL = "https://lite-tech-api.litebox.ai";

export interface ApiPostAttributes {
  title: string;
  subtitle?: string;
  topic?: string;
  author?: string;
  readTime?: number;
  coverImg?: {
    data?: {
      id: number;
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
  body?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ApiPost {
  id: number;
  attributes: ApiPostAttributes;
}

export interface ApiPostsResponse {
  data: ApiPost[];
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
}

export interface FetchPostsParams {
  page?: number;
  pageSize?: number;
  topics?: string[]; // Changed to support multiple topics
  sort?: string; // Strapi sort parameter (e.g., "publishedAt:desc" or "createdAt:desc")
}

/**
 * Fetch posts from the API
 */
export async function fetchPosts(params: FetchPostsParams = {}): Promise<ApiPostsResponse> {
  const { page = 0, pageSize = 9, topics = [], sort } = params;
  
  // Build query params using Strapi format
  const queryParams = new URLSearchParams({
    "pagination[page]": page.toString(),
    "pagination[pageSize]": pageSize.toString(),
    "pagination[withCount]": "true",
  });

  // Add populate to get coverImg data
  queryParams.append("populate", "coverImg");

  // Add sorting if provided (e.g., "publishedAt:desc" for most recent)
  if (sort) {
    queryParams.append("sort", sort);
  }

  // Add topic filters if provided
  if (topics.length > 0) {
    if (topics.length === 1) {
      // Single topic filter
      queryParams.append("filters[topic][$eq]", topics[0]);
    } else {
      // Multiple topics filter using $in
      topics.forEach((topic, index) => {
        queryParams.append(`filters[topic][$in][${index}]`, topic);
      });
    }
  }

  const url = `${API_BASE_URL}/api/posts?${queryParams.toString()}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", response.status, errorText);
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

/**
 * Fetch a single post by ID
 */
export async function fetchPostById(id: number): Promise<{ data: ApiPost; meta: Record<string, never> }> {
  // Use Strapi format for populate
  const queryParams = new URLSearchParams();
  queryParams.append("populate", "coverImg");
  
  const url = `${API_BASE_URL}/api/posts/${id}?${queryParams.toString()}`;
  
  const response = await fetch(url, {
    cache: "no-store", // Ensure fresh data
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", response.status, errorText);
    console.error("Request URL:", url);
    throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

