import { render, screen, fireEvent } from '@testing-library/react';
import { VocabProvider } from '../context/VocabContext';
import Study from '../components/Study';

describe('Study', () => {
  test('renders flashcard', () => {
    render(
      <VocabProvider>
        <Study />
      </VocabProvider>
    );
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  test('shows translation on click', () => {
    render(
      <VocabProvider>
        <Study />
      </VocabProvider>
    );
    const button = screen.getByText('Show Translation');
    fireEvent.click(button);
    expect(screen.getByText('hola')).toBeInTheDocument();
  });
});