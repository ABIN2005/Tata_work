// src/services/api.js

// Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const REQUEST_TIMEOUT = 30000; // 30 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay

// Token management utilities
const getAuthToken = () => {
  try {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  } catch (error) {
    console.warn('Failed to get auth token:', error);
    return null;
  }
};

const setAuthToken = (token) => {
  try {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
    }
  } catch (error) {
    console.warn('Failed to set auth token:', error);
  }
};

// Custom error class for API errors
export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// Create abort controller for timeout
const createTimeoutController = (timeout) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return { controller, timeoutId };
};

// Retry logic with exponential backoff
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url, options, retries = MAX_RETRIES) => {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const { controller, timeoutId } = createTimeoutController(REQUEST_TIMEOUT);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      // Don't retry on abort (timeout) or if it's the last attempt
      if (error.name === 'AbortError' || attempt === retries) {
        throw error;
      }

      // Exponential backoff: wait longer with each retry
      const delay = RETRY_DELAY * Math.pow(2, attempt);
      console.warn(`Request failed, retrying in ${delay}ms... (attempt ${attempt + 1}/${retries + 1})`);
      await sleep(delay);
    }
  }
};

// Main fetch function with comprehensive error handling
export async function fetchData(endpoint, options = {}) {
  try {
    // Get authentication token
    const token = getAuthToken();

    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Add authentication header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Build full URL
    const url = `${API_URL}/${endpoint}`.replace(/([^:]\/)\/+/g, '$1'); // Remove double slashes

    // Prepare fetch options
    const fetchOptions = {
      ...options,
      headers,
    };

    // Make request with retry logic
    const response = await fetchWithRetry(url, fetchOptions);

    // Handle different response statuses
    if (!response.ok) {
      let errorData = null;
      const contentType = response.headers.get('content-type');
      
      // Try to parse error response
      try {
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = { message: await response.text() };
        }
      } catch (parseError) {
        errorData = { message: 'Failed to parse error response' };
      }

      // Handle specific status codes
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          setAuthToken(null);
          if (typeof window !== 'undefined') {
            window.location.href = '/DAMSBF/login';
          }
          throw new APIError(
            errorData?.message || 'Authentication required. Please log in.',
            response.status,
            errorData
          );

        case 403:
          throw new APIError(
            errorData?.message || 'You do not have permission to access this resource.',
            response.status,
            errorData
          );

        case 404:
          throw new APIError(
            errorData?.message || 'The requested resource was not found.',
            response.status,
            errorData
          );

        case 422:
          throw new APIError(
            errorData?.message || 'Invalid input data. Please check your request.',
            response.status,
            errorData
          );

        case 429:
          throw new APIError(
            errorData?.message || 'Too many requests. Please try again later.',
            response.status,
            errorData
          );

        case 500:
        case 502:
        case 503:
        case 504:
          throw new APIError(
            errorData?.message || 'Server error. Please try again later.',
            response.status,
            errorData
          );

        default:
          throw new APIError(
            errorData?.message || `API error: ${response.status} ${response.statusText}`,
            response.status,
            errorData
          );
      }
    }

    // Parse successful response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }

  } catch (error) {
    // Handle network errors
    if (error.name === 'AbortError') {
      throw new APIError(
        'Request timeout. Please check your connection and try again.',
        408,
        null
      );
    }

    // Handle fetch errors (network issues)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new APIError(
        'Network error. Please check your internet connection.',
        0,
        null
      );
    }

    // Re-throw APIError instances
    if (error instanceof APIError) {
      throw error;
    }

    // Handle other errors
    throw new APIError(
      error.message || 'An unexpected error occurred.',
      0,
      null
    );
  }
}

// API methods with proper error handling
export const api = {
  get: async (endpoint, options = {}) => {
    return fetchData(endpoint, {
      ...options,
      method: 'GET',
    });
  },

  post: async (endpoint, data, options = {}) => {
    return fetchData(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put: async (endpoint, data, options = {}) => {
    return fetchData(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  patch: async (endpoint, data, options = {}) => {
    return fetchData(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  delete: async (endpoint, options = {}) => {
    return fetchData(endpoint, {
      ...options,
      method: 'DELETE',
    });
  },
};

// Export token management functions
export const tokenManager = {
  getToken: getAuthToken,
  setToken: setAuthToken,
  clearToken: () => setAuthToken(null),
};
