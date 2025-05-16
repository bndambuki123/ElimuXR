import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
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
          <h1 className="text-9xl font-display font-bold text-primary-600">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mt-4 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Oops! It seems like the page you're looking for doesn't exist or has been moved.
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