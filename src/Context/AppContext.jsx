import { createContext, useState, useContext, useEffect } from 'react';
import { tokenManager } from '../Services/api';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Initialize state from localStorage if available
  const [state, setState] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      const savedTheme = localStorage.getItem('theme') || 'light';
      const token = tokenManager.getToken();
      
      return {
        user: savedUser ? JSON.parse(savedUser) : null,
        isAuthenticated: !!token && !!savedUser,
        theme: savedTheme,
      };
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error);
      return {
        user: null,
        isAuthenticated: false,
        theme: 'light',
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
      // Save user data and token
      if (token) {
        tokenManager.setToken(token);
      }
      localStorage.setItem('user', JSON.stringify(userData));
      
      setState({
        ...state,
        user: userData,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Failed to save login data:', error);
      // Still update state even if localStorage fails
      setState({
        ...state,
        user: userData,
        isAuthenticated: true,
      });
    }
  };

  const logout = () => {
    try {
      // Clear token and user data
      tokenManager.clearToken();
      localStorage.removeItem('user');
      
      setState({
        ...state,
        user: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Failed to clear logout data:', error);
      // Still update state even if localStorage fails
      setState({
        ...state,
        user: null,
        isAuthenticated: false,
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
