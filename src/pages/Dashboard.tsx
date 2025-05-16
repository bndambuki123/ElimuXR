import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, MessageSquare, Video, Users, Brain, GraduationCap, BookOpenCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Study',
      description: 'Access 3D lessons, AR models & quizzes',
      link: `/study/${user?.grade || 7}`,
      primary: true
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Online Classes',
      description: 'Join live interactive classes',
      link: '/classes',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Expert Tutors',
      description: 'Get help from qualified teachers',
      link: '/tutors',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Tutor',
      description: 'Get instant answers to questions',
      link: '/chatbot',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Courses',
      description: 'Browse specialized courses',
      link: '/courses',
    },
    {
      icon: <BookOpenCheck className="w-8 h-8" />,
      title: 'Exams',
      description: 'Practice with past papers',
      link: '/exams',
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Dashboard</h1>
          <p className="text-xl text-gray-600">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-200 group-hover:shadow-xl ${
                  feature.primary ? 'border-2 border-primary-500' : ''
                }`}
              >
                <div className={`${feature.primary ? 'text-primary-600' : 'text-gray-600'} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Mathematics</h3>
                <p className="text-sm text-gray-600">Last accessed: 2 hours ago</p>
              </div>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-4">
                  <div className="w-3/4 h-full bg-primary-600 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">Integrated Science</h3>
                <p className="text-sm text-gray-600">Last accessed: 1 day ago</p>
              </div>
              <div className="flex items-center">
                <div className="w-48 h-2 bg-gray-200 rounded-full mr-4">
                  <div className="w-1/2 h-full bg-primary-600 rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-gray-900">50%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;