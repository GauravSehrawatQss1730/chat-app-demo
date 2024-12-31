import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates "loading"
  const [user, setUser] = useState(null); // null indicates "
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate checking authentication from localStorage or an API
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set true if token exists, false otherwise
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/'); // Redirect to home after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login after logout
  };

  if (isAuthenticated === null) {
    // Show a loading spinner or nothing while checking auth status
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
