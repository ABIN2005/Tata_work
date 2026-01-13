import { createContext, useState, useContext, useEffect } from 'react';
import { tokenManager } from '../Services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Initialize state from sessionStorage (tab-specific) for auth, localStorage for theme
  const [state, setState] = useState(() => {
    try {
      // Use sessionStorage for user data (tab-specific)
      const savedUser = sessionStorage.getItem('user');
      // Use localStorage for theme (persists across tabs)
      const savedTheme = localStorage.getItem('theme') || 'light';
      const token = tokenManager.getToken();
      
      // Generate or retrieve session ID for this tab
      let sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', sessionId);
      }
      
      return {
        user: savedUser ? JSON.parse(savedUser) : null,
        isAuthenticated: !!token && !!savedUser,
        theme: savedTheme,
        sessionId: sessionId,
      };
    } catch (error) {
      console.warn('Failed to load state from storage:', error);
      return {
        user: null,
        isAuthenticated: false,
        theme: 'light',
        sessionId: null,
      };
    }
  });

  // Persist theme changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('theme', state.theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [state.theme]);

  const login = (userData, token = null) => {
    try {
      // Save user data and token to sessionStorage (tab-specific)
      if (token) {
        tokenManager.setToken(token);
      }
      sessionStorage.setItem('user', JSON.stringify(userData));
      
      // Generate session ID for this tab if not exists
      let sessionId = sessionStorage.getItem('sessionId');
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', sessionId);
      }
      
      setState({
        ...state,
        user: userData,
        isAuthenticated: true,
        sessionId: sessionId,
      });
    } catch (error) {
      console.error('Failed to save login data:', error);
      // Still update state even if sessionStorage fails
      setState({
        ...state,
        user: userData,
        isAuthenticated: true,
      });
    }
  };

  const logout = () => {
    try {
      // Clear token and user data from sessionStorage
      tokenManager.clearToken();
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('sessionId');
      // Also clear legacy localStorage items
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      
      setState({
        ...state,
        user: null,
        isAuthenticated: false,
        sessionId: null,
      });
    } catch (error) {
      console.error('Failed to clear logout data:', error);
      // Still update state even if sessionStorage fails
      setState({
        ...state,
        user: null,
        isAuthenticated: false,
        sessionId: null,
      });
    }
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setState({ ...state, theme: newTheme });
  };

  return (
    <AppContext.Provider value={{ ...state, login, logout, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
