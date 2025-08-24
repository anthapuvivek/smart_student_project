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
    // Redirect to appropriate role-based route
    if (user.role === 'student') {
      return <Navigate to="/student/today-attendance" replace />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/teacher/take-attendance" replace />;
    } else if (user.role === 'admin') {
      return <Navigate to="/admin/student-overview" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
}
