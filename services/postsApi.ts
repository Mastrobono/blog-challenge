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

// Log API configuration on module load (only in development)
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("🔧 API Configuration:", {
    API_BASE_URL,
    envVar: process.env.NEXT_PUBLIC_API_URL || "(not set, using default)",
  });
}

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
  
  // Log request details for debugging
  console.group("🚀 POST Request - Create Post");
  console.log("URL:", url);
  console.log("Method: POST");
  console.log("Title:", data.title);
  console.log("Topic:", data.topic || "(none)");
  console.log("Image:", {
    name: data.image.name,
    type: data.image.type,
    size: `${(data.image.size / 1024).toFixed(2)} KB`,
  });
  
  // Log FormData contents (for debugging)
  const formDataEntries: Array<[string, string | File]> = [];
  formData.forEach((value, key) => {
    formDataEntries.push([key, value]);
  });
  console.log("FormData entries:", formDataEntries.map(([key, value]) => {
    if (value instanceof File) {
      return `${key}: File(${value.name}, ${value.type}, ${value.size} bytes)`;
    }
    return `${key}: ${value}`;
  }));
  console.groupEnd();

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    // Log response details
    console.group("📥 Response - Create Post");
    console.log("Status:", response.status, response.statusText);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        try {
          errorData = await response.json();
          console.error("Error Response (JSON):", errorData);
        } catch (e) {
          const text = await response.text();
          console.error("Error Response (Text):", text);
          errorData = { message: text || "Failed to create post" };
        }
      } else {
        const text = await response.text();
        console.error("Error Response (Text):", text);
        errorData = { message: text || "Failed to create post" };
      }
      
      console.groupEnd();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Success Response:", result);
    console.groupEnd();
    return result;
  } catch (error) {
    console.error("❌ Request Failed:", error);
    console.groupEnd();
    
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
  
  // Log request details for debugging
  console.group("🚀 GET Request - Related Posts");
  console.log("URL:", url);
  console.log("Method: GET");
  console.groupEnd();

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store", // Get fresh data
    });

    // Log response details
    console.group("📥 Response - Related Posts");
    console.log("Status:", response.status, response.statusText);
    console.log("Headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        try {
          errorData = await response.json();
          console.error("Error Response (JSON):", errorData);
        } catch (e) {
          const text = await response.text();
          console.error("Error Response (Text):", text);
          errorData = { message: text || "Failed to fetch posts" };
        }
      } else {
        const text = await response.text();
        console.error("Error Response (Text):", text);
        errorData = { message: text || "Failed to fetch posts" };
      }
      
      console.groupEnd();
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Success Response:", result);
    console.log("Posts count:", Array.isArray(result) ? result.length : "N/A");
    console.groupEnd();
    return result;
  } catch (error) {
    console.error("❌ Request Failed:", error);
    console.groupEnd();
    
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

