import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/Authcontext.jsx';

export default function ProtectedRoute({ children, roles }) {
  const { user } = useAuthContext();

  // Check authentication
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role (if roles array is provided)
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
