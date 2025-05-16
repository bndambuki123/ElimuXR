import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Play, Cuboid as Cube, FileQuestion } from 'lucide-react';

// This will be replaced with actual topic data from your backend
const mockTopics = {
  'integrated-science': {
    7: [
      { id: 'cells', name: 'Cells and Living Things', progress: 75 },
      { id: 'matter', name: 'States of Matter', progress: 30 },
      { id: 'energy', name: 'Energy and Forces', progress: 0 },
    ],
    8: [
      { id: 'genetics', name: 'Genetics and Inheritance', progress: 0 },
      { id: 'reactions', name: 'Chemical Reactions', progress: 0 },
      { id: 'electricity', name: 'Electricity and Magnetism', progress: 0 },
    ],
    9: [
      { id: 'ecosystems', name: 'Ecosystems and Environment', progress: 0 },
      { id: 'atomic', name: 'Atomic Structure', progress: 0 },
      { id: 'waves', name: 'Waves and Sound', progress: 0 },
    ],
  },
  'mathematics': {
    7: [
      { id: 'algebra', name: 'Introduction to Algebra', progress: 50 },
      { id: 'geometry', name: 'Basic Geometry', progress: 25 },
      { id: 'numbers', name: 'Number Systems', progress: 0 },
    ],
    8: [
      { id: 'equations', name: 'Linear Equations', progress: 0 },
      { id: 'triangles', name: 'Triangles and Pythagoras', progress: 0 },
      { id: 'statistics', name: 'Statistics and Probability', progress: 0 },
    ],
    9: [
      { id: 'quadratic', name: 'Quadratic Equations', progress: 0 },
      { id: 'trigonometry', name: 'Introduction to Trigonometry', progress: 0 },
      { id: 'graphs', name: 'Graphs and Functions', progress: 0 },
    ],
  },
  'pre-technical': {
    7: [
      { id: 'tools', name: 'Basic Tools and Safety', progress: 40 },
      { id: 'materials', name: 'Materials and Properties', progress: 0 },
      { id: 'drawing', name: 'Technical Drawing', progress: 0 },
    ],
    8: [
      { id: 'electronics', name: 'Basic Electronics', progress: 0 },
      { id: 'mechanics', name: 'Simple Machines', progress: 0 },
      { id: 'construction', name: 'Construction Techniques', progress: 0 },
    ],
    9: [
      { id: 'circuits', name: 'Electronic Circuits', progress: 0 },
      { id: 'engineering', name: 'Engineering Principles', progress: 0 },
      { id: 'design', name: 'Design and Innovation', progress: 0 },
    ],
  },
};

const SubjectTopics = () => {
  const { grade, subject } = useParams();
  const topics = mockTopics[subject as keyof typeof mockTopics]?.[Number(grade) as keyof typeof mockTopics['integrated-science']] || [];

  const subjectNames = {
    'integrated-science': 'Integrated Science',
    'mathematics': 'Mathematics',
    'pre-technical': 'Pre-technical Studies'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {subjectNames[subject as keyof typeof subjectNames]} - Grade {grade}
          </h1>
          <p className="text-xl text-gray-600">Select a topic to begin learning</p>
        </div>

        <div className="space-y-6">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              to={`/study/${grade}/${subject}/${topic.id}`}
              className="block"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">{topic.name}</h2>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-6">
                      <div className="flex items-center text-gray-600">
                        <Play className="w-5 h-5 mr-2" />
                        <span>3D Lesson</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Cube className="w-5 h-5 mr-2" />
                        <span>AR Model</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FileQuestion className="w-5 h-5 mr-2" />
                        <span>Quiz</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex-grow">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-primary-600 rounded-full transition-all"
                          style={{ width: `${topic.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-4 text-sm font-medium text-gray-600">
                      {topic.progress}% Complete
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SubjectTopics;