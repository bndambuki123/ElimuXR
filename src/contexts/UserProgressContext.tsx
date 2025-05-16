import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import localforage from 'localforage';

// Types
type Progress = {
  completedTopics: string[];
  quizScores: Record<string, number>;
  streakDays: number;
  lastLogin: string;
  points: number;
  badges: string[];
};

type UserProgressContextType = {
  progress: Progress;
  loading: boolean;
  markTopicComplete: (topicId: string) => void;
  saveQuizScore: (topicId: string, score: number) => void;
  addPoints: (points: number) => void;
};

// Default progress state
const defaultProgress: Progress = {
  completedTopics: [],
  quizScores: {},
  streakDays: 0,
  lastLogin: new Date().toISOString().split('T')[0],
  points: 0,
  badges: [],
};

// Create context
const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  // Load progress from storage on user change
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        try {
          const savedProgress = await localforage.getItem<Progress>(`progress_${user.id}`);
          
          if (savedProgress) {
            // Check if logged in today and update streak
            const today = new Date().toISOString().split('T')[0];
            const lastLogin = savedProgress.lastLogin;
            
            // Calculate date difference
            const lastDate = new Date(lastLogin);
            const todayDate = new Date(today);
            const diffTime = Math.abs(todayDate.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let updatedProgress = { ...savedProgress };
            
            // If logged in yesterday, increment streak
            if (diffDays === 1) {
              updatedProgress.streakDays += 1;
              
              // Award badge for streak milestones
              if (updatedProgress.streakDays === 3 && !updatedProgress.badges.includes('3-day-streak')) {
                updatedProgress.badges.push('3-day-streak');
                updatedProgress.points += 50;
              } else if (updatedProgress.streakDays === 7 && !updatedProgress.badges.includes('7-day-streak')) {
                updatedProgress.badges.push('7-day-streak');
                updatedProgress.points += 100;
              }
            } 
            // If more than a day passed, reset streak
            else if (diffDays > 1) {
              updatedProgress.streakDays = 1;
            }
            
            updatedProgress.lastLogin = today;
            
            setProgress(updatedProgress);
            await localforage.setItem(`progress_${user.id}`, updatedProgress);
          } else {
            // Initialize with default progress
            setProgress(defaultProgress);
            await localforage.setItem(`progress_${user.id}`, defaultProgress);
          }
        } catch (error) {
          console.error('Error loading progress:', error);
          setProgress(defaultProgress);
        }
      } else {
        setProgress(defaultProgress);
      }
      
      setLoading(false);
    };
    
    loadProgress();
  }, [user]);

  // Mark a topic as complete
  const markTopicComplete = async (topicId: string) => {
    if (!user) return;
    
    if (!progress.completedTopics.includes(topicId)) {
      const updatedProgress = {
        ...progress,
        completedTopics: [...progress.completedTopics, topicId],
        points: progress.points + 20 // Award points for completing a topic
      };
      
      setProgress(updatedProgress);
      await localforage.setItem(`progress_${user.id}`, updatedProgress);
    }
  };

  // Save quiz score
  const saveQuizScore = async (topicId: string, score: number) => {
    if (!user) return;
    
    const updatedScores = { ...progress.quizScores, [topicId]: score };
    
    // Award points based on score (up to 50 points for perfect score)
    const pointsEarned = Math.floor(score * 0.5);
    
    // Add badge for first perfect score
    let updatedBadges = [...progress.badges];
    if (score === 100 && !progress.badges.includes('perfect-score')) {
      updatedBadges.push('perfect-score');
    }
    
    const updatedProgress = {
      ...progress,
      quizScores: updatedScores,
      points: progress.points + pointsEarned,
      badges: updatedBadges
    };
    
    setProgress(updatedProgress);
    await localforage.setItem(`progress_${user.id}`, updatedProgress);
  };

  // Add points
  const addPoints = async (points: number) => {
    if (!user) return;
    
    const updatedProgress = {
      ...progress,
      points: progress.points + points
    };
    
    setProgress(updatedProgress);
    await localforage.setItem(`progress_${user.id}`, updatedProgress);
  };

  return (
    <UserProgressContext.Provider
      value={{
        progress,
        loading,
        markTopicComplete,
        saveQuizScore,
        addPoints,
      }}
    >
      {children}
    </UserProgressContext.Provider>
  );
};

// Custom hook for using the progress context
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};