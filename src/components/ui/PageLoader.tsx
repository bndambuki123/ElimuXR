import React from 'react';
import { motion } from 'framer-motion';

const PageLoader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg 
          width="64" 
          height="64" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 animate-pulse-slow"
        >
          <path d="M25.3333 4H6.66667C5.19391 4 4 5.19391 4 6.66667V25.3333C4 26.8061 5.19391 28 6.66667 28H25.3333C26.8061 28 28 26.8061 28 25.3333V6.66667C28 5.19391 26.8061 4 25.3333 4Z" fill="#6D28D9"/>
          <path d="M16 8L20 12M20 12L16 16M20 12H12M12 16L16 20M16 20L20 24M16 20H24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        
        <div className="flex space-x-2 mb-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary-600 rounded-full"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        
        <motion.p 
          className="text-gray-600 font-medium text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading ElimuXR...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PageLoader;