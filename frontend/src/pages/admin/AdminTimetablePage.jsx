import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  Building,
  GraduationCap,
  User
} from 'lucide-react';

const AdminTimetablePage = () => {
  const [timetableData, setTimetableData] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [isAddingSlot, setIsAddingSlot] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  const timeSlots = [
    '8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00',
    '12:00 - 1:00', '2:00 - 3:00', '3:00 - 4:00', '4:00 - 5:00'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  useEffect(() => {
    // Simulate API call to get timetable data
    const fetchTimetableData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock timetable data
        const mockData = {
          teachers: [
            { id: 1, name: 'Dr. Johnson', subject: 'Mathematics' },
            { id: 2, name: 'Prof. Williams', subject: 'Physics' },
            { id: 3, name: 'Ms. Davis', subject: 'English' },
            { id: 4, name: 'Mr. Brown', subject: 'Computer Science' },
            { id: 5, name: 'Dr. Wilson', subject: 'Chemistry' }
          ],
          classes: [
            'Class 10A', 'Class 10B', 'Class 11A', 'Class 11B', 'Class 12A', 'Class 12B'
          ],
          subjects: [
            'Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science', 'Biology'
          ],
          rooms: [
            'Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105', 'Lab 1', 'Lab 2'
          ],
          timetable: {
            'Monday': {
              '8:00 - 9:00': { teacher: 'Dr. Johnson', class: 'Class 10A', subject: 'Mathematics', room: 'Room 101' },
              '9:00 - 10:00': { teacher: 'Prof. Williams', class: 'Class 11B', subject: 'Physics', room: 'Room 102' },
              '10:00 - 11:00': { teacher: 'Ms. Davis', class: 'Class 12A', subject: 'English', room: 'Room 103' },
              '11:00 - 12:00': { teacher: 'Mr. Brown', class: 'Class 10B', subject: 'Computer Science', room: 'Lab 1' },
              '2:00 - 3:00': { teacher: 'Dr. Wilson', class: 'Class 11A', subject: 'Chemistry', room: 'Room 104' },
              '3:00 - 4:00': { teacher: 'Dr. Johnson', class: 'Class 12B', subject: 'Mathematics', room: 'Room 105' }
            },
            'Tuesday': {
              '8:00 - 9:00': { teacher: 'Prof. Williams', class: 'Class 10A', subject: 'Physics', room: 'Room 102' },
              '9:00 - 10:00': { teacher: 'Ms. Davis', class: 'Class 11B', subject: 'English', room: 'Room 103' },
              '10:00 - 11:00': { teacher: 'Mr. Brown', class: 'Class 12A', subject: 'Computer Science', room: 'Lab 1' },
              '11:00 - 12:00': { teacher: 'Dr. Wilson', class: 'Class 10B', subject: 'Chemistry', room: 'Room 104' },
              '2:00 - 3:00': { teacher: 'Dr. Johnson', class: 'Class 11A', subject: 'Mathematics', room: 'Room 101' },
              '3:00 - 4:00': { teacher: 'Prof. Williams', class: 'Class 12B', subject: 'Physics', room: 'Room 102' }
            },
            'Wednesday': {
              '8:00 - 9:00': { teacher: 'Ms. Davis', class: 'Class 10A', subject: 'English', room: 'Room 103' },
              '9:00 - 10:00': { teacher: 'Mr. Brown', class: 'Class 11B', subject: 'Computer Science', room: 'Lab 1' },
              '10:00 - 11:00': { teacher: 'Dr. Wilson', class: 'Class 12A', subject: 'Chemistry', room: 'Room 104' },
              '11:00 - 12:00': { teacher: 'Dr. Johnson', class: 'Class 10B', subject: 'Mathematics', room: 'Room 101' },
              '2:00 - 3:00': { teacher: 'Prof. Williams', class: 'Class 11A', subject: 'Physics', room: 'Room 102' },
              '3:00 - 4:00': { teacher: 'Ms. Davis', class: 'Class 12B', subject: 'English', room: 'Room 103' }
            },
            'Thursday': {
              '8:00 - 9:00': { teacher: 'Mr. Brown', class: 'Class 10A', subject: 'Computer Science', room: 'Lab 1' },
              '9:00 - 10:00': { teacher: 'Dr. Wilson', class: 'Class 11B', subject: 'Chemistry', room: 'Room 104' },
              '10:00 - 11:00': { teacher: 'Dr. Johnson', class: 'Class 12A', subject: 'Mathematics', room: 'Room 101' },
              '11:00 - 12:00': { teacher: 'Prof. Williams', class: 'Class 10B', subject: 'Physics', room: 'Room 102' },
              '2:00 - 3:00': { teacher: 'Ms. Davis', class: 'Class 11A', subject: 'English', room: 'Room 103' },
              '3:00 - 4:00': { teacher: 'Mr. Brown', class: 'Class 12B', subject: 'Computer Science', room: 'Lab 2' }
            },
            'Friday': {
              '8:00 - 9:00': { teacher: 'Dr. Wilson', class: 'Class 10A', subject: 'Chemistry', room: 'Room 104' },
              '9:00 - 10:00': { teacher: 'Dr. Johnson', class: 'Class 11B', subject: 'Mathematics', room: 'Room 101' },
              '10:00 - 11:00': { teacher: 'Prof. Williams', class: 'Class 12A', subject: 'Physics', room: 'Room 102' },
              '11:00 - 12:00': { teacher: 'Ms. Davis', class: 'Class 10B', subject: 'English', room: 'Room 103' },
              '2:00 - 3:00': { teacher: 'Mr. Brown', class: 'Class 11A', subject: 'Computer Science', room: 'Lab 1' },
              '3:00 - 4:00': { teacher: 'Dr. Wilson', class: 'Class 12B', subject: 'Chemistry', room: 'Room 104' }
            }
          }
        };
        
        setTimetableData(mockData);
      } catch (error) {
        console.error('Error fetching timetable data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetableData();
  }, []);

  const handleAddSlot = () => {
    if (!selectedTeacher || !selectedClass || !selectedSubject || !selectedTime || !selectedRoom) {
      alert('Please fill in all fields');
      return;
    }

    // Here you would make an API call to add the slot
    console.log('Adding slot:', {
      teacher: selectedTeacher,
      class: selectedClass,
      subject: selectedSubject,
      time: selectedTime,
      room: selectedRoom
    });

    // Reset form
    setSelectedTeacher('');
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedTime('');
    setSelectedRoom('');
    setIsAddingSlot(false);
    alert('Time slot added successfully!');
  };

  const handleEditSlot = (day, time) => {
    const slot = timetableData.timetable[day][time];
    setEditingSlot({ day, time, ...slot });
    setSelectedTeacher(slot.teacher);
    setSelectedClass(slot.class);
    setSelectedSubject(slot.subject);
    setSelectedRoom(slot.room);
    setSelectedTime(time);
  };

  const handleSaveEdit = () => {
    if (!selectedTeacher || !selectedClass || !selectedSubject || !selectedRoom) {
      alert('Please fill in all fields');
      return;
    }

    // Here you would make an API call to update the slot
    console.log('Updating slot:', {
      day: editingSlot.day,
      time: editingSlot.time,
      teacher: selectedTeacher,
      class: selectedClass,
      subject: selectedSubject,
      room: selectedRoom
    });

    // Reset form
    setEditingSlot(null);
    setSelectedTeacher('');
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedTime('');
    setSelectedRoom('');
    alert('Time slot updated successfully!');
  };

  const handleDeleteSlot = (day, time) => {
    if (window.confirm('Are you sure you want to delete this time slot?')) {
      // Here you would make an API call to delete the slot
      console.log('Deleting slot:', { day, time });
      alert('Time slot deleted successfully!');
    }
  };

  const getTeacherColor = (teacherName) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
      'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
      'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400'
    ];
    
    const teacherIndex = timetableData?.teachers.findIndex(t => t.name === teacherName) || 0;
    return colors[teacherIndex % colors.length];
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
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Timetable Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create and manage teacher timetables
          </p>
        </div>
        <Button
          onClick={() => setIsAddingSlot(true)}
          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Time Slot
        </Button>
      </motion.div>

      {/* Add/Edit Time Slot Modal */}
      {(isAddingSlot || editingSlot) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <Card className="w-full max-w-md bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingSlot ? 'Edit Time Slot' : 'Add Time Slot'}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsAddingSlot(false);
                    setEditingSlot(null);
                    setSelectedTeacher('');
                    setSelectedClass('');
                    setSelectedSubject('');
                    setSelectedTime('');
                    setSelectedRoom('');
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teacher">Teacher</Label>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {timetableData?.teachers.map(teacher => (
                      <SelectItem key={teacher.id} value={teacher.name}>
                        {teacher.name} ({teacher.subject})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {timetableData?.classes.map(className => (
                      <SelectItem key={className} value={className}>
                        {className}
                      </SelectItem>
                    ))}
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
                    {timetableData?.subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {!editingSlot && (
                <div className="space-y-2">
                  <Label htmlFor="time">Time Slot</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="room">Room</Label>
                <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select room" />
                  </SelectTrigger>
                  <SelectContent>
                    {timetableData?.rooms.map(room => (
                      <SelectItem key={room} value={room}>
                        {room}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button
                  onClick={editingSlot ? handleSaveEdit : handleAddSlot}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingSlot ? 'Save Changes' : 'Add Slot'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingSlot(false);
                    setEditingSlot(null);
                    setSelectedTeacher('');
                    setSelectedClass('');
                    setSelectedSubject('');
                    setSelectedTime('');
                    setSelectedRoom('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Timetable Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
            <CardTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span>Weekly Timetable</span>
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Complete weekly schedule for all classes
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Header Row */}
              <div className="grid grid-cols-6 gap-2 mb-4">
                <div className="p-3 font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg">
                  Time/Day
                </div>
                {days.map(day => (
                  <div key={day} className="p-3 font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map(timeSlot => (
                <div key={timeSlot} className="grid grid-cols-6 gap-2 mb-2">
                  <div className="p-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {timeSlot}
                  </div>
                  {days.map(day => {
                    const slot = timetableData?.timetable[day]?.[timeSlot];
                    return (
                      <div key={`${day}-${timeSlot}`} className="p-3 min-h-[80px]">
                        {slot ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:shadow-md transition-all duration-200"
                          >
                            <div className="space-y-2">
                              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTeacherColor(slot.teacher)}`}>
                                <User className="w-3 h-3 mr-1" />
                                {slot.teacher}
                              </div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {slot.class}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {slot.subject}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                {slot.room}
                              </div>
                              <div className="flex space-x-1 pt-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditSlot(day, timeSlot)}
                                  className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteSlot(day, timeSlot)}
                                  className="h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <div className="p-3 text-center text-gray-400 dark:text-gray-600 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-lg min-h-[80px] flex items-center justify-center">
                            <Plus className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Teachers</p>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
              {timetableData?.teachers.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-teal-600 dark:text-teal-400" />
            </div>
            <p className="text-sm font-medium text-teal-700 dark:text-teal-300">Total Classes</p>
            <p className="text-2xl font-bold text-teal-800 dark:text-teal-200">
              {timetableData?.classes.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Subjects</p>
            <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">
              {timetableData?.subjects.length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Time Slots</p>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
              {timeSlots.length}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminTimetablePage;
