import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Monitor, Cuboid as Cube, Award, Zap, BrainCircuit, Video, Users, Smartphone, Cpu, Star, Check } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-brand-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold leading-tight mb-4">
                Experience Learning in a Whole New Dimension
              </h1>
              <p className="text-lg sm:text-xl opacity-90 mb-8 max-w-xl">
                ElimuXR brings CBC-aligned STEM curriculum to life with immersive AR learning experiences designed for Junior Secondary School students in Kenya.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    icon={<Zap className="w-5 h-5" />}
                    className="bg-brand-yellow hover:bg-brand-yellow/90 focus:ring-brand-yellow"
                  >
                    Join Waitlist
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://i.postimg.cc/FRtKK7BQ/20250516-1928-Kenyan-Siblings-Studying-simple-compose-01jvcyr2esf31sje51gk6xeq5k.png" 
                alt="Student using VR headset for learning" 
                className="rounded-lg shadow-2xl max-w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Revolutionary Learning Experience
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Discover how ElimuXR transforms traditional education into an interactive journey
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Monitor className="w-10 h-10" />,
                title: "CBC Curriculum Alignment",
                description: "Perfectly aligned with Kenya's Competency-Based Curriculum for Junior Secondary School students."
              },
              {
                icon: <BookOpen className="w-10 h-10" />,
                title: "3D Animated Lessons",
                description: "Engaging animated lessons that bring complex concepts to life in three dimensions."
              },
              {
                icon: <Cube className="w-10 h-10" />,
                title: "Immersive 3D AR Models",
                description: "Interactive augmented reality models for hands-on learning experiences."
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "Quizzes and Exams",
                description: "Comprehensive assessments to test understanding and track progress."
              },
              {
                icon: <Video className="w-10 h-10" />,
                title: "Online Classes",
                description: "Live interactive virtual classes with experienced teachers."
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "Expert Tutors",
                description: "One-on-one support from qualified subject matter experts."
              },
              {
                icon: <BrainCircuit className="w-10 h-10" />,
                title: "AI-Powered Chatbot",
                description: "24/7 intelligent assistance for instant answers to your questions."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-brand-yellow mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How ElimuXR Works
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Follow these simple steps to begin your immersive learning journey
            </motion.p>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                {
                  step: "Step 1",
                  title: "Create Your Account",
                  description: "Sign up and select your grade level to personalize your learning experience."
                },
                {
                  step: "Step 2",
                  title: "Choose Your Subjects",
                  description: "Browse through our CBC-aligned curriculum and select the topics you want to explore."
                },
                {
                  step: "Step 3",
                  title: "Learn & Interact",
                  description: "Engage with 3D/AR content, take quizzes, and chat with the AI tutor to enhance your understanding."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="bg-brand-yellow rounded-xl shadow-md p-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {step.step}
                  </div>
                  <div className="pt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">{step.title}</h3>
                    <p className="text-gray-700 text-center">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Subjects Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore STEM Subjects
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Dive into interactive lessons across a variety of Junior Secondary School subjects
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Integrated Science",
                description: "Explore biology, chemistry, and physics through interactive 3D models and simulations.",
                image: "https://i.postimg.cc/PqVgYsS4/20250516-1942-Africanized-Educational-Images-simple-compose-01jvczhk99eghtdfjc9rvw8xb4.png",
                color: "from-blue-500 to-blue-700"
              },
              {
                title: "Mathematics",
                description: "Visualize complex mathematical concepts with AR models that make abstract ideas concrete.",
                image: "https://i.postimg.cc/FHrFxvx5/20250516-1952-AR-Math-Concepts-simple-compose-01jvd03bkdeftsmy9rdy3819ge.png",
                color: "from-green-500 to-green-700"
              },
              {
                title: "Agriculture & Nutrition",
                description: "Learn about sustainable farming practices and nutrition through virtual farm visits and food science experiments.",
                image: "https://i.postimg.cc/s2SVj2jW/20250516-2020-Kenyan-Students-Farming-simple-compose-01jvd1ne3ke529peykzmdsddr0.png",
                color: "from-yellow-500 to-yellow-700"
              },
              {
                title: "Pre-Tech Studies",
                description: "Discover the world of technology through interactive coding exercises and digital literacy lessons.",
                image: "https://i.postimg.cc/Qd1gcpSn/20250516-2014-Kenyan-Students-Embrace-Technology-simple-compose-01jvd1bbycepaaxe8hpewvebya.png",
                color: "from-purple-500 to-purple-700"
              }
            ].map((subject, index) => (
              <motion.div 
                key={index}
                className="relative overflow-hidden rounded-xl shadow-lg group h-64"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={subject.image} 
                  alt={subject.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-[#1b212c] ${subject.color} opacity-80`}></div>
                <div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
                  <h3 className="text-2xl font-bold mb-2">{subject.title}</h3>
                  <p className="text-white/90">{subject.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/register">
              <Button 
                variant="primary" 
                size="lg"
                icon={<BookOpen className="w-5 h-5" />}
                className="bg-brand-yellow hover:bg-brand-yellow/90 focus:ring-brand-yellow"
              >
                Start Learning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Top Tutors Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Meet Our Top Tutors
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Learn from experienced educators dedicated to your success
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Amina Kimani",
                subject: "Integrated Science",
                image: "https://i.postimg.cc/66gsbXL4/20250516-2025-Tech-Savvy-Science-Educator-simple-compose-01jvd1zpfwebxs8nj8zk79tb65.png",
                description: "With 15 years of experience teaching science, Dr. Kimani specializes in making complex concepts easy to understand."
              },
              {
                name: "Mr. David Ochieng",
                subject: "Mathematics",
                image: "https://i.postimg.cc/Nf5hn2T4/20250516-2155-Tech-Savvy-Kenyan-Educator-simple-compose-01jvd752vxfj7tbyxzjk47zhe9.png",
                description: "A passionate mathematics educator with a track record of improving student performance through innovative teaching methods."
              },
              {
                name: "Ms. Faith Wanjiru",
                subject: "Agriculture & Nutrition",
                image: "https://i.postimg.cc/C121yTvr/20250516-2159-Tech-Savvy-Kenyan-Teacher-simple-compose-01jvd7azeefdmvsvd8srx33e1p.png",
                description: "Expert in sustainable agriculture and nutrition, bringing practical experience to the virtual classroom."
              },
              {
                name: "Mr. John Mwangi",
                subject: "Pre-Tech Studies",
                image: "https://i.postimg.cc/tRdHKnrQ/20250516-2203-Kenyan-Teacher-with-Technology-simple-compose-01jvd7kcd9ea5tg5rx8jc83y4q.png",
                description: "Technology enthusiast with extensive experience in teaching digital literacy and coding fundamentals."
              }
            ].map((tutor, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{tutor.name}</h3>
                  <p className="text-brand-yellow font-medium mb-3">{tutor.subject}</p>
                  <p className="text-gray-600 text-sm">{tutor.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-First Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0 md:order-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Access Learning Anywhere, Anytime
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Our mobile-first platform ensures that quality education is accessible to all students, regardless of their device or internet connectivity.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Smartphone className="w-5 h-5 text-primary-600" />,
                    text: "Fully responsive design optimized for mobile devices"
                  },
                  {
                    icon: <Zap className="w-5 h-5 text-primary-600" />,
                    text: "Low-data mode for limited internet connectivity"
                  },
                  {
                    icon: <Cpu className="w-5 h-5 text-primary-600" />,
                    text: "Offline access to downloaded content"
                  }
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1">{feature.icon}</div>
                    <span className="text-gray-700">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 md:order-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img 
                src="https://i.postimg.cc/vTDfVxHP/20250516-2212-Student-Exploring-Heart-AR-simple-compose-01jvd8309rf09bpqbshan8da34.png" 
                alt="Student using mobile phone for learning" 
                className="rounded-lg shadow-xl max-w-full h-auto md:max-w-md"
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-brand-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Learning Experience?
          </motion.h2>
          <motion.p 
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of students across Kenya who are already benefiting from our immersive learning platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/register">
              <Button 
                variant="secondary" 
                size="lg"
                className="mr-4 bg-brand-yellow hover:bg-brand-yellow/90 focus:ring-brand-yellow"
              >
                Join our waitlist
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;