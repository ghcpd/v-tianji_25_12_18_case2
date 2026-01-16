import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { VocabProvider } from '../context/VocabContext';
import Home from '../components/Home';

describe('Home', () => {
  test('renders home page', () => {
    render(
      <BrowserRouter>
        <VocabProvider>
          <Home />
        </VocabProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Vocabulary Learning App')).toBeInTheDocument();
    expect(screen.getByText('Total words: 10')).toBeInTheDocument();
  });
});