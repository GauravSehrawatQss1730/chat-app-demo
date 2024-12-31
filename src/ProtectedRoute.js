import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading while auth status is resolved
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
