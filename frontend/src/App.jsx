import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Protectedroute';
import Layout from './components/layout/Layout';

// Auth Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Student Pages
import OverallAttendancePage from './pages/student/OverallAttendancePage';
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import StudentMarksPage from './pages/student/StudentMarksPage';
import TodayAttendancePage from './pages/student/TodayAttendancePage';

// Teacher Pages
import TakeAttendancePage from './pages/teacher/TakeAttendancePage';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import TeacherMarksAllotmentPage from './pages/teacher/TeacherMarksAllotmentPage';
import TeacherTimetablePage from './pages/teacher/TeacherTimetablePage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminStudentOverviewPage from './pages/admin/AdminStudentOverviewPage';
import AdminTeacherOverviewPage from './pages/admin/AdminTeacherOverviewPage';
import AdminTimetablePage from './pages/admin/AdminTimetablePage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Student Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute roles={['student']}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/student/dashboard" />} />
                  <Route path="/dashboard" element={<StudentDashboardPage />} />
                  <Route path="/today-attendance" element={<TodayAttendancePage />} />
                  <Route path="/overall-attendance" element={<OverallAttendancePage />} />
                  <Route path="/marks" element={<StudentMarksPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Protected Teacher Routes */}
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute roles={['teacher']}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/teacher/dashboard" />} />
                  <Route path="/dashboard" element={<TeacherDashboardPage />} />
                  <Route path="/take-attendance" element={<TakeAttendancePage />} />
                  <Route path="/timetable" element={<TeacherTimetablePage />} />
                  <Route path="/marks-allotment" element={<TeacherMarksAllotmentPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute roles={['admin']}>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                  <Route path="/dashboard" element={<AdminDashboardPage />} />
                  <Route path="/student-overview" element={<AdminStudentOverviewPage />} />
                  <Route path="/teacher-overview" element={<AdminTeacherOverviewPage />} />
                  <Route path="/timetable" element={<AdminTimetablePage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

