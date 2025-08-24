import { motion } from 'framer-motion';
import {
    Award,
    BarChart3,
    Building,
    CheckSquare,
    ChevronLeft,
    ChevronRight,
    Clock,
    GraduationCap,
    Home,
    PieChart,
    UserCheck,
    Users
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/Authcontext';
import { Button } from '../ui/button';

const Sidebar = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const getNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'student':
        return [
          {
            title: 'Dashboard',
            path: '/student/dashboard',
            icon: Home,
            description: 'Main dashboard overview'
          },
          {
            title: 'Today Attendance',
            path: '/student/today-attendance',
            icon: CheckSquare,
            description: 'Check your attendance status'
          },
          {
            title: 'Overall Attendance',
            path: '/student/overall-attendance',
            icon: BarChart3,
            description: 'View attendance statistics'
          },
          {
            title: 'Marks',
            path: '/student/marks',
            icon: Award,
            description: 'Check your academic performance'
          }
        ];
      case 'teacher':
        return [
          {
            title: 'Dashboard',
            path: '/teacher/dashboard',
            icon: Home,
            description: 'Main dashboard overview'
          },
          {
            title: 'Take Attendance',
            path: '/teacher/take-attendance',
            icon: UserCheck,
            description: 'Mark student attendance'
          },
          {
            title: 'Timetable',
            path: '/teacher/timetable',
            icon: Clock,
            description: 'View class schedule'
          },
          {
            title: 'Marks Allotment',
            path: '/teacher/marks-allotment',
            icon: GraduationCap,
            description: 'Assign student marks'
          }
        ];
      case 'admin':
        return [
          {
            title: 'Dashboard',
            path: '/admin/dashboard',
            icon: Home,
            description: 'Main dashboard overview'
          },
          {
            title: 'Student Overview',
            path: '/admin/student-overview',
            icon: Users,
            description: 'Monitor student statistics'
          },
          {
            title: 'Teacher Overview',
            path: '/admin/teacher-overview',
            icon: Building,
            description: 'Monitor teacher statistics'
          },
          {
            title: 'Timetable Management',
            path: '/admin/timetable',
            icon: Calendar,
            description: 'Create and modify schedules'
          },
          {
            title: 'Analytics',
            path: '/admin/analytics',
            icon: PieChart,
            description: 'View detailed reports'
          }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  if (!user) return null;

  return (
    <motion.div
      initial={{ width: isCollapsed ? 80 : 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm flex flex-col"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-white">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className={`h-5 w-5 flex-shrink-0 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
              }`} />
              
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 min-w-0"
                >
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {item.description}
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Smart Student App
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Sidebar;
