import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Progress } from '../../components/ui/progress';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Award, TrendingUp, Target, BookOpen, Star, Trophy, AlertCircle } from 'lucide-react';

const StudentMarksPage = () => {
  const [marksData, setMarksData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get marks data
    const fetchMarksData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockData = {
          overallPercentage: 87.5,
          totalSubjects: 6,
          subjects: [
            { 
              name: 'Mathematics', 
              marks: 85, 
              totalMarks: 100, 
              percentage: 85, 
              grade: 'A', 
              status: 'good',
              trend: 'up'
            },
            { 
              name: 'Physics', 
              marks: 92, 
              totalMarks: 100, 
              percentage: 92, 
              grade: 'A+', 
              status: 'excellent',
              trend: 'up'
            },
            { 
              name: 'Chemistry', 
              marks: 78, 
              totalMarks: 100, 
              percentage: 78, 
              grade: 'B+', 
              status: 'good',
              trend: 'down'
            },
            { 
              name: 'English', 
              marks: 88, 
              totalMarks: 100, 
              percentage: 88, 
              grade: 'A', 
              status: 'good',
              trend: 'up'
            },
            { 
              name: 'Computer Science', 
              marks: 95, 
              totalMarks: 100, 
              percentage: 95, 
              grade: 'A+', 
              status: 'excellent',
              trend: 'up'
            },
            { 
              name: 'Biology', 
              marks: 82, 
              totalMarks: 100, 
              percentage: 82, 
              grade: 'A-', 
              status: 'good',
              trend: 'stable'
            }
          ],
          monthlyProgress: [
            { month: 'Jan', average: 82 },
            { month: 'Feb', average: 85 },
            { month: 'Mar', average: 88 },
            { month: 'Apr', average: 86 },
            { month: 'May', average: 89 },
            { month: 'Jun', average: 87.5 }
          ]
        };
        
        setMarksData(mockData);
      } catch (error) {
        console.error('Error fetching marks data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarksData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'good':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'average':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'poor':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A+')) return 'text-green-600 dark:text-green-400';
    if (grade.includes('A')) return 'text-blue-600 dark:text-blue-400';
    if (grade.includes('B+')) return 'text-yellow-600 dark:text-yellow-400';
    if (grade.includes('B')) return 'text-orange-600 dark:text-orange-400';
    if (grade.includes('C')) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-600 transform rotate-180" />;
      case 'stable':
        return <div className="w-4 h-4 border-2 border-gray-400 border-t-0 border-l-0 transform rotate-45" />;
      default:
        return null;
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
            Academic Performance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View your marks and academic progress
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
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Overall %</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{marksData?.overallPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Subjects</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{marksData?.totalSubjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Best Subject</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">CS (95%)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Grade</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">A</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Overall Academic Progress
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your current performance: {marksData?.overallPercentage}%
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {marksData?.overallPercentage}% achieved
                </span>
              </div>
              <Progress 
                value={marksData?.overallPercentage} 
                className="h-3"
              />
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Target className="w-4 h-4" />
              <span>Target: 90% (Keep up the good work!)</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Marks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Subject-wise Marks
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Detailed breakdown of your performance in each subject
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Subject</TableHead>
                  <TableHead className="font-medium">Marks</TableHead>
                  <TableHead className="font-medium">Percentage</TableHead>
                  <TableHead className="font-medium">Grade</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marksData?.subjects.map((subject, index) => (
                  <motion.tr
                    key={subject.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <TableCell className="font-medium">{subject.name}</TableCell>
                    <TableCell>
                      <span className="font-semibold">{subject.marks}</span>
                      <span className="text-gray-500 dark:text-gray-400">/{subject.totalMarks}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{subject.percentage}%</span>
                        <Progress 
                          value={subject.percentage} 
                          className="w-16 h-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-bold text-lg ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(subject.status)}`}>
                        {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getTrendIcon(subject.trend)}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Monthly Performance Trend
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your academic progress over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marksData?.monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#6B7280" />
                <YAxis stroke="#6B7280" domain={[70, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2, fill: '#FFFFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <Star className="w-5 h-5 text-green-600" />
              <span>Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Excellent performance in Computer Science (95%)</li>
              <li>• Strong foundation in Physics (92%)</li>
              <li>• Consistent improvement in Mathematics</li>
              <li>• Good command over English (88%)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-0">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              <span>Areas for Improvement</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Chemistry needs attention (78%)</li>
              <li>• Biology could be improved (82%)</li>
              <li>• Focus on consistent performance</li>
              <li>• Practice more problem-solving</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentMarksPage;
