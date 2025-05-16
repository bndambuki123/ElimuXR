import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Book, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader } from '../components/ui/Card';

type OfflineContent = {
  id: string;
  title: string;
  subject: string;
  size: string;
  status: 'available' | 'downloading' | 'downloaded' | 'error';
  progress?: number;
};

const OfflineLibrary: React.FC = () => {
  const [content, setContent] = useState<OfflineContent[]>([
    {
      id: '1',
      title: 'Cell Structure and Function',
      subject: 'Biology',
      size: '250MB',
      status: 'available'
    },
    {
      id: '2',
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      size: '180MB',
      status: 'downloading',
      progress: 45
    },
    {
      id: '3',
      title: 'Forces and Motion',
      subject: 'Physics',
      size: '320MB',
      status: 'downloaded'
    },
    {
      id: '4',
      title: 'Algebraic Expressions',
      subject: 'Mathematics',
      size: '150MB',
      status: 'error'
    }
  ]);

  const handleDownload = (id: string) => {
    setContent(content.map(item => 
      item.id === id 
        ? { ...item, status: 'downloading', progress: 0 } 
        : item
    ));
  };

  const handleDelete = (id: string) => {
    setContent(content.map(item => 
      item.id === id 
        ? { ...item, status: 'available' } 
        : item
    ));
  };

  const handleRetry = (id: string) => {
    setContent(content.map(item => 
      item.id === id 
        ? { ...item, status: 'downloading', progress: 0 } 
        : item
    ));
  };

  const getStatusIcon = (status: OfflineContent['status']) => {
    switch (status) {
      case 'available':
        return <Download className="w-5 h-5 text-primary-600" />;
      case 'downloading':
        return <RefreshCw className="w-5 h-5 text-primary-600 animate-spin" />;
      case 'downloaded':
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error-600" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Offline Library</h1>
            <p className="text-gray-600 mt-2">Download content for offline access</p>
          </div>
          <div className="flex items-center space-x-2">
            <Book className="w-5 h-5 text-primary-600" />
            <span className="text-sm text-gray-600">Storage: 2.5GB/5GB</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card>
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.subject}</p>
                  </div>
                  <span className="text-sm text-gray-500">{item.size}</span>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium text-gray-700">
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    
                    {item.status === 'available' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(item.id)}
                        icon={<Download className="w-4 h-4" />}
                      >
                        Download
                      </Button>
                    )}
                    
                    {item.status === 'downloading' && (
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-600 transition-all duration-300"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    )}
                    
                    {item.status === 'downloaded' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        icon={<Trash2 className="w-4 h-4" />}
                      >
                        Delete
                      </Button>
                    )}
                    
                    {item.status === 'error' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRetry(item.id)}
                        icon={<RefreshCw className="w-4 h-4" />}
                      >
                        Retry
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default OfflineLibrary;