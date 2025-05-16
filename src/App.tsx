import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import StudyGrade from './pages/study/StudyGrade';
import SubjectTopics from './pages/study/SubjectTopics';
import TopicDetail from './pages/study/TopicDetail';
import QuizPage from './pages/QuizPage';
import ChatbotPage from './pages/ChatbotPage';
import GamificationPage from './pages/GamificationPage';
import OfflineLibrary from './pages/OfflineLibrary';
import NotFound from './pages/NotFound';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { UserProgressProvider } from './contexts/UserProgressContext';

// Layout components
import ProtectedRoute from './components/layout/ProtectedRoute';
import ScrollToTop from './components/utils/ScrollToTop';

// Animation wrapper component
const AnimationWrapper = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study/:grade" element={<StudyGrade />} />
          <Route path="/study/:grade/:subject" element={<SubjectTopics />} />
          <Route path="/study/:grade/:subject/:topicId" element={<TopicDetail />} />
          <Route path="/quiz/:topicId" element={<QuizPage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/rewards" element={<GamificationPage />} />
          <Route path="/offline-library" element={<OfflineLibrary />} />
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProgressProvider>
          <ScrollToTop />
          <AnimationWrapper />
        </UserProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;