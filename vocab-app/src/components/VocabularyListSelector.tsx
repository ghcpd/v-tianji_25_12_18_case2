import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const VocabularyListSelector: React.FC = () => {
  const { vocabularyLists, currentListId, setCurrentList } = useVocabStore();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Vocabulary Lists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocabularyLists.map((list) => (
          <button
            key={list.id}
            onClick={() => setCurrentList(list.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              currentListId === list.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50 hover:border-blue-300'
            }`}
          >
            <h3 className="font-bold text-lg text-gray-800">{list.name}</h3>
            <p className="text-sm text-gray-600">
              {list.words.length} words • Studied {list.studiedCount} times
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Created: {new Date(list.createdAt).toLocaleDateString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
