import React from 'react';
import { useVocab } from '../context/VocabContext';

const Progress = () => {
  const { words, getProgress } = useVocab();

  return (
    <div>
      <h1>Progress</h1>
      {words.map(word => {
        const prog = getProgress(word.id);
        const percentage = prog.total > 0 ? Math.round((prog.correct / prog.total) * 100) : 0;
        return (
          <div key={word.id}>
            <p>{word.word}: {prog.correct}/{prog.total} ({percentage}%)</p>
            <progress value={prog.correct} max={prog.total}></progress>
          </div>
        );
      })}
    </div>
  );
};

export default Progress;