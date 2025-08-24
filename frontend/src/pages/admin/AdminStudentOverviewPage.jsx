import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Calendar,
  Filter,
  Download,
  Eye
} from 'lucide-react';

const AdminStudentOverviewPage = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Simulate API call to get student overview data
    const fetchStudentData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockData = {
          totalStudents: 450,
          presentToday: 398,
          absentToday: 52,
          attendancePercentage: 88.4,
          classBreakdown: [
            { class: 'Class 10A', total: 35, present: 32, absent: 3, percentage: 91.4 },
            { class: 'Class 10B', total: 38, present: 34, absent: 4, percentage: 89.5 },
            { class: 'Class 11A', total: 42, present: 38, absent: 4, percentage: 90.5 },
            { class: 'Class 11B', total: 40, present: 35, absent: 5, percentage: 87.5 },
            { class: 'Class 12A', total: 45, present: 41, absent: 4, percentage: 91.1 },
            { class: 'Class 12B', total: 43, present: 38, absent: 5, percentage: 88.4 }
          ],
          monthlyTrend: [
            { month: 'Jan', present: 420, absent: 30, percentage: 93.3 },
            { month: 'Feb', present: 415, absent: 35, percentage: 92.2 },
            { month: 'Mar', present: 408, absent: 42, percentage: 90.7 },
            { month: 'Apr', present: 402, absent: 48, percentage: 89.3 },
            { month: 'May', present: 395, absent: 55, percentage: 87.8 },
            { month: 'Jun', present: 398, absent: 52, percentage: 88.4 }
          ],
          subjectAttendance: [
            { subject: 'Mathematics', present: 425, absent: 25, percentage: 94.4 },
            { subject: 'Physics', present: 418, absent: 32, percentage: 92.9 },
            { subject: 'Chemistry', present: 412, absent: 38, percentage: 91.6 },
            { subject: 'English', present: 420, absent: 30, percentage: 93.3 },
            { subject: 'Computer Science', present: 415, absent: 35, percentage: 92.2 }
          ]
        };
        
        setStudentData(mockData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6'];

  const pieData = [
    { name: 'Present', value: studentData?.presentToday || 0, color: '#10B981' },
    { name: 'Absent', value: studentData?.absentToday || 0, color: '#EF4444' }
  ];

  const getFilteredData = () => {
    if (selectedClass === 'all') {
      return studentData?.classBreakdown || [];
    }
    return studentData?.classBreakdown.filter(item => item.class === selectedClass) || [];
  };

  const filteredData = getFilteredData();

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
            Student Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor student attendance and performance across all classes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Class</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              <SelectItem value="Class 10A">Class 10A</SelectItem>
              <SelectItem value="Class 10B">Class 10B</SelectItem>
              <SelectItem value="Class 11A">Class 11A</SelectItem>
              <SelectItem value="Class 11B">Class 11B</SelectItem>
              <SelectItem value="Class 12A">Class 12A</SelectItem>
              <SelectItem value="Class 12B">Class 12B</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Total Students</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{studentData?.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Present Today</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{studentData?.presentToday}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Absent Today</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{studentData?.absentToday}</p>
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
                <p className="text-sm font-medium text-gray-900 dark:text-white">Attendance %</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{studentData?.attendancePercentage}%</p>
              </div>
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
        {/* Pie Chart */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Today's Attendance Overview
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
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
              <BarChart data={studentData?.monthlyTrend}>
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
                <Legend />
                <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Class-wise Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Class-wise Attendance Breakdown
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Detailed attendance statistics for each class
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Class</TableHead>
                  <TableHead className="font-medium">Total Students</TableHead>
                  <TableHead className="font-medium">Present</TableHead>
                  <TableHead className="font-medium">Absent</TableHead>
                  <TableHead className="font-medium">Attendance %</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((classInfo, index) => (
                  <motion.tr
                    key={classInfo.class}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <TableCell className="font-medium">{classInfo.class}</TableCell>
                    <TableCell>{classInfo.total}</TableCell>
                    <TableCell className="text-green-600 dark:text-green-400 font-medium">
                      {classInfo.present}
                    </TableCell>
                    <TableCell className="text-red-600 dark:text-red-400 font-medium">
                      {classInfo.absent}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{classInfo.percentage}%</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              classInfo.percentage >= 90 ? 'bg-green-500' :
                              classInfo.percentage >= 80 ? 'bg-blue-500' :
                              classInfo.percentage >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${classInfo.percentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        classInfo.percentage >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        classInfo.percentage >= 80 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        classInfo.percentage >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {classInfo.percentage >= 90 ? 'Excellent' :
                         classInfo.percentage >= 80 ? 'Good' :
                         classInfo.percentage >= 70 ? 'Average' :
                         'Poor'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Subject-wise Attendance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Subject-wise Attendance
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Attendance statistics by subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studentData?.subjectAttendance.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">{subject.subject}</h3>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {subject.percentage}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Present:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{subject.present}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Absent:</span>
                      <span className="font-medium text-red-600 dark:text-red-400">{subject.absent}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          subject.percentage >= 90 ? 'bg-green-500' :
                          subject.percentage >= 80 ? 'bg-blue-500' :
                          subject.percentage >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${subject.percentage}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminStudentOverviewPage;
