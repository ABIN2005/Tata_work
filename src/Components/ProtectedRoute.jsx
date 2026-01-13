import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';

/**
 * ProtectedRoute Component
 * 
 * Wraps routes that require authentication.
 * Redirects to login page immediately if user is not authenticated.
 * Automatically logs out if accessed from a new tab (sessionStorage is tab-specific).
 */
const ProtectedRoute = ({ children }) => {
  const { logout } = useAppContext();
  const basename = import.meta.env.PROD ? '/DAMSBF' : '';
  const [isChecking, setIsChecking] = useState(true);

  // Check authentication status directly from sessionStorage (synchronous check)
  // This ensures immediate redirect without any delay or idle state
  const storedUser = sessionStorage.getItem('user');
  const storedToken = sessionStorage.getItem('authToken');
  const isAuth = !!(storedUser && storedToken);

  // Immediate redirect check on mount - runs synchronously
  useEffect(() => {
    setIsChecking(false);
    
    if (!isAuth) {
      // Clear any stale state immediately when sessionStorage is empty
      logout();
      // Use window.location.replace for immediate redirect (doesn't wait for React render)
      // replace() prevents back button navigation to protected route
      const loginPath = `${basename}/login`.replace('//', '/');
      window.location.replace(loginPath);
    }
  }, [isAuth, logout, basename]);

  // Show nothing while checking or redirecting
  if (isChecking || !isAuth) {
    return null;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
