import React, { useState } from 'react';
import {
  VocabularyListSelector,
  StudyMode,
  FlashcardView,
  MultipleChoiceQuiz,
  TypingQuiz,
  ProgressTracker,
  DifficultWordsReview,
  QuizResults,
} from './components';
import { useVocabStore } from './store/vocabStore';
import './App.css';

function App() {
  const { currentQuiz, endQuiz } = useVocabStore();
  const [activeTab, setActiveTab] = useState<'study' | 'progress' | 'review'>('study');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-2">
                📚 Vocab Master
              </h1>
              <p className="text-blue-100 mt-1">Learn languages, master vocabulary</p>
            </div>
            {currentQuiz && (
              <button
                onClick={endQuiz}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Exit Quiz
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentQuiz ? (
          <div className="space-y-6">
            <QuizResults />
            {!currentQuiz.completed && (
              <>
                <FlashcardView />
                <MultipleChoiceQuiz />
                <TypingQuiz />
              </>
            )}
          </div>
        ) : (
          <>
            <VocabularyListSelector />

            <div className="mt-8">
              <div className="flex gap-2 mb-6 border-b border-gray-300">
                <button
                  onClick={() => setActiveTab('study')}
                  className={`px-4 py-3 font-semibold transition-all ${
                    activeTab === 'study'
                      ? 'border-b-4 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  📖 Study
                </button>
                <button
                  onClick={() => setActiveTab('progress')}
                  className={`px-4 py-3 font-semibold transition-all ${
                    activeTab === 'progress'
                      ? 'border-b-4 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  📊 Progress
                </button>
                <button
                  onClick={() => setActiveTab('review')}
                  className={`px-4 py-3 font-semibold transition-all ${
                    activeTab === 'review'
                      ? 'border-b-4 border-blue-600 text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  ⭐ Review
                </button>
              </div>

              {activeTab === 'study' && <StudyMode />}
              {activeTab === 'progress' && <ProgressTracker />}
              {activeTab === 'review' && <DifficultWordsReview />}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Vocab Master. Built with React + TypeScript + Zustand
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
