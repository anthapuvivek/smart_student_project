import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Calendar, User } from 'lucide-react';

const TodayAttendancePage = () => {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get today's attendance
    const fetchAttendance = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - replace with actual API call
        const mockAttendance = {
          date: new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          time: new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          status: 'present', // or 'absent'
          class: 'Computer Science',
          teacher: 'Dr. Smith',
          room: 'Room 101'
        };
        
        setAttendance(mockAttendance);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

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

  const getStatusColor = (status) => {
    return status === 'present' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
      : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
  };

  const getStatusIcon = (status) => {
    return status === 'present' ? (
      <CheckCircle className="w-6 h-6 text-green-600" />
    ) : (
      <XCircle className="w-6 h-6 text-red-600" />
    );
  };

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
            Today's Attendance
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Check your attendance status for today
          </p>
        </div>
      </motion.div>

      {/* Main Attendance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Attendance Status
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              {attendance?.date}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Status Display */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mb-4"
              >
                {getStatusIcon(attendance?.status)}
              </motion.div>
              
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(attendance?.status)}`}>
                {attendance?.status?.charAt(0).toUpperCase() + attendance?.status?.slice(1)}
              </div>
            </div>

            {/* Class Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-50 dark:bg-gray-700/50 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Class</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{attendance?.class}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-700/50 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Teacher</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{attendance?.teacher}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-700/50 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Date</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{attendance?.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 dark:bg-gray-700/50 border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Time</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{attendance?.time}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Room: <span className="font-medium text-gray-900 dark:text-white">{attendance?.room}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">View History</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Check past attendance</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Attendance Report</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Download your report</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-0 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <User className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900 dark:text-white">Profile</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your details</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TodayAttendancePage;
