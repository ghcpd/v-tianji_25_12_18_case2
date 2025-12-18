import { render, screen } from '@testing-library/react';
import { VocabProvider } from '../context/VocabContext';
import Progress from '../components/Progress';

describe('Progress', () => {
  test('renders progress for words', () => {
    render(
      <VocabProvider>
        <Progress />
      </VocabProvider>
    );
    expect(screen.getByText('Progress')).toBeInTheDocument();
    expect(screen.getByText(/hello/)).toBeInTheDocument();
  });
});