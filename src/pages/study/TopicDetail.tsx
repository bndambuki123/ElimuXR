import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, Cuboid as Cube, FileQuestion, Info } from 'lucide-react';
import Button from '../../components/ui/Button';

const TopicDetail = () => {
  const { grade, subject, topicId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video relative group">
              <video
                className="w-full h-full object-cover"
                poster="https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg"
              >
                <source src="/path/to/your/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this Topic</h2>
              <p className="text-gray-600">
                This is a detailed description of the topic. It explains the key concepts,
                learning objectives, and what students will gain from this lesson.
              </p>
            </div>

            {/* AR Model Viewer */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3D AR Model</h2>
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Cube className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">AR model viewer will be displayed here</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Topic Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Topic Information</h2>
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Info className="w-5 h-5 mr-3" />
                  <span>Grade {grade}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Play className="w-5 h-5 mr-3" />
                  <span>15 minutes lesson</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Cube className="w-5 h-5 mr-3" />
                  <span>Interactive 3D model</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FileQuestion className="w-5 h-5 mr-3" />
                  <span>10 quiz questions</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Take Action</h2>
              <div className="space-y-4">
                <Button
                  variant="primary"
                  fullWidth
                  icon={<FileQuestion className="w-5 h-5" />}
                >
                  Start Quiz
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  icon={<Cube className="w-5 h-5" />}
                >
                  View in AR
                </Button>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Lesson Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-primary-600 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Quiz Score</span>
                    <span>Not attempted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicDetail;