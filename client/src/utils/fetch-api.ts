/**
 * Next.js fetch request configuration type
 * Used for caching and revalidation options in Next.js applications
 */
type NextFetchRequestConfig = {
  /** Time in seconds to revalidate cached data, or false to disable caching */
  revalidate?: number | false;
  /** Array of cache tags for selective cache invalidation */
  tags?: string[];
};

/**
 * Configuration options for API requests
 * Provides a standardized interface for making HTTP requests with authentication and caching
 */
interface FetchAPIOptions {
  /** HTTP method for the request */
  method: "GET" | "POST" | "PUT" | "DELETE";
  /** Optional JWT token for authenticated requests */
  authToken?: string;
  /** Request body data (automatically stringified) */
  body?: Record<string, unknown>;
  /** Next.js specific caching and revalidation options */
  next?: NextFetchRequestConfig;
}

/**
 * Universal API fetch utility function
 * 
 * Provides a standardized way to make HTTP requests with:
 * - Automatic JSON content-type headers
 * - Optional JWT authentication
 * - Next.js caching support
 * - Consistent error handling
 * - Automatic JSON parsing for successful responses
 * 
 * @param url - The endpoint URL to make the request to
 * @param options - Configuration object containing method, auth, body, and caching options
 * @returns Promise that resolves to the parsed JSON response or error status object
 * @throws Error if the network request fails
 * 
 * @example
 * // GET request
 * const data = await fetchAPI('/api/users', { method: 'GET' });
 * 
 * // POST request with authentication
 * const result = await fetchAPI('/api/login', {
 *   method: 'POST',
 *   body: { email: 'user@example.com', password: 'password' },
 *   authToken: 'jwt-token-here'
 * });
 * 
 * // GET request with Next.js caching
 * const cachedData = await fetchAPI('/api/products', {
 *   method: 'GET',
 *   next: { revalidate: 3600, tags: ['products'] }
 * });
 */
export async function fetchAPI(url: string, options: FetchAPIOptions) {
  const { method, authToken, body, next } = options;

  // Build headers object with conditional authentication
  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header only if authToken is provided
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    // Include body only if provided (stringified automatically)
    ...(body && { body: JSON.stringify(body) }),
    // Include Next.js caching options if provided
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get("content-type");

    // Check if response is JSON and successful
    if (
      contentType &&
      contentType.includes("application/json") &&
      response.ok
    ) {
      // Parse and return JSON data for successful responses
      return await response.json();
    } else {
      // Return status information for non-JSON or error responses
      return { status: response.status, statusText: response.statusText };
    }
  } catch (error) {
    // Log and re-throw network errors for proper error handling upstream
    console.error(`Error ${method} data:`, error);
    throw error;
  }
}