import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  CheckCircle, 
  TrendingUp, 
  Calendar,
  Building,
  BarChart3,
  PieChart,
  Clock,
  AlertCircle,
  UserCheck,
  UserX,
  BookOpen,
  Settings,
  Eye,
  Download
} from 'lucide-react';

const AdminDashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get dashboard data
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock dashboard data
        const mockData = {
          summary: {
            totalStudents: 1250,
            totalTeachers: 85,
            totalClasses: 42,
            attendanceToday: 94.2
          },
          attendanceStats: {
            presentToday: 1175,
            absentToday: 75,
            lateToday: 23,
            totalSessions: 168
          },
          recentActivity: [
            { type: 'student_registration', message: 'New student registered: John Smith', time: '2 hours ago', status: 'completed' },
            { type: 'attendance_submitted', message: 'Class 10A attendance submitted by Dr. Johnson', time: '1 hour ago', status: 'completed' },
            { type: 'marks_uploaded', message: 'Physics mid-term marks uploaded by Prof. Williams', time: '30 minutes ago', status: 'completed' },
            { type: 'teacher_assigned', message: 'New teacher assigned to Class 11B', time: '15 minutes ago', status: 'pending' }
          ],
          classPerformance: [
            { class: 'Class 10A', students: 35, attendance: 94.3, performance: 'Excellent' },
            { class: 'Class 10B', students: 38, attendance: 91.7, performance: 'Good' },
            { class: 'Class 11A', students: 42, attendance: 95.2, performance: 'Excellent' },
            { class: 'Class 11B', students: 40, attendance: 89.5, performance: 'Good' },
            { class: 'Class 12A', students: 45, attendance: 96.7, performance: 'Excellent' },
            { class: 'Class 12B', students: 43, attendance: 92.1, performance: 'Good' }
          ],
          teacherStats: [
            { name: 'Dr. Johnson', subject: 'Mathematics', classes: 6, students: 220, rating: 4.8 },
            { name: 'Prof. Williams', subject: 'Physics', classes: 5, students: 185, rating: 4.6 },
            { name: 'Ms. Davis', subject: 'English', classes: 4, students: 150, rating: 4.7 },
            { name: 'Mr. Brown', subject: 'Computer Science', classes: 3, students: 120, rating: 4.9 }
          ]
        };
        
        setDashboardData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getPerformanceColor = (performance) => {
    if (performance === 'Excellent') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
    if (performance === 'Good') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    if (performance === 'Average') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400';
    return 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400';
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'student_registration':
        return <Users className="w-5 h-5 text-blue-600" />;
      case 'attendance_submitted':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'marks_uploaded':
        return <GraduationCap className="w-5 h-5 text-purple-600" />;
      case 'teacher_assigned':
        return <UserCheck className="w-5 h-5 text-orange-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'student_registration':
        return 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700';
      case 'attendance_submitted':
        return 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700';
      case 'marks_uploaded':
        return 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700';
      case 'teacher_assigned':
        return 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-700';
      default:
        return 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-gray-700 bg-clip-text text-transparent">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
          Monitor and manage your educational institution
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Students</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {dashboardData?.summary.totalStudents.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Total Teachers</p>
                <p className="text-2xl font-bold text-teal-800 dark:text-teal-200">
                  {dashboardData?.summary.totalTeachers}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                <Building className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Classes</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                  {dashboardData?.summary.totalClasses}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Attendance %</p>
                <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                  {dashboardData?.summary.attendanceToday}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Present Today</p>
            <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
              {dashboardData?.attendanceStats.presentToday.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserX className="w-8 h-8 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="text-sm font-medium text-rose-700 dark:text-rose-300">Absent Today</p>
            <p className="text-2xl font-bold text-rose-800 dark:text-rose-200">
              {dashboardData?.attendanceStats.absentToday}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Late Today</p>
            <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
              {dashboardData?.attendanceStats.lateToday}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Total Sessions</p>
            <p className="text-2xl font-bold text-indigo-800 dark:text-indigo-200">
              {dashboardData?.attendanceStats.totalSessions}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Class Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <BarChart3 className="w-7 h-7 text-blue-600" />
              <span>Class Performance Overview</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Performance metrics for all classes
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData?.classPerformance.map((classInfo, index) => (
                <motion.div
                  key={classInfo.class}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{classInfo.class}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPerformanceColor(classInfo.performance)}`}>
                      {classInfo.performance}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Students:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{classInfo.students}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Attendance:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{classInfo.attendance}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          classInfo.attendance >= 95 ? 'bg-emerald-500' :
                          classInfo.attendance >= 90 ? 'bg-blue-500' :
                          classInfo.attendance >= 85 ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`}
                        style={{ width: `${classInfo.attendance}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Activity and Teacher Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <Clock className="w-6 h-6 text-purple-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Latest updates and activities
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              {dashboardData?.recentActivity.map((activity, index) => (
                <motion.div
                  key={`${activity.type}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`flex items-center space-x-4 p-4 rounded-xl border ${getActivityColor(activity.type)}`}
                >
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400'
                  }`}>
                    {activity.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teacher Statistics */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <GraduationCap className="w-6 h-6 text-teal-600" />
              <span>Top Teachers</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Performance overview of leading teachers
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              {dashboardData?.teacherStats.map((teacher, index) => (
                <motion.div
                  key={teacher.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{teacher.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Rating:</span>
                      <span className="font-medium text-teal-600 dark:text-teal-400">{teacher.rating}/5.0</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {teacher.classes} classes, {teacher.students} students
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Manage Students</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">View and manage student records</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Manage Teachers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Assign and manage teaching staff</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Timetable Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Create and modify schedules</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">View Reports</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generate comprehensive reports</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboardPage;
