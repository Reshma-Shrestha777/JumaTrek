import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  // Check if user is authenticated
  // In a real app, you would verify the token with your backend
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    try {
      const user = JSON.parse(adminToken);
      return user.role === 'Admin';
    } catch (e) {
      return false;
    }
  }
  return false;
};

const ProtectedRoute = () => {
  const isAuth = isAuthenticated();
  
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
