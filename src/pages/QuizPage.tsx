import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Clock, RotateCcw } from 'lucide-react';
import { useUserProgress } from '../contexts/UserProgressContext';
import Button from '../components/ui/Button';
import Card, { CardContent, CardHeader, CardFooter } from '../components/ui/Card';

// Mock quiz data - In production, this would come from your backend
const MOCK_QUIZ = {
  title: "Forces and Motion",
  questions: [
    {
      id: 1,
      question: "What is Newton's First Law of Motion?",
      options: [
        "An object in motion stays in motion unless acted upon by an external force",
        "Force equals mass times acceleration",
        "For every action, there is an equal and opposite reaction",
        "Objects fall at the same rate regardless of mass"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      question: "What is the SI unit of force?",
      options: [
        "Joule",
        "Newton",
        "Pascal",
        "Watt"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: "Which force always pulls objects toward the center of the Earth?",
      options: [
        "Friction",
        "Air resistance",
        "Gravity",
        "Tension"
      ],
      correctAnswer: 2
    }
  ]
};

const QuizPage: React.FC = () => {
  const { topicId } = useParams();
  const { saveQuizScore } = useUserProgress();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer when component mounts
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    setTimer(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < MOCK_QUIZ.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      if (timer) clearInterval(timer);
      setShowResults(true);
      calculateScore();
    }
  };

  const calculateScore = () => {
    const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === MOCK_QUIZ.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const score = (correctAnswers / MOCK_QUIZ.questions.length) * 100;
    if (topicId) {
      saveQuizScore(topicId, score);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setTimeSpent(0);
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    setTimer(interval);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
      return acc + (answer === MOCK_QUIZ.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const score = (correctAnswers / MOCK_QUIZ.questions.length) * 100;

    return (
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Quiz Results</h1>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-primary-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-primary-700">{score}%</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Correct Answers</p>
                <p className="text-xl font-semibold text-gray-900">{correctAnswers}/{MOCK_QUIZ.questions.length}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Time Spent</p>
                <p className="text-xl font-semibold text-gray-900">{formatTime(timeSpent)}</p>
              </div>
            </div>

            {score >= 70 && (
              <div className="text-center text-success-600">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <p className="font-semibold">Congratulations! You passed the quiz!</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="primary"
              onClick={resetQuiz}
              icon={<RotateCcw className="w-5 h-5" />}
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  const currentQuestionData = MOCK_QUIZ.questions[currentQuestion];

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{MOCK_QUIZ.title}</h1>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{formatTime(timeSpent)}</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / MOCK_QUIZ.questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Question {currentQuestion + 1} of {MOCK_QUIZ.questions.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-lg text-gray-900">
            {currentQuestionData.question}
          </div>

          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-primary-100 border-2 border-primary-500'
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === MOCK_QUIZ.questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default QuizPage;