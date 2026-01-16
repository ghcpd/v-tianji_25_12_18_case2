import React, { useState } from 'react';
import { useVocab } from '../context/VocabContext';

const Quiz = () => {
  const { words, updateProgress, markDifficult } = useVocab();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');

  const currentWord = words[currentIndex];

  const generateOptions = (word) => {
    const correct = word.translation;
    const wrongs = words.filter(w => w.id !== word.id).map(w => w.translation).slice(0, 3);
    return [correct, ...wrongs].sort(() => Math.random() - 0.5);
  };

  React.useEffect(() => {
    if (currentWord) {
      setOptions(generateOptions(currentWord));
      setSelected(null);
      setFeedback('');
    }
  }, [currentIndex, currentWord]);

  const checkAnswer = (option) => {
    setSelected(option);
    const correct = option === currentWord.translation;
    updateProgress(currentWord.id, correct);
    setFeedback(correct ? 'Correct!' : `Wrong! Correct is ${currentWord.translation}`);
    if (!correct) markDifficult(currentWord.id);
  };

  const nextQuestion = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  if (!currentWord) return <div>No words for quiz</div>;

  return (
    <div>
      <h1>Quiz</h1>
      <h2>What is the translation of "{currentWord.word}"?</h2>
      {options.map((option, idx) => (
        <button key={idx} onClick={() => checkAnswer(option)} disabled={selected !== null}>
          {option}
        </button>
      ))}
      {feedback && <p>{feedback}</p>}
      {selected && <button onClick={nextQuestion}>Next</button>}
    </div>
  );
};

export default Quiz;