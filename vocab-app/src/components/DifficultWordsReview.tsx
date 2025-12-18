import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const DifficultWordsReview: React.FC = () => {
  const { vocabularyLists, currentListId, toggleMarkWord, getMarkedWords } = useVocabStore();

  const currentList = vocabularyLists.find((l) => l.id === currentListId);
  const markedWords = currentListId ? getMarkedWords(currentListId) : [];

  if (!currentList) {
    return null;
  }

  const difficultWords = currentList.words.filter((w) => w.difficulty === 'hard');

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Review Difficult Words</h2>

      {difficultWords.length === 0 ? (
        <p className="text-gray-600 text-center py-8">
          No difficult words yet. Keep studying! 🎓
        </p>
      ) : (
        <div className="space-y-3">
          {difficultWords.map((word) => (
            <div
              key={word.id}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{word.english}</h3>
                  <p className="text-gray-600">{word.translation}</p>
                  <p className="text-sm text-gray-500 italic mt-2">"{word.example}"</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Part of speech: <span className="font-semibold">{word.partOfSpeech}</span>
                  </p>
                </div>
                <button
                  onClick={() => toggleMarkWord(currentList.id, word.id)}
                  className={`ml-4 px-3 py-1 rounded-lg text-sm font-semibold transition-all ${
                    word.isMarked
                      ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {word.isMarked ? '⭐ Marked' : 'Mark'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {markedWords.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="font-semibold text-yellow-900">
            📌 {markedWords.length} word{markedWords.length !== 1 ? 's' : ''} marked for review
          </p>
        </div>
      )}
    </div>
  );
};
