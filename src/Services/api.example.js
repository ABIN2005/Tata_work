// src/Services/api.example.js
// Example usage of the improved API service

import { api, APIError, tokenManager } from './api';
import { handleError, handleApiError } from '../utils/errorHandler';

// ============================================
// Example 1: Basic GET request with error handling
// ============================================
export async function fetchEquipmentStatus() {
  try {
    const data = await api.get('equipment/status');
    return data;
  } catch (error) {
    // Use the error handler utility
    const message = handleError(error, 'fetchEquipmentStatus');
    console.error('Failed to fetch equipment status:', message);
    throw error; // Re-throw if needed
  }
}

// ============================================
// Example 2: POST request with data
// ============================================
export async function createAlert(alertData) {
  try {
    const response = await api.post('alerts', alertData);
    return response;
  } catch (error) {
    if (error instanceof APIError) {
      // Handle specific API errors
      if (error.status === 401) {
        // Already handled by API service (redirects to login)
        throw error;
      } else if (error.status === 422) {
        // Validation error - show field-specific errors
        console.error('Validation errors:', error.data);
        throw error;
      }
    }
    
    // Handle other errors
    handleError(error, 'createAlert');
    throw error;
  }
}

// ============================================
// Example 3: Using in a React component
// ============================================
/*
import { useState, useEffect } from 'react';
import { api } from '../Services/api';
import { handleError } from '../utils/errorHandler';

function EquipmentDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const result = await api.get('equipment/status');
        setData(result);
      } catch (err) {
        const message = handleError(err, 'EquipmentDashboard');
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{/* Render data */}</div>;
}
*/

// ============================================
// Example 4: Token management
// ============================================
export function loginUser(username, password) {
  return async (dispatch) => {
    try {
      // Make login request (without token)
      const response = await api.post('auth/login', {
        username,
        password,
      });

      // Save token and user data
      if (response.token) {
        tokenManager.setToken(response.token);
      }

      return response;
    } catch (error) {
      handleError(error, 'loginUser');
      throw error;
    }
  };
}

export function logoutUser() {
  // Clear token
  tokenManager.clearToken();
  // Additional logout logic...
}

// ============================================
// Example 5: Handling different error types
// ============================================
export async function fetchWithErrorHandling(endpoint) {
  try {
    return await api.get(endpoint);
  } catch (error) {
    if (error instanceof APIError) {
      switch (error.status) {
        case 401:
          // Unauthorized - handled by API service
          console.log('User needs to log in');
          break;
        case 403:
          // Forbidden
          console.log('Access denied');
          break;
        case 404:
          // Not found
          console.log('Resource not found');
          break;
        case 500:
          // Server error
          console.log('Server error occurred');
          break;
        default:
          console.log('API error:', error.message);
      }
    } else {
      // Network or other errors
      console.log('Network error:', error.message);
    }
    throw error;
  }
}

// ============================================
// Example 6: Using with async/await in try-catch
// ============================================
export async function updateEquipment(id, data) {
  try {
    const response = await api.put(`equipment/${id}`, data);
    return response;
  } catch (error) {
    // The error handler will log and show notification
    const message = handleError(error, `updateEquipment(${id})`);
    
    // You can also access specific error properties
    if (error instanceof APIError) {
      console.error('Status:', error.status);
      console.error('Data:', error.data);
    }
    
    // Re-throw or return error state
    throw error;
  }
}
