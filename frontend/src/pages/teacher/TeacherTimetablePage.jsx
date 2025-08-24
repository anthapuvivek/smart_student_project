import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  BookOpen, 
  Users, 
  MapPin, 
  Edit3,
  Plus,
  Filter
} from 'lucide-react';

const TeacherTimetablePage = () => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    // Simulate API call to get timetable data
    const fetchTimetable = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockTimetable = [
          {
            id: 1,
            day: 'Monday',
            time: '8:00 AM',
            subject: 'Mathematics',
            class: 'Class 10A',
            room: 'Room 101',
            duration: '1 hour',
            students: 25
          },
          {
            id: 2,
            day: 'Monday',
            time: '9:00 AM',
            subject: 'Mathematics',
            class: 'Class 11B',
            room: 'Room 102',
            duration: '1 hour',
            students: 28
          },
          {
            id: 3,
            day: 'Monday',
            time: '10:00 AM',
            subject: 'Physics',
            class: 'Class 12A',
            room: 'Lab 1',
            duration: '1 hour',
            students: 22
          },
          {
            id: 4,
            day: 'Tuesday',
            time: '8:00 AM',
            subject: 'Mathematics',
            class: 'Class 10B',
            room: 'Room 103',
            duration: '1 hour',
            students: 26
          },
          {
            id: 5,
            day: 'Tuesday',
            time: '9:00 AM',
            subject: 'Physics',
            class: 'Class 11A',
            room: 'Lab 2',
            duration: '1 hour',
            students: 24
          },
          {
            id: 6,
            day: 'Wednesday',
            time: '8:00 AM',
            subject: 'Mathematics',
            class: 'Class 12B',
            room: 'Room 104',
            duration: '1 hour',
            students: 23
          },
          {
            id: 7,
            day: 'Wednesday',
            time: '10:00 AM',
            subject: 'Physics',
            class: 'Class 10A',
            room: 'Lab 1',
            duration: '1 hour',
            students: 25
          },
          {
            id: 8,
            day: 'Thursday',
            time: '9:00 AM',
            subject: 'Mathematics',
            class: 'Class 11A',
            room: 'Room 101',
            duration: '1 hour',
            students: 24
          },
          {
            id: 9,
            day: 'Friday',
            time: '8:00 AM',
            subject: 'Physics',
            class: 'Class 12A',
            room: 'Lab 2',
            duration: '1 hour',
            students: 22
          },
          {
            id: 10,
            day: 'Friday',
            time: '2:00 PM',
            subject: 'Mathematics',
            class: 'Class 10A',
            room: 'Room 101',
            duration: '1 hour',
            students: 25
          }
        ];
        
        setTimetable(mockTimetable);
      } catch (error) {
        console.error('Error fetching timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const getClassForTimeSlot = (day, time) => {
    return timetable.find(
      item => item.day === day && item.time === time
    );
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'Physics': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      'Chemistry': 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'English': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Computer Science': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
  };

  const getFilteredTimetable = () => {
    let filtered = timetable;
    
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(item => item.subject === selectedSubject);
    }
    
    return filtered;
  };

  const filteredTimetable = getFilteredTimetable();

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
            Weekly Timetable
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            View and manage your class schedule
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Week</label>
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Week</SelectItem>
              <SelectItem value="next">Next Week</SelectItem>
              <SelectItem value="previous">Previous Week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Quick Stats */}
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
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Total Classes</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{filteredTimetable.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Total Students</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {filteredTimetable.reduce((sum, item) => sum + item.students, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Teaching Hours</p>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {filteredTimetable.length} hrs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-0">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Rooms Used</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {new Set(filteredTimetable.map(item => item.room)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Timetable Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Weekly Schedule
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your classes for the week
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="p-4 text-left font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50">
                      Time
                    </th>
                    {weekDays.map(day => (
                      <th key={day} className="p-4 text-left font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(time => (
                    <tr key={time} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-4 font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50">
                        {time}
                      </td>
                      {weekDays.map(day => {
                        const classInfo = getClassForTimeSlot(day, time);
                        return (
                          <td key={`${day}-${time}`} className="p-2">
                            {classInfo ? (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                              >
                                <div className="space-y-2">
                                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(classInfo.subject)}`}>
                                    {classInfo.subject}
                                  </div>
                                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {classInfo.class}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                                    <MapPin className="w-3 h-3" />
                                    <span>{classInfo.room}</span>
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                                    <Users className="w-3 h-3" />
                                    <span>{classInfo.students} students</span>
                                  </div>
                                  <div className="flex justify-end">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <div className="p-3 text-center text-gray-400 dark:text-gray-500">
                                -
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upcoming Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
              Upcoming Classes Today
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Your next few classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTimetable
                .filter(item => item.day === 'Monday') // For demo, showing Monday classes
                .slice(0, 3)
                .map((classInfo, index) => (
                  <motion.div
                    key={classInfo.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getSubjectColor(classInfo.subject).split(' ')[0]}`} />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {classInfo.subject} - {classInfo.class}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {classInfo.time} • {classInfo.room}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {classInfo.time}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {classInfo.duration}
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

export default TeacherTimetablePage;
