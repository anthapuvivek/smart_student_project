import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Calendar,
  User,
  GraduationCap,
  BarChart3,
  CheckSquare,
  Building,
  Award,
  AlertCircle
} from 'lucide-react';

const TeacherDashboardPage = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [recentClasses, setRecentClasses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get dashboard data
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock timetable data
        const mockTimetable = {
          periods: [
            { time: '8:00 - 9:00', subject: 'Mathematics', class: 'Class 10A', room: 'Room 101', students: 35 },
            { time: '9:00 - 10:00', subject: 'Mathematics', class: 'Class 11B', room: 'Room 102', students: 38 },
            { time: '10:00 - 11:00', subject: 'Mathematics', class: 'Class 12A', room: 'Room 103', students: 42 },
            { time: '11:00 - 12:00', subject: 'Mathematics', class: 'Class 10B', room: 'Room 104', students: 36 },
            { time: '2:00 - 3:00', subject: 'Mathematics', class: 'Class 11A', room: 'Room 105', students: 40 },
            { time: '3:00 - 4:00', subject: 'Mathematics', class: 'Class 12B', room: 'Room 106', students: 39 }
          ],
          totalClasses: 6,
          totalStudents: 230
        };

        // Mock attendance stats
        const mockAttendanceStats = {
          todayClasses: 4,
          totalStudents: 151,
          presentStudents: 142,
          absentStudents: 9,
          attendancePercentage: 94.0,
          classBreakdown: [
            { class: 'Class 10A', present: 33, absent: 2, percentage: 94.3 },
            { class: 'Class 11B', present: 36, absent: 2, percentage: 94.7 },
            { class: 'Class 12A', present: 40, absent: 2, percentage: 95.2 },
            { class: 'Class 10B', present: 33, absent: 3, percentage: 91.7 }
          ]
        };

        // Mock recent classes
        const mockRecentClasses = {
          completed: [
            { subject: 'Mathematics', class: 'Class 10A', time: '8:00 AM', attendance: '33/35', status: 'completed' },
            { subject: 'Mathematics', class: 'Class 11B', time: '9:00 AM', attendance: '36/38', status: 'completed' },
            { subject: 'Mathematics', class: 'Class 12A', time: '10:00 AM', attendance: '40/42', status: 'completed' }
          ],
          upcoming: [
            { subject: 'Mathematics', class: 'Class 10B', time: '2:00 PM', students: 36, status: 'upcoming' },
            { subject: 'Mathematics', class: 'Class 11A', time: '3:00 PM', students: 40, status: 'upcoming' },
            { subject: 'Mathematics', class: 'Class 12B', time: '4:00 PM', students: 39, status: 'upcoming' }
          ]
        };
        
        setTimetableData(mockTimetable);
        setAttendanceStats(mockAttendanceStats);
        setRecentClasses(mockRecentClasses);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    if (status === 'completed') return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400';
    if (status === 'upcoming') return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4" />;
    if (status === 'upcoming') return <Clock className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
          Welcome Back, Teacher!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
          Here's your class schedule and overview for today
        </p>
      </motion.div>

      {/* Quick Stats Cards */}
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
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Today's Classes</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {timetableData?.totalClasses}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Total Students</p>
                <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                  {timetableData?.totalStudents}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Attendance %</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                  {attendanceStats?.attendancePercentage}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Present Today</p>
                <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                  {attendanceStats?.presentStudents}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Class Timetable Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-900/20 dark:to-orange-900/20">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <Clock className="w-7 h-7 text-blue-600" />
              <span>Today's Class Timetable</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your class schedule for today
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timetableData?.periods.map((period, index) => (
                <motion.div
                  key={`${period.time}-${period.class}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {period.time}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{period.subject}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Class:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{period.class}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Room:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{period.room}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Students:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{period.students}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Attendance Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <CheckSquare className="w-7 h-7 text-emerald-600" />
              <span>Today's Attendance Overview</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Attendance statistics for your classes today
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {attendanceStats?.classBreakdown.map((classInfo, index) => (
                <motion.div
                  key={classInfo.class}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 border border-gray-200 dark:border-gray-600"
                >
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{classInfo.class}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Present:</span>
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">{classInfo.present}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Absent:</span>
                        <span className="font-medium text-rose-600 dark:text-rose-400">{classInfo.absent}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            classInfo.percentage >= 95 ? 'bg-emerald-500' :
                            classInfo.percentage >= 90 ? 'bg-blue-500' :
                            classInfo.percentage >= 85 ? 'bg-amber-500' :
                            'bg-rose-500'
                          }`}
                          style={{ width: `${classInfo.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {classInfo.percentage}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Classes Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Completed Classes */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
              <span>Completed Classes</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Classes you've taught today
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentClasses?.completed.map((classInfo, index) => (
                <motion.div
                  key={`${classInfo.class}-${classInfo.time}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{classInfo.class}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{classInfo.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{classInfo.time}</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">{classInfo.attendance}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <Clock className="w-6 h-6 text-blue-600" />
              <span>Upcoming Classes</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your remaining classes today
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentClasses?.upcoming.map((classInfo, index) => (
                <motion.div
                  key={`${classInfo.class}-${classInfo.time}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{classInfo.class}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{classInfo.subject}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{classInfo.time}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{classInfo.students} students</p>
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
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Take Attendance</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mark student attendance for your classes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Assign Marks</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Grade student assignments and exams</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">View Reports</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Analyze class performance and attendance</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TeacherDashboardPage;
