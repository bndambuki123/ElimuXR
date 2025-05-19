import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Construction } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Construction className="w-24 h-24 text-primary-600 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Coming Soon</h1>
          <p className="text-gray-600 mb-8">
            We're working hard to bring you an amazing experience. This feature will be available soon!
          </p>
          <Link to="/">
            <Button 
              variant="primary" 
              size="lg"
              icon={<Home className="w-5 h-5" />}
            >
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;