// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/Authcontext.jsx';

export default function DashboardPage() {
  const { user } = useAuthContext();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl">Dashboard</h1>
      <p>Welcome, <b>{user?.name}</b>! Role: <b>{user?.role}</b></p>
      <div className="flex gap-3">
        {(user?.role === 'teacher' || user?.role === 'admin') && (
          <Link to="/students" className="px-4 py-2 border rounded">Students</Link>
        )}
        {user?.role === 'teacher' && (
          <Link to="/attendance" className="px-4 py-2 border rounded">Attendance</Link>
        )}
      </div>
    </div>
  );
}
