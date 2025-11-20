/**
 * API Service for NestJS Backend
 * Base URL: http://localhost:3001/api (development)
 * Production: https://litebox-challenge-webservice.onrender.com/api
 */

// Ensure API_BASE_URL always ends with /api
const getApiBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  // If URL doesn't end with /api, add it
  if (!envUrl.endsWith("/api")) {
    return envUrl.endsWith("/") ? `${envUrl}api` : `${envUrl}/api`;
  }
  return envUrl;
};

const API_BASE_URL = getApiBaseUrl();

export interface RelatedPost {
  id: number;
  title: string;
  topic?: string;
  imageUrl: string;
  createdAt: string;
}

export interface CreatePostResponse {
  message: string;
  post: RelatedPost;
}

export interface CreatePostData {
  title: string;
  topic?: string;
  image: File;
}

/**
 * Create a new post
 */
export async function createPost(data: CreatePostData): Promise<CreatePostResponse> {
  const formData = new FormData();
  formData.append("title", data.title);
  if (data.topic) {
    formData.append("topic", data.topic);
  }
  formData.append("image", data.image);

  const url = `${API_BASE_URL}/posts/related`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get("content-type");
      
      // Try to get error details
      let responseText = "";
      try {
        responseText = await response.clone().text();
      } catch (_e) {
        // If we can't read the text, continue with empty string
      }
      
      if (contentType && contentType.includes("application/json")) {
        try {
          errorData = await response.json();
          console.error("Error Response (JSON):", errorData);
          console.error("Full error object:", JSON.stringify(errorData, null, 2));
        } catch (_e) {
          console.error("Error Response (Text):", responseText);
          errorData = { message: responseText || "Failed to create post" };
        }
      } else {
        console.error("Error Response (Text):", responseText);
        errorData = { message: responseText || "Failed to create post" };
      }
      
      // Log additional debugging info
      console.error("Response Status:", response.status, response.statusText);
      console.error("Response Headers:", Object.fromEntries(response.headers.entries()));
      console.error("Request URL:", url);
      
      // Create more detailed error message
      const errorMessage = errorData.message || errorData.error || `Error ${response.status}: ${response.statusText}`;
      const detailedError = new Error(errorMessage);
      (detailedError as any).status = response.status;
      (detailedError as any).responseData = errorData;
      (detailedError as any).url = url;
      throw detailedError;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Request Failed:", error);
    
    // Handle CORS and network errors specifically
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network error: Unable to reach the server. Please check your connection and ensure CORS is configured on the backend.");
    }
    
    // Re-throw with more context if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Connection error: ${String(error)}`);
  }
}

/**
 * Get related posts (last 3 posts)
 */
export async function getRelatedPosts(): Promise<RelatedPost[]> {
  const url = `${API_BASE_URL}/posts/related`;

  try {
    const response = await fetch(url, {
      method: "GET",
      // For client-side fetching, let React Query handle caching
      // Using default cache to allow browser and React Query to optimize
      cache: "default",
    });

    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get("content-type");
      
      // Try to get error details
      let responseText = "";
      try {
        responseText = await response.clone().text();
      } catch (_e) {
        // If we can't read the text, continue with empty string
      }
      
      if (contentType && contentType.includes("application/json")) {
        try {
          errorData = await response.json();
          console.error("Error Response (JSON):", errorData);
          console.error("Full error object:", JSON.stringify(errorData, null, 2));
        } catch (_e) {
          console.error("Error Response (Text):", responseText);
          errorData = { message: responseText || "Failed to fetch posts" };
        }
      } else {
        console.error("Error Response (Text):", responseText);
        errorData = { message: responseText || "Failed to fetch posts" };
      }
      
      // Log additional debugging info
      console.error("Response Status:", response.status, response.statusText);
      console.error("Response Headers:", Object.fromEntries(response.headers.entries()));
      console.error("Request URL:", url);
      
      // Create more detailed error message
      const errorMessage = errorData.message || errorData.error || `Error ${response.status}: ${response.statusText}`;
      const detailedError = new Error(errorMessage);
      (detailedError as any).status = response.status;
      (detailedError as any).responseData = errorData;
      (detailedError as any).url = url;
      throw detailedError;
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Request Failed:", error);
    
    // Handle CORS and network errors specifically
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error("Network error: Unable to reach the server. Please check your connection and ensure CORS is configured on the backend.");
    }
    
    // Re-throw with more context if it's not already an Error
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Connection error: ${String(error)}`);
  }
}

