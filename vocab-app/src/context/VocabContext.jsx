import React, { createContext, useContext, useState, useEffect } from 'react';

// Mock data
const initialWords = [
  { id: 1, word: 'hello', translation: 'hola', difficulty: false },
  { id: 2, word: 'world', translation: 'mundo', difficulty: false },
  { id: 3, word: 'cat', translation: 'gato', difficulty: false },
  { id: 4, word: 'dog', translation: 'perro', difficulty: false },
  { id: 5, word: 'house', translation: 'casa', difficulty: false },
  { id: 6, word: 'car', translation: 'coche', difficulty: false },
  { id: 7, word: 'book', translation: 'libro', difficulty: false },
  { id: 8, word: 'water', translation: 'agua', difficulty: false },
  { id: 9, word: 'food', translation: 'comida', difficulty: false },
  { id: 10, word: 'friend', translation: 'amigo', difficulty: false },
];

const VocabContext = createContext();

export const useVocab = () => useContext(VocabContext);

export const VocabProvider = ({ children }) => {
  const [words, setWords] = useState(initialWords);
  const [progress, setProgress] = useState({}); // {wordId: {correct: number, total: number}}

  const markDifficult = (id) => {
    setWords(words.map(w => w.id === id ? { ...w, difficulty: true } : w));
  };

  const updateProgress = (id, correct) => {
    setProgress(prev => ({
      ...prev,
      [id]: {
        correct: (prev[id]?.correct || 0) + (correct ? 1 : 0),
        total: (prev[id]?.total || 0) + 1,
      }
    }));
  };

  const getDifficultWords = () => words.filter(w => w.difficulty);

  const getProgress = (id) => progress[id] || { correct: 0, total: 0 };

  return (
    <VocabContext.Provider value={{
      words,
      progress,
      markDifficult,
      updateProgress,
      getDifficultWords,
      getProgress,
    }}>
      {children}
    </VocabContext.Provider>
  );
};