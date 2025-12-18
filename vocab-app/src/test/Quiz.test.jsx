import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { VocabProvider } from '../context/VocabContext';
import Quiz from '../components/Quiz';

describe('Quiz', () => {
  test('renders quiz question', () => {
    render(
      <VocabProvider>
        <Quiz />
      </VocabProvider>
    );
    expect(screen.getByText(/What is the translation of/)).toBeInTheDocument();
  });

  test('provides feedback on answer', async () => {
    render(
      <VocabProvider>
        <Quiz />
      </VocabProvider>
    );
    const correctButton = screen.getByText('hola'); // Assuming 'hola' is correct for 'hello'
    fireEvent.click(correctButton);
    await waitFor(() => {
      expect(screen.getByText('Correct!')).toBeInTheDocument();
    });
  });
});