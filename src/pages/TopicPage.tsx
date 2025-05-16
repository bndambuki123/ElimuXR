import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const TopicPage = () => {
  const { subjectId, topicId } = useParams();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Topic Content</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            Content for subject {subjectId}, topic {topicId}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicPage;