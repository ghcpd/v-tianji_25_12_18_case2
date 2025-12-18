import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const MultipleChoiceQuiz: React.FC = () => {
  const { currentQuiz, submitAnswer, nextQuestion } = useVocabStore();
  const [answered, setAnswered] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  if (!currentQuiz || currentQuiz.type !== 'multipleChoice') {
    return null;
  }

  const question = currentQuiz.questions[currentQuiz.currentIndex];
  const progress = ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;

  const handleSelectOption = (option: string) => {
    if (!answered) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      submitAnswer(selectedOption);
      setAnswered(true);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
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

      <div className="space-y-3 mb-6">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectOption(option)}
            disabled={answered}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedOption === option
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400'
            } ${answered ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'} ${
              answered && option === question.answer
                ? 'border-green-500 bg-green-50'
                : answered && selectedOption === option && question.userAnswer !== question.answer
                  ? 'border-red-500 bg-red-50'
                  : ''
            }`}
          >
            <div className="font-semibold text-gray-800">{option}</div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {!answered ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Submit Answer
          </button>
        ) : (
          <>
            <div className={`p-3 rounded-lg ${question.userAnswer === question.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <p className="font-semibold">
                {question.userAnswer === question.answer ? '✓ Correct!' : '✗ Incorrect'}
              </p>
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
      </div>
    </div>
  );
};
