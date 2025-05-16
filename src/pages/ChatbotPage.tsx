import React from 'react';
import { motion } from 'framer-motion';

const ChatbotPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Learning Assistant</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="h-[600px] overflow-y-auto mb-4 p-4 border rounded-lg">
          {/* Chat messages will be rendered here */}
          <div className="flex justify-center items-center h-full text-gray-500">
            Start a conversation with your AI learning assistant
          </div>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask your question..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatbotPage;