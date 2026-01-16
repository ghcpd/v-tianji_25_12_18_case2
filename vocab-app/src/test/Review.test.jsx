import { render, screen } from '@testing-library/react';
import { VocabProvider } from '../context/VocabContext';
import Review from '../components/Review';

describe('Review', () => {
  test('renders review page', () => {
    render(
      <VocabProvider>
        <Review />
      </VocabProvider>
    );
    expect(screen.getByText('Review Difficult Words')).toBeInTheDocument();
  });
});