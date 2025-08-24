import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Award,
  User,
  GraduationCap,
  BarChart3,
  CheckSquare
} from 'lucide-react';

const StudentDashboardPage = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get dashboard data
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock attendance data
        const mockAttendance = {
          date: new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          subjects: [
            { name: 'Mathematics', status: 'present', time: '8:00 AM', teacher: 'Dr. Smith', room: 'Room 101' },
            { name: 'Physics', status: 'present', time: '9:00 AM', teacher: 'Prof. Johnson', room: 'Room 102' },
            { name: 'Chemistry', status: 'absent', time: '10:00 AM', teacher: 'Dr. Williams', room: 'Room 103' },
            { name: 'English', status: 'present', time: '11:00 AM', teacher: 'Ms. Davis', room: 'Room 104' },
            { name: 'Computer Science', status: 'present', time: '2:00 PM', teacher: 'Mr. Brown', room: 'Lab 1' }
          ],
          overallStatus: 'present',
          totalSubjects: 5,
          presentCount: 4,
          absentCount: 1
        };

        // Mock marks data
        const mockMarks = {
          recentExams: [
            { subject: 'Mathematics', exam: 'Mid Term', score: 85, total: 100, grade: 'A', date: '2024-01-15' },
            { subject: 'Physics', exam: 'Unit Test', score: 78, total: 100, grade: 'B+', date: '2024-01-12' },
            { subject: 'Chemistry', exam: 'Quiz', score: 92, total: 100, grade: 'A+', date: '2024-01-10' },
            { subject: 'English', exam: 'Essay', score: 88, total: 100, grade: 'A', date: '2024-01-08' },
            { subject: 'Computer Science', exam: 'Practical', score: 95, total: 100, grade: 'A+', date: '2024-01-05' }
          ],
          averageScore: 87.6,
          highestSubject: 'Computer Science',
          improvement: '+5.2%'
        };
        
        setAttendanceData(mockAttendance);
        setMarksData(mockMarks);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    return status === 'present' 
      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' 
      : 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400';
  };

  const getStatusIcon = (status) => {
    return status === 'present' ? (
      <CheckCircle className="w-5 h-5 text-emerald-600" />
    ) : (
      <XCircle className="w-5 h-5 text-rose-600" />
    );
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A+')) return 'text-emerald-600 dark:text-emerald-400';
    if (grade.includes('A')) return 'text-blue-600 dark:text-blue-400';
    if (grade.includes('B+')) return 'text-amber-600 dark:text-amber-400';
    if (grade.includes('B')) return 'text-orange-600 dark:text-orange-400';
    return 'text-gray-600 dark:text-gray-400';
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
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
          Welcome Back, Student!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
          Here's your academic overview for {attendanceData?.date}
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
                <CheckSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Today's Status</p>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                  {attendanceData?.overallStatus?.charAt(0).toUpperCase() + attendanceData?.overallStatus?.slice(1)}
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
                <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Present Today</p>
                <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                  {attendanceData?.presentCount}/{attendanceData?.totalSubjects}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Average Score</p>
                <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                  {marksData?.averageScore}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Improvement</p>
                <p className="text-2xl font-bold text-teal-800 dark:text-teal-200">
                  {marksData?.improvement}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Today's Attendance Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <CheckSquare className="w-7 h-7 text-blue-600" />
              <span>Today's Attendance</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your attendance status for all subjects today
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              {attendanceData?.subjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{subject.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{subject.time}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{subject.teacher}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{subject.room}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subject.status)}`}>
                      {getStatusIcon(subject.status)}
                      <span className="ml-2">{subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}</span>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Marks Overview Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <Award className="w-7 h-7 text-emerald-600" />
              <span>Marks Overview</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your recent exam performance and grades
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marksData?.recentExams.map((exam, index) => (
                <motion.div
                  key={`${exam.subject}-${exam.exam}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{exam.subject}</h3>
                    <span className={`text-lg font-bold ${getGradeColor(exam.grade)}`}>
                      {exam.grade}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Exam:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{exam.exam}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Score:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {exam.score}/{exam.total}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Date:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(exam.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          exam.score >= 90 ? 'bg-emerald-500' :
                          exam.score >= 80 ? 'bg-blue-500' :
                          exam.score >= 70 ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`}
                        style={{ width: `${exam.score}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Performance Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Best Subject</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{marksData?.highestSubject}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{marksData?.averageScore}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Improvement</p>
                  <p className="text-xl font-bold text-teal-600 dark:text-teal-400">{marksData?.improvement}</p>
                </div>
              </div>
            </motion.div>
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
              <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">View Full Report</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Detailed attendance and marks analysis</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Academic Calendar</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming exams and events</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-0 hover:shadow-lg transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Student Profile</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update personal information</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentDashboardPage;
