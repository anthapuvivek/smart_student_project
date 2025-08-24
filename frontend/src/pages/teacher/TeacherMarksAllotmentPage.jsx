import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Save, 
  Search, 
  Filter, 
  Users, 
  Award,
  BookOpen,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';

const TeacherMarksAllotmentPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    // Simulate API call to get students data
    const fetchStudents = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockStudents = [
          { 
            id: 1, 
            name: 'John Doe', 
            rollNo: '001', 
            email: 'john@example.com',
            marks: { theory: 85, practical: 18, total: 103, percentage: 85.8, grade: 'A' }
          },
          { 
            id: 2, 
            name: 'Jane Smith', 
            rollNo: '002', 
            email: 'jane@example.com',
            marks: { theory: 92, practical: 20, total: 112, percentage: 93.3, grade: 'A+' }
          },
          { 
            id: 3, 
            name: 'Mike Johnson', 
            rollNo: '003', 
            email: 'mike@example.com',
            marks: { theory: 78, practical: 16, total: 94, percentage: 78.3, grade: 'B+' }
          },
          { 
            id: 4, 
            name: 'Sarah Wilson', 
            rollNo: '004', 
            email: 'sarah@example.com',
            marks: { theory: 88, practical: 19, total: 107, percentage: 89.2, grade: 'A' }
          },
          { 
            id: 5, 
            name: 'David Brown', 
            rollNo: '005', 
            email: 'david@example.com',
            marks: { theory: 95, practical: 20, total: 115, percentage: 95.8, grade: 'A+' }
          },
          { 
            id: 6, 
            name: 'Emily Davis', 
            rollNo: '006', 
            email: 'emily@example.com',
            marks: { theory: 82, practical: 17, total: 99, percentage: 82.5, grade: 'A-' }
          },
          { 
            id: 7, 
            name: 'Chris Lee', 
            rollNo: '007', 
            email: 'chris@example.com',
            marks: { theory: 75, practical: 15, total: 90, percentage: 75.0, grade: 'B' }
          },
          { 
            id: 8, 
            name: 'Lisa Garcia', 
            rollNo: '008', 
            email: 'lisa@example.com',
            marks: { theory: 89, practical: 19, total: 108, percentage: 90.0, grade: 'A' }
          },
          { 
            id: 9, 
            name: 'Tom Martinez', 
            rollNo: '009', 
            email: 'tom@example.com',
            marks: { theory: 91, practical: 20, total: 111, percentage: 92.5, grade: 'A+' }
          },
          { 
            id: 10, 
            name: 'Anna Taylor', 
            rollNo: '010', 
            email: 'anna@example.com',
            marks: { theory: 87, practical: 18, total: 105, percentage: 87.5, grade: 'A' }
          }
        ];
        
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    // Filter students based on search term
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleMarksChange = (studentId, field, value) => {
    setStudents(prev => 
      prev.map(student => {
        if (student.id === studentId) {
          const newMarks = { ...student.marks, [field]: parseInt(value) || 0 };
          const total = newMarks.theory + newMarks.practical;
          const percentage = Math.round((total / 120) * 100 * 10) / 10;
          const grade = getGrade(percentage);
          
          return {
            ...student,
            marks: {
              ...newMarks,
              total,
              percentage,
              grade
            }
          };
        }
        return student;
      })
    );
  };

  const getGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'A-';
    if (percentage >= 60) return 'B+';
    if (percentage >= 50) return 'B';
    if (percentage >= 40) return 'C+';
    if (percentage >= 30) return 'C';
    return 'F';
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would send the marks data to your backend
      console.log('Marks submitted:', {
        class: selectedClass,
        subject: selectedSubject,
        exam: selectedExam,
        students: students
      });
      
      alert('Marks saved successfully!');
      setEditingStudent(null);
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('Error saving marks. Please try again.');
    } finally {
      setIsSubmitting(false);
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

  const getPerformanceStats = () => {
    const total = students.length;
    const passed = students.filter(s => s.marks.percentage >= 40).length;
    const distinction = students.filter(s => s.marks.percentage >= 75).length;
    const average = students.reduce((sum, s) => sum + s.marks.percentage, 0) / total;
    
    return { total, passed, distinction, average: Math.round(average * 10) / 10 };
  };

  const stats = getPerformanceStats();

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
            Marks Allotment
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Assign and manage student marks
          </p>
        </div>
      </motion.div>

      {/* Selection Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="space-y-2">
          <Label htmlFor="class">Class</Label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="class-10">Class 10</SelectItem>
              <SelectItem value="class-11">Class 11</SelectItem>
              <SelectItem value="class-12">Class 12</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="computer-science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="exam">Exam Type</Label>
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger>
              <SelectValue placeholder="Select exam" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mid-term">Mid Term</SelectItem>
              <SelectItem value="final">Final Term</SelectItem>
              <SelectItem value="unit-test">Unit Test</SelectItem>
              <SelectItem value="practical">Practical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Performance Stats */}
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
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Passed</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.passed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Distinction</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.distinction}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Average %</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.average}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search students by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Marks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Student Marks
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Enter marks for each student (Theory: 100, Practical: 20, Total: 120)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Roll No</TableHead>
                  <TableHead className="font-medium">Name</TableHead>
                  <TableHead className="font-medium">Theory</TableHead>
                  <TableHead className="font-medium">Practical</TableHead>
                  <TableHead className="font-medium">Total</TableHead>
                  <TableHead className="font-medium">Percentage</TableHead>
                  <TableHead className="font-medium">Grade</TableHead>
                  <TableHead className="font-medium">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {filteredStudents.map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <TableCell className="font-medium">{student.rollNo}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        {editingStudent?.id === student.id ? (
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={student.marks.theory}
                            onChange={(e) => handleMarksChange(student.id, 'theory', e.target.value)}
                            className="w-20"
                          />
                        ) : (
                          <span className="font-medium">{student.marks.theory}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {editingStudent?.id === student.id ? (
                          <Input
                            type="number"
                            min="0"
                            max="20"
                            value={student.marks.practical}
                            onChange={(e) => handleMarksChange(student.id, 'practical', e.target.value)}
                            className="w-20"
                          />
                        ) : (
                          <span className="font-medium">{student.marks.practical}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {student.marks.total}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{student.marks.percentage}%</span>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold text-lg ${getGradeColor(student.marks.grade)}`}>
                          {student.marks.grade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {editingStudent?.id === student.id ? (
                            <Button
                              size="sm"
                              onClick={() => setEditingStudent(null)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(student)}
                            >
                              <Edit3 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Submit All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex justify-end"
      >
        <Button
          onClick={handleSave}
          disabled={isSubmitting || !selectedClass || !selectedSubject || !selectedExam}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {isSubmitting ? 'Saving...' : 'Save All Marks'}
        </Button>
      </motion.div>
    </div>
  );
};

export default TeacherMarksAllotmentPage;
