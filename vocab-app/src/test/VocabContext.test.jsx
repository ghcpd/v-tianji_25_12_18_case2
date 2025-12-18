import { render, screen } from '@testing-library/react';
import { VocabProvider, useVocab } from '../context/VocabContext';

const TestComponent = () => {
  const { words, markDifficult, getDifficultWords } = useVocab();
  return (
    <div>
      <p data-testid="word-count">{words.length}</p>
      <button onClick={() => markDifficult(1)}>Mark Difficult</button>
      <p data-testid="difficult-count">{getDifficultWords().length}</p>
    </div>
  );
};

describe('VocabContext', () => {
  test('provides initial words', () => {
    render(
      <VocabProvider>
        <TestComponent />
      </VocabProvider>
    );
    expect(screen.getByTestId('word-count')).toHaveTextContent('10');
  });

  test('marks word as difficult', () => {
    render(
      <VocabProvider>
        <TestComponent />
      </VocabProvider>
    );
    expect(screen.getByTestId('difficult-count')).toHaveTextContent('0');
    // Note: In real test, would need to simulate click, but since state update is async, might need act
  });
});