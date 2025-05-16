import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Home, User, LogOut, Award, BookMarked, Brain, DownloadCloud, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  // Detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Navigation links based on auth state
  const navLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard', icon: <Home className="w-5 h-5" /> },
        { name: 'Subjects', path: `/subjects/${user?.grade || 7}`, icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Chatbot', path: '/chatbot', icon: <Brain className="w-5 h-5" /> },
        { name: 'Rewards', path: '/rewards', icon: <Award className="w-5 h-5" /> },
        { name: 'Library', path: '/offline-library', icon: <DownloadCloud className="w-5 h-5" /> },
        ...(user?.role === 'teacher' || user?.role === 'admin' 
          ? [{ name: 'Admin', path: '/admin', icon: <Settings className="w-5 h-5" /> }] 
          : []),
      ]
    : [
        { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
        { name: 'Login', path: '/login', icon: <User className="w-5 h-5" /> },
      ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-brand-dark py-4',
        scrolled && 'border-b border-brand-yellow'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img 
              src="https://i.postimg.cc/T3fpM65H/Learn-the-smart-way-2-removebg-preview.png" 
              alt="Logo" 
              className="h-12 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center space-x-1 font-medium transition-colors py-2',
                  location.pathname === link.path 
                    ? 'text-brand-yellow border-b-2 border-brand-yellow' 
                    : 'text-white hover:text-brand-yellow'
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isAuthenticated && (
              <button 
                onClick={logout}
                className="flex items-center space-x-1 font-medium transition-colors text-white hover:text-brand-yellow"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg rounded-b-lg absolute top-full left-0 right-0"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors',
                  location.pathname === link.path 
                    ? 'bg-brand-yellow/10 text-brand-yellow' 
                    : 'text-brand-dark hover:bg-gray-50'
                )}
                onClick={closeMenu}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isAuthenticated && (
              <button 
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center space-x-3 p-3 rounded-lg font-medium text-brand-dark hover:bg-gray-50 transition-colors w-full text-left"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;