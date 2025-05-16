import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Microscope, Calculator, Wrench } from 'lucide-react';

const subjects = {
  'integrated-science': {
    name: 'Integrated Science',
    icon: <Microscope className="w-8 h-8" />,
    description: 'Learn biology, chemistry, and physics through interactive 3D models'
  },
  'mathematics': {
    name: 'Mathematics',
    icon: <Calculator className="w-8 h-8" />,
    description: 'Master mathematical concepts with visual learning aids'
  },
  'pre-technical': {
    name: 'Pre-technical Studies',
    icon: <Wrench className="w-8 h-8" />,
    description: 'Explore technical concepts through practical applications'
  }
};

const StudyGrade = () => {
  const { grade } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Grade {grade} Subjects</h1>
          <p className="text-xl text-gray-600">Select a subject to start learning</p>
        </div>

        <div className="grid gap-6">
          {Object.entries(subjects).map(([key, subject]) => (
            <Link
              key={key}
              to={`/study/${grade}/${key}`}
              className="block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-primary-600 flex-shrink-0">
                  {subject.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">{subject.name}</h2>
                  <p className="text-gray-600">{subject.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StudyGrade;