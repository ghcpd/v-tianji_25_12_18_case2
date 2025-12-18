import React from 'react';
import { Link } from 'react-router-dom';
import { useVocab } from '../context/VocabContext';

const Home = () => {
  const { words, getDifficultWords } = useVocab();
  const difficultWords = getDifficultWords();

  return (
    <div>
      <h1>Vocabulary Learning App</h1>
      <p>Total words: {words.length}</p>
      <p>Difficult words: {difficultWords.length}</p>
      <nav>
        <Link to="/study">Study Flashcards</Link>
        <Link to="/quiz">Take Quiz</Link>
        <Link to="/progress">View Progress</Link>
        <Link to="/review">Review Difficult Words</Link>
      </nav>
    </div>
  );
};

export default Home;