import React, { useState } from 'react';
import { useVocab } from '../context/VocabContext';

const Study = () => {
  const { words, markDifficult } = useVocab();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentWord = words[currentIndex];

  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
    setShowTranslation(false);
  };

  const prevWord = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
    setShowTranslation(false);
  };

  if (!currentWord) return <div>No words to study</div>;

  return (
    <div>
      <h1>Study Flashcards</h1>
      <div className="flashcard">
        <h2>{currentWord.word}</h2>
        {showTranslation && <p>{currentWord.translation}</p>}
        <button onClick={() => setShowTranslation(!showTranslation)}>
          {showTranslation ? 'Hide' : 'Show'} Translation
        </button>
        <button onClick={() => markDifficult(currentWord.id)}>Mark as Difficult</button>
      </div>
      <div>
        <button onClick={prevWord}>Previous</button>
        <button onClick={nextWord}>Next</button>
      </div>
      <p>{currentIndex + 1} / {words.length}</p>
    </div>
  );
};

export default Study;