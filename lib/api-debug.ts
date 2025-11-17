/**
 * API Debugging Utilities
 * Use these functions in the browser console to debug API issues
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Ensure API_BASE_URL always ends with /api
const getApiBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  if (!envUrl.endsWith("/api")) {
    return envUrl.endsWith("/") ? `${envUrl}api` : `${envUrl}/api`;
  }
  return envUrl;
};

export const apiDebug = {
  /**
   * Test GET /posts/related directly
   */
  async testGetPosts() {
    const url = getApiBaseUrl();
    const fullUrl = `${url}/posts/related`;

    console.group("🧪 Testing GET /posts/related");
    console.log("API Base URL:", url);
    console.log("Full URL:", fullUrl);
    console.log("Environment:", process.env.NODE_ENV);

    try {
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });

      console.log("Status:", response.status, response.statusText);
      console.log("Headers:", Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log("Raw Response:", text);

      try {
        const json = JSON.parse(text);
        console.log("Parsed JSON:", json);
        console.log("Response type:", Array.isArray(json) ? "Array" : typeof json);
        if (Array.isArray(json)) {
          console.log("Array length:", json.length);
        }
      } catch (e) {
        console.log("Response is not JSON");
      }

      console.groupEnd();
      return { response, text };
    } catch (error) {
      console.error("❌ Error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      console.groupEnd();
      throw error;
    }
  },

  /**
   * Test POST /posts/related with test data
   */
  async testCreatePost(title: string = "Test Post", imageFile?: File) {
    const url = getApiBaseUrl();
    const fullUrl = `${url}/posts/related`;

    console.group("🧪 Testing POST /posts/related");
    console.log("API Base URL:", url);
    console.log("Full URL:", fullUrl);
    console.log("Title:", title);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("topic", "Testing");

    if (imageFile) {
      formData.append("image", imageFile);
      console.log("Image:", {
        name: imageFile.name,
        type: imageFile.type,
        size: `${(imageFile.size / 1024).toFixed(2)} KB`,
      });
    } else {
      // Create a dummy blob for testing
      const blob = new Blob(["dummy image data"], { type: "image/png" });
      const file = new File([blob], "test.png", { type: "image/png" });
      formData.append("image", file);
      console.log("Using dummy image file");
    }

    // Log FormData contents
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}:`, {
          name: value.name,
          type: value.type,
          size: value.size,
        });
      } else {
        console.log(`  ${key}:`, value);
      }
    }

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        body: formData,
      });

      console.log("Status:", response.status, response.statusText);
      console.log("Headers:", Object.fromEntries(response.headers.entries()));

      const text = await response.text();
      console.log("Raw Response:", text);

      try {
        const json = JSON.parse(text);
        console.log("Parsed JSON:", json);
      } catch (e) {
        console.log("Response is not JSON");
      }

      console.groupEnd();
      return { response, text };
    } catch (error) {
      console.error("❌ Error:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      console.groupEnd();
      throw error;
    }
  },

  /**
   * Check API configuration
   */
  checkConfig() {
    console.group("🔧 API Configuration");
    console.log("NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL || "(not set)");
    console.log("Computed API Base URL:", getApiBaseUrl());
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Full GET URL:", `${getApiBaseUrl()}/posts/related`);
    console.log("Full POST URL:", `${getApiBaseUrl()}/posts/related`);
    console.groupEnd();
  },

  /**
   * Test CORS preflight
   */
  async testCORS() {
    const url = getApiBaseUrl();
    const fullUrl = `${url}/posts/related`;
    const origin = window.location.origin;

    console.group("🔍 Testing CORS");
    console.log("Origin:", origin);
    console.log("Target URL:", fullUrl);

    try {
      const response = await fetch(fullUrl, {
        method: "OPTIONS",
        headers: {
          "Origin": origin,
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "Content-Type",
        },
      });

      console.log("Status:", response.status, response.statusText);
      console.log("CORS Headers:");
      console.log("  Access-Control-Allow-Origin:", response.headers.get("Access-Control-Allow-Origin"));
      console.log("  Access-Control-Allow-Methods:", response.headers.get("Access-Control-Allow-Methods"));
      console.log("  Access-Control-Allow-Headers:", response.headers.get("Access-Control-Allow-Headers"));
      console.log("All Headers:", Object.fromEntries(response.headers.entries()));

      console.groupEnd();
      return response;
    } catch (error) {
      console.error("❌ CORS Test Failed:", error);
      console.groupEnd();
      throw error;
    }
  },
};

// Expose in window for browser console usage
if (typeof window !== "undefined") {
  (window as any).apiDebug = apiDebug;
  console.log("💡 API Debug tools available! Use:");
  console.log("  - window.apiDebug.checkConfig()");
  console.log("  - window.apiDebug.testGetPosts()");
  console.log("  - window.apiDebug.testCreatePost('Test Title')");
  console.log("  - window.apiDebug.testCORS()");
}

