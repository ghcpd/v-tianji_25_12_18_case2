import React from 'react';
import { useVocab } from '../context/VocabContext';

const Review = () => {
  const { getDifficultWords } = useVocab();
  const difficultWords = getDifficultWords();

  return (
    <div>
      <h1>Review Difficult Words</h1>
      {difficultWords.length === 0 ? (
        <p>No difficult words yet.</p>
      ) : (
        <ul>
          {difficultWords.map(word => (
            <li key={word.id}>{word.word} - {word.translation}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;