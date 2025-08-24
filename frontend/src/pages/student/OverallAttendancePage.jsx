import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Target, Clock, CheckCircle, XCircle } from 'lucide-react';

const OverallAttendancePage = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get overall attendance data
    const fetchAttendanceData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockData = {
          totalClasses: 120,
          attendedClasses: 108,
          attendancePercentage: 90,
          monthlyData: [
            { month: 'Jan', attended: 22, total: 25 },
            { month: 'Feb', attended: 20, total: 22 },
            { month: 'Mar', attended: 23, total: 25 },
            { month: 'Apr', attended: 19, total: 20 },
            { month: 'May', attended: 18, total: 20 },
            { month: 'Jun', attended: 6, total: 8 }
          ],
          subjectBreakdown: [
            { subject: 'Mathematics', attended: 35, total: 40, percentage: 87.5 },
            { subject: 'Physics', attended: 32, total: 35, percentage: 91.4 },
            { subject: 'Chemistry', attended: 30, total: 35, percentage: 85.7 },
            { subject: 'English', attended: 11, total: 10, percentage: 110 }
          ]
        };
        
        setAttendanceData(mockData);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

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

  const pieData = [
    { name: 'Present', value: attendanceData?.attendedClasses || 0, color: '#10B981' },
    { name: 'Absent', value: (attendanceData?.totalClasses || 0) - (attendanceData?.attendedClasses || 0), color: '#EF4444' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Overall Attendance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your attendance performance over time
          </p>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Total Classes</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{attendanceData?.totalClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Attended</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{attendanceData?.attendedClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Absent</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {(attendanceData?.totalClasses || 0) - (attendanceData?.attendedClasses || 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Percentage</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{attendanceData?.attendancePercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Overall Attendance Progress
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your attendance rate: {attendanceData?.attendancePercentage}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {attendanceData?.attendedClasses} / {attendanceData?.totalClasses} classes
                </span>
              </div>
              <Progress 
                value={attendanceData?.attendancePercentage} 
                className="h-3"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Target className="w-4 h-4" />
              <span>Target: 85% (Good attendance rate!)</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Monthly Attendance Chart */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Monthly Attendance Trend
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Attendance pattern over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData?.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Bar dataKey="attended" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Attendance Overview
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Present vs Absent distribution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject-wise Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Subject-wise Attendance
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Detailed breakdown by subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData?.subjectBreakdown.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">{subject.subject}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {subject.attended} / {subject.total} ({subject.percentage}%)
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(subject.percentage, 100)} 
                    className="h-2"
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-0">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Best Month</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">March (92% attendance)</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 border-0">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Streak</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">15 consecutive days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-0">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-pink-600 dark:text-pink-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Goal</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">95% by year end</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default OverallAttendancePage;
