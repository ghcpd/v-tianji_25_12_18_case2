import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const FlashcardView: React.FC = () => {
  const { currentQuiz, submitAnswer, nextQuestion } = useVocabStore();
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [answered, setAnswered] = React.useState(false);

  if (!currentQuiz || currentQuiz.type !== 'flashcard') {
    return null;
  }

  const question = currentQuiz.questions[currentQuiz.currentIndex];
  const progress = ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;

  const handleReveal = () => {
    setIsFlipped(!isFlipped);
  };

  const handleMarkCorrect = () => {
    submitAnswer(question.answer);
    setAnswered(true);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setAnswered(false);
    nextQuestion();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Card {currentQuiz.currentIndex + 1} of {currentQuiz.questions.length}
          </span>
          <span className="text-sm font-semibold text-blue-600">
            Score: {currentQuiz.score}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        onClick={handleReveal}
        className="h-64 flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl shadow-lg cursor-pointer transform transition-all hover:scale-105"
      >
        <div className="text-center">
          <p className="text-white text-sm font-semibold mb-2 opacity-75">
            {isFlipped ? 'Translation' : 'English Word'}
          </p>
          <p className="text-white text-3xl font-bold">
            {isFlipped ? question.answer : question.question}
          </p>
          <p className="text-white text-xs mt-4 opacity-75">Click to flip</p>
        </div>
      </div>

      {isFlipped && !answered && (
        <div className="mt-6 space-y-3">
          <button
            onClick={handleMarkCorrect}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            I got it!
          </button>
        </div>
      )}

      {answered && (
        <div className="mt-6">
          <button
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Next Card
          </button>
        </div>
      )}
    </div>
  );
};
