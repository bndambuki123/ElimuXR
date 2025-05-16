import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// Placeholder subjects data - in production this would come from your backend
const subjects: Record<string, Subject[]> = {
  '1': [
    {
      id: 'math-1',
      name: 'Mathematics',
      description: 'Basic arithmetic and number concepts',
      imageUrl: 'https://images.pexels.com/photos/3729557/pexels-photo-3729557.jpeg'
    },
    {
      id: 'science-1',
      name: 'Science',
      description: 'Introduction to natural phenomena',
      imageUrl: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg'
    }
  ],
  // Add more grade levels as needed
};

const SubjectSelector = () => {
  const { grade } = useParams();
  const gradeSubjects = subjects[grade || '1'] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Grade {grade} Subjects
          </h1>
          <p className="text-lg text-gray-600">
            Select a subject to start learning
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gradeSubjects.map((subject) => (
            <motion.div
              key={subject.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={subject.imageUrl}
                  alt={subject.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <BookOpen className="h-6 w-6 text-indigo-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {subject.name}
                  </h3>
                </div>
                <p className="text-gray-600">{subject.description}</p>
                <button
                  onClick={() => {/* Add navigation logic */}}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                >
                  Start Learning
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SubjectSelector;