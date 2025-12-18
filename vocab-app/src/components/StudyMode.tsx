import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const StudyMode: React.FC = () => {
  const { vocabularyLists, currentListId, startQuiz, currentQuiz } = useVocabStore();

  const currentList = vocabularyLists.find((l) => l.id === currentListId);

  if (!currentList || currentQuiz) {
    return null;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Study Mode</h2>
      <p className="text-gray-600 mb-6">Choose a study method for: {currentList.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => startQuiz(currentList.id, 'flashcard')}
          className="p-6 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-lg shadow-md transition-all"
        >
          <div className="text-3xl mb-2">📇</div>
          <h3 className="font-bold text-lg">Flashcards</h3>
          <p className="text-sm mt-2">Learn word meanings by flipping cards</p>
        </button>

        <button
          onClick={() => startQuiz(currentList.id, 'multipleChoice')}
          className="p-6 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white rounded-lg shadow-md transition-all"
        >
          <div className="text-3xl mb-2">✓</div>
          <h3 className="font-bold text-lg">Multiple Choice</h3>
          <p className="text-sm mt-2">Select the correct answer from options</p>
        </button>

        <button
          onClick={() => startQuiz(currentList.id, 'typing')}
          className="p-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-lg shadow-md transition-all"
        >
          <div className="text-3xl mb-2">⌨️</div>
          <h3 className="font-bold text-lg">Typing</h3>
          <p className="text-sm mt-2">Type the correct answer in English</p>
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Total Words:</span> {currentList.words.length}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          <span className="font-semibold">Times Studied:</span> {currentList.studiedCount}
        </p>
      </div>
    </div>
  );
};
