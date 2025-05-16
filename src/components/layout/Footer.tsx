import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://i.postimg.cc/T3fpM65H/Learn-the-smart-way-2-removebg-preview.png" 
                alt="Logo" 
                className="h-12 w-auto" 
              />
              
            </Link>
            <p className="text-gray-300 text-sm">
              Transforming education for Junior Secondary School students in Kenya through immersive 3D/AR learning experiences aligned with the CBC curriculum.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link>
              </li>
              <li>
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subjects</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Integrated Science</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Mathematics</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Agriculture & Nutrition</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Pre-Tech Studies</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">+254 114 577400</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary-400 flex-shrink-0" />
                <span className="text-gray-300">elimuxr101@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {currentYear} ElimuXR Learning Platform. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;