import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DifficultWordsReview } from '../components/DifficultWordsReview';
import { useVocabStore } from '../store/vocabStore';
import type { VocabularyList } from '../types';

describe('DifficultWordsReview', () => {
  beforeEach(() => {
    const list: VocabularyList = {
      id: 'list-1',
      name: 'Test',
      words: [
        {
          id: 'word-1',
          english: 'Serendipity',
          translation: 'Encuentro afortunado',
          partOfSpeech: 'noun',
          example: 'Meeting was pure serendipity.',
          difficulty: 'hard',
          isMarked: false,
        },
        {
          id: 'word-2',
          english: 'Ubiquitous',
          translation: 'Presente en todas partes',
          partOfSpeech: 'adjective',
          example: 'Smartphones are ubiquitous.',
          difficulty: 'hard',
          isMarked: true,
        },
        {
          id: 'word-3',
          english: 'Hello',
          translation: 'Hola',
          partOfSpeech: 'interjection',
          example: 'Hello, world!',
          difficulty: 'easy',
          isMarked: false,
        },
      ],
      createdAt: new Date(),
      studiedCount: 0,
    };

    useVocabStore.setState({
      vocabularyLists: [list],
      currentListId: 'list-1',
    });
  });

  it('should render difficult words review section', () => {
    render(<DifficultWordsReview />);

    expect(screen.getByText('Review Difficult Words')).toBeInTheDocument();
  });

  it('should display only difficult words', () => {
    render(<DifficultWordsReview />);

    expect(screen.getByText('Serendipity')).toBeInTheDocument();
    expect(screen.getByText('Ubiquitous')).toBeInTheDocument();
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('should mark words for review', async () => {
    const user = userEvent.setup();
    render(<DifficultWordsReview />);

    const markButtons = screen.getAllByText('Mark');
    await user.click(markButtons[0]);

    const markedButtons = screen.getAllByText('⭐ Marked');
    expect(markedButtons.length).toBeGreaterThan(0);
  });

  it('should show marked words count', () => {
    render(<DifficultWordsReview />);

    expect(screen.getByText(/1 word marked for review/)).toBeInTheDocument();
  });

  it('should display word examples', () => {
    render(<DifficultWordsReview />);

    expect(screen.getByText(/Meeting was pure serendipity/)).toBeInTheDocument();
  });
});
