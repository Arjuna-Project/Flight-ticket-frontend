import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

export const ProtectedRoute = ({ children }) => {
  if (!authService.isLoggedIn()) return <Navigate to="/login" replace />;
  return children;
};

export const AdminRoute = ({ children }) => {
  if (!authService.isLoggedIn()) return <Navigate to="/login" replace />;
  if (!authService.isAdmin()) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
