import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Award } from 'lucide-react';

const GamificationPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">Your Learning Achievements</h1>
          <p className="text-lg text-gray-600">Track your progress and earn rewards as you learn!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Points Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-purple-900">2,450</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Total Points</h3>
            <p className="text-sm text-gray-600 mt-2">Keep learning to earn more points!</p>
          </div>

          {/* Badges Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <Medal className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-purple-900">15</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Badges Earned</h3>
            <p className="text-sm text-gray-600 mt-2">Collect badges for completing topics!</p>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-purple-900">7 Days</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Current Streak</h3>
            <p className="text-sm text-gray-600 mt-2">Keep your learning streak alive!</p>
          </div>

          {/* Level Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-purple-900">Level 5</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Current Level</h3>
            <p className="text-sm text-gray-600 mt-2">Progress to unlock new features!</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Recent Achievements</h2>
          <div className="space-y-4">
            {[
              { title: 'Mathematics Master', description: 'Completed 5 math quizzes with perfect scores', date: '2 days ago' },
              { title: 'Science Explorer', description: 'Finished the Basic Chemistry module', date: '1 week ago' },
              { title: 'Reading Champion', description: 'Read 10 articles in the library', date: '2 weeks ago' }
            ].map((achievement, index) => (
              <div key={index} className="flex items-center p-4 bg-purple-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <span className="text-xs text-purple-600">{achievement.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GamificationPage;