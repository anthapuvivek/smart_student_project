import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Users, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Building,
  Filter,
  Download,
  Eye,
  Mail,
  Phone
} from 'lucide-react';

const AdminTeacherOverviewPage = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Simulate API call to get teacher overview data
    const fetchTeacherData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockData = {
          totalTeachers: 45,
          presentToday: 42,
          absentToday: 3,
          attendancePercentage: 93.3,
          departmentBreakdown: [
            { department: 'Mathematics', total: 8, present: 8, absent: 0, percentage: 100 },
            { department: 'Physics', total: 7, present: 6, absent: 1, percentage: 85.7 },
            { department: 'Chemistry', total: 6, present: 6, absent: 0, percentage: 100 },
            { department: 'English', total: 5, present: 5, absent: 0, percentage: 100 },
            { department: 'Computer Science', total: 6, present: 5, absent: 1, percentage: 83.3 },
            { department: 'Biology', total: 4, present: 4, absent: 0, percentage: 100 },
            { department: 'History', total: 3, present: 3, absent: 0, percentage: 100 },
            { department: 'Geography', total: 3, present: 2, absent: 1, percentage: 66.7 },
            { department: 'Economics', total: 3, present: 3, absent: 0, percentage: 100 }
          ],
          monthlyTrend: [
            { month: 'Jan', present: 44, absent: 1, percentage: 97.8 },
            { month: 'Feb', present: 43, absent: 2, percentage: 95.6 },
            { month: 'Mar', present: 44, absent: 1, percentage: 97.8 },
            { month: 'Apr', present: 42, absent: 3, percentage: 93.3 },
            { month: 'May', present: 41, absent: 4, percentage: 91.1 },
            { month: 'Jun', present: 42, absent: 3, percentage: 93.3 }
          ],
          teacherList: [
            {
              id: 1,
              name: 'Dr. Sarah Johnson',
              department: 'Mathematics',
              email: 'sarah.johnson@school.edu',
              phone: '+1-555-0101',
              status: 'present',
              lastAttendance: '2024-06-23 08:00 AM',
              classes: 6,
              students: 180
            },
            {
              id: 2,
              name: 'Prof. Michael Chen',
              department: 'Physics',
              email: 'michael.chen@school.edu',
              phone: '+1-555-0102',
              status: 'present',
              lastAttendance: '2024-06-23 08:15 AM',
              classes: 5,
              students: 150
            },
            {
              id: 3,
              name: 'Dr. Emily Rodriguez',
              department: 'Chemistry',
              email: 'emily.rodriguez@school.edu',
              phone: '+1-555-0103',
              status: 'present',
              lastAttendance: '2024-06-23 08:30 AM',
              classes: 4,
              students: 120
            },
            {
              id: 4,
              name: 'Mr. David Thompson',
              department: 'English',
              email: 'david.thompson@school.edu',
              phone: '+1-555-0104',
              status: 'present',
              lastAttendance: '2024-06-23 08:45 AM',
              classes: 5,
              students: 140
            },
            {
              id: 5,
              name: 'Ms. Lisa Wang',
              department: 'Computer Science',
              email: 'lisa.wang@school.edu',
              phone: '+1-555-0105',
              status: 'absent',
              lastAttendance: '2024-06-22 09:00 AM',
              classes: 4,
              students: 110
            },
            {
              id: 6,
              name: 'Dr. Robert Kim',
              department: 'Biology',
              email: 'robert.kim@school.edu',
              phone: '+1-555-0106',
              status: 'present',
              lastAttendance: '2024-06-23 09:15 AM',
              classes: 3,
              students: 90
            },
            {
              id: 7,
              name: 'Prof. Amanda Davis',
              department: 'History',
              email: 'amanda.davis@school.edu',
              phone: '+1-555-0107',
              status: 'present',
              lastAttendance: '2024-06-23 09:30 AM',
              classes: 4,
              students: 100
            },
            {
              id: 8,
              name: 'Mr. James Wilson',
              department: 'Geography',
              email: 'james.wilson@school.edu',
              phone: '+1-555-0108',
              status: 'absent',
              lastAttendance: '2024-06-22 10:00 AM',
              classes: 3,
              students: 80
            }
          ]
        };
        
        setTeacherData(mockData);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  const COLORS = ['#10B981', '#EF4444', '#F59E0B', '#8B5CF6', '#3B82F6'];

  const pieData = [
    { name: 'Present', value: teacherData?.presentToday || 0, color: '#10B981' },
    { name: 'Absent', value: teacherData?.absentToday || 0, color: '#EF4444' }
  ];

  const getFilteredData = () => {
    if (selectedDepartment === 'all') {
      return teacherData?.departmentBreakdown || [];
    }
    return teacherData?.departmentBreakdown.filter(item => item.department === selectedDepartment) || [];
  };

  const getFilteredTeachers = () => {
    if (selectedDepartment === 'all') {
      return teacherData?.teacherList || [];
    }
    return teacherData?.teacherList.filter(teacher => teacher.department === selectedDepartment) || [];
  };

  const filteredData = getFilteredData();
  const filteredTeachers = getFilteredTeachers();

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
            Teacher Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Monitor teacher attendance and performance across all departments
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
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Geography">Geography</SelectItem>
              <SelectItem value="Economics">Economics</SelectItem>
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
                <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Total Teachers</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{teacherData?.totalTeachers}</p>
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
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{teacherData?.presentToday}</p>
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
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">{teacherData?.absentToday}</p>
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
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{teacherData?.attendancePercentage}%</p>
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
              Today's Teacher Attendance
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

        {/* Bar Chart */}
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Monthly Attendance Trend
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Teacher attendance pattern over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teacherData?.monthlyTrend}>
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
                <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Department-wise Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Department-wise Attendance Breakdown
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Detailed attendance statistics for each department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Department</TableHead>
                  <TableHead className="font-medium">Total Teachers</TableHead>
                  <TableHead className="font-medium">Present</TableHead>
                  <TableHead className="font-medium">Absent</TableHead>
                  <TableHead className="font-medium">Attendance %</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((dept, index) => (
                  <motion.tr
                    key={dept.department}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <TableCell className="font-medium">{dept.department}</TableCell>
                    <TableCell>{dept.total}</TableCell>
                    <TableCell className="text-green-600 dark:text-green-400 font-medium">
                      {dept.present}
                    </TableCell>
                    <TableCell className="text-red-600 dark:text-red-400 font-medium">
                      {dept.absent}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{dept.percentage}%</span>
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              dept.percentage >= 90 ? 'bg-green-500' :
                              dept.percentage >= 80 ? 'bg-blue-500' :
                              dept.percentage >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${dept.percentage}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        dept.percentage >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                        dept.percentage >= 80 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                        dept.percentage >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {dept.percentage >= 90 ? 'Excellent' :
                         dept.percentage >= 80 ? 'Good' :
                         dept.percentage >= 70 ? 'Average' :
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

      {/* Teacher List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Teacher Details
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Individual teacher information and attendance status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Department</TableHead>
                  <TableHead className="font-medium">Contact</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Last Attendance</TableHead>
                  <TableHead className="font-medium">Classes</TableHead>
                  <TableHead className="font-medium">Students</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher, index) => (
                  <motion.tr
                    key={teacher.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Mail className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">{teacher.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Phone className="w-3 h-3 text-gray-500" />
                          <span className="text-gray-600 dark:text-gray-400">{teacher.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        teacher.status === 'present' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {teacher.status.charAt(0).toUpperCase() + teacher.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                      {teacher.lastAttendance}
                    </TableCell>
                    <TableCell>{teacher.classes}</TableCell>
                    <TableCell>{teacher.students}</TableCell>
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
    </div>
  );
};

export default AdminTeacherOverviewPage;
