// src/utils/errorHandler.js
import { APIError } from '../Services/api';

/**
 * Handle API errors and return user-friendly messages
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
  if (error instanceof APIError) {
    // Return the error message from API
    return error.message || 'An error occurred while processing your request.';
  }

  // Handle network errors
  if (error.message?.includes('Network') || error.message?.includes('fetch')) {
    return 'Network error. Please check your internet connection and try again.';
  }

  // Handle timeout errors
  if (error.message?.includes('timeout') || error.name === 'AbortError') {
    return 'Request timeout. The server took too long to respond. Please try again.';
  }

  // Generic error message
  return error.message || 'An unexpected error occurred. Please try again.';
};

/**
 * Log error to console (and potentially to error tracking service)
 * @param {Error} error - The error object
 * @param {string} context - Additional context about where the error occurred
 */
export const logError = (error, context = '') => {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.error('Error occurred:', errorInfo);
  }

  // TODO: Send to error tracking service (e.g., Sentry) in production
  // if (import.meta.env.PROD) {
  //   errorTrackingService.captureException(error, { extra: errorInfo });
  // }
};

/**
 * Show error notification to user
 * @param {string} message - Error message to display
 * @param {string} type - Type of notification (error, warning, info)
 */
export const showErrorNotification = (message, type = 'error') => {
  // TODO: Integrate with notification system (e.g., Material-UI Snackbar, react-toastify)
  // For now, just log to console
  console.error(`[${type.toUpperCase()}] ${message}`);
  
  // Example integration with Material-UI Snackbar:
  // import { useSnackbar } from 'notistack';
  // const { enqueueSnackbar } = useSnackbar();
  // enqueueSnackbar(message, { variant: type });
};

/**
 * Comprehensive error handler that combines all error handling steps
 * @param {Error} error - The error object
 * @param {string} context - Context about where the error occurred
 * @returns {string} User-friendly error message
 */
export const handleError = (error, context = '') => {
  // Log the error
  logError(error, context);

  // Get user-friendly message
  const message = handleApiError(error);

  // Show notification (if notification system is set up)
  showErrorNotification(message);

  // Return message for component to use
  return message;
};
