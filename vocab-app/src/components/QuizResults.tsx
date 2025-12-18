import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const QuizResults: React.FC = () => {
  const { currentQuiz, endQuiz, vocabularyLists, currentListId } = useVocabStore();

  if (!currentQuiz || !currentQuiz.completed) {
    return null;
  }

  const currentList = vocabularyLists.find((l) => l.id === currentListId);
  const totalQuestions = currentQuiz.questions.length;
  const percentage = (currentQuiz.score / totalQuestions) * 100;

  const getPerformanceMessage = (percentage: number) => {
    if (percentage === 100) return '🎯 Perfect! Outstanding performance!';
    if (percentage >= 80) return '👏 Great job! Well done!';
    if (percentage >= 60) return '📈 Good effort! Keep practicing!';
    return '💪 Keep going! You\'ll improve with more practice!';
  };

  const handleRetakeQuiz = () => {
    endQuiz();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Quiz Results</h2>

      <div className="text-center mb-8">
        <div className="relative w-40 h-40 mx-auto mb-4">
          <svg className="transform -rotate-90 w-full h-full">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(percentage / 100) * 440} 440`}
              className="transition-all"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <p className="text-4xl font-bold text-blue-600">{Math.round(percentage)}</p>
              <p className="text-sm text-gray-600">%</p>
            </div>
          </div>
        </div>

        <p className="text-xl font-semibold text-gray-800 mb-2">
          {currentQuiz.score} of {totalQuestions} Correct
        </p>
        <p className="text-lg text-gray-600">{getPerformanceMessage(percentage)}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Detailed Results</h3>
        <div className="space-y-2">
          {currentQuiz.questions.map((q, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Question {index + 1}: {q.question.substring(0, 40)}...
              </span>
              <span className={`text-sm font-semibold ${q.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {q.isCorrect ? '✓' : '✗'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleRetakeQuiz}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Back to Study Mode
        </button>
        <p className="text-xs text-center text-gray-600 pt-2">
          {currentList && `Great learning session on "${currentList.name}"!`}
        </p>
      </div>
    </div>
  );
};
