import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const TypingQuiz: React.FC = () => {
  const { currentQuiz, submitAnswer, nextQuestion } = useVocabStore();
  const [userInput, setUserInput] = React.useState('');
  const [answered, setAnswered] = React.useState(false);

  if (!currentQuiz || currentQuiz.type !== 'typing') {
    return null;
  }

  const question = currentQuiz.questions[currentQuiz.currentIndex];
  const progress = ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      submitAnswer(userInput);
      setAnswered(true);
    }
  };

  const handleNext = () => {
    setUserInput('');
    setAnswered(false);
    nextQuestion();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-600">
            Question {currentQuiz.currentIndex + 1} of {currentQuiz.questions.length}
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

      <h3 className="text-xl font-bold text-gray-800 mb-6">{question.question}</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={answered}
          placeholder="Type your answer here..."
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          autoFocus
        />

        {!answered ? (
          <button
            type="submit"
            disabled={!userInput.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <>
            <div
              className={`p-3 rounded-lg ${
                question.userAnswer?.toLowerCase().trim() === question.answer.toLowerCase().trim()
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              <p className="font-semibold">
                {question.userAnswer?.toLowerCase().trim() === question.answer.toLowerCase().trim()
                  ? '✓ Correct!'
                  : '✗ Incorrect'}
              </p>
              <p className="text-sm">Your answer: {question.userAnswer}</p>
              <p className="text-sm">Correct answer: {question.answer}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              Next Question
            </button>
          </>
        )}
      </form>
    </div>
  );
};
