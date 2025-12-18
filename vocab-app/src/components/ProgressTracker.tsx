import React from 'react';
import { useVocabStore } from '../store/vocabStore';

export const ProgressTracker: React.FC = () => {
  const { vocabularyLists, currentListId, calculateProgress } = useVocabStore();

  const currentList = vocabularyLists.find((l) => l.id === currentListId);
  const progress = currentListId ? calculateProgress(currentListId) : null;

  if (!currentList || !progress) {
    return null;
  }

  const percentStudied = (progress.studiedWords / progress.totalWords) * 100 || 0;
  const percentMastered = (progress.masteredWords / progress.totalWords) * 100 || 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Learning Progress</h2>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
            <span className="text-sm font-bold text-blue-600">{Math.round(percentStudied)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${percentStudied}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progress.studiedWords} of {progress.totalWords} sessions completed
          </p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Mastered Words</span>
            <span className="text-sm font-bold text-green-600">{Math.round(percentMastered)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{ width: `${percentMastered}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progress.masteredWords} easy, {progress.difficultWords} difficult
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">{progress.totalWords}</p>
            <p className="text-xs text-gray-600">Total Words</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">{progress.masteredWords}</p>
            <p className="text-xs text-gray-600">Mastered</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">{progress.difficultWords}</p>
            <p className="text-xs text-gray-600">Difficult</p>
          </div>
        </div>

        {progress.lastStudied && (
          <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-200">
            Last studied: {new Date(progress.lastStudied).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};
