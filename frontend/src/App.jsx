import { Routes, Route, Navigate, Link } from 'react-router-dom';
import loginPage from './pages/loginPage';
import signupPage from './pages/signupPage';
import DashboardPage from './pages/DashboardPage';
import StudentPage from './pages/StudentPage';
import AttendancePage from './pages/AttendancePage';
import ProtectedRoute from './components/Protectedroute';
import { useAuthContext } from './context/Authcontext';

function Nav() {
  const { user, logout } = useAuthContext();

  return (
    <nav className="p-4 border-b flex gap-4 items-center">
      <Link to="/dashboard" className="font-semibold">Smart Student</Link>

      <div className="flex gap-3">
        {user && (user.role === 'teacher' || user.role === 'admin') && (
          <Link to="/students">Students</Link>
        )}
        {user && user.role === 'teacher' && (
          <Link to="/attendance">Attendance</Link>
        )}
      </div>

      <div className="ml-auto flex gap-2 items-center">
        {user ? (
          <>
            <span className="text-sm">Hi, {user.name} ({user.role})</span>
            <button
              onClick={logout}
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 border rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<loginPage />} />
          <Route path="/signup" element={<signupPage />} />

          <Route
            path="/dashboardPage"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/students"
            element={
              <ProtectedRoute roles={['teacher', 'admin']}>
                <studentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attendance"
            element={
              <ProtectedRoute roles={['teacher']}>
                <AttendancePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

