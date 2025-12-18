import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FlashcardView } from '../components/FlashcardView';
import { useVocabStore } from '../store/vocabStore';
import type { VocabularyList } from '../types';

describe('FlashcardView', () => {
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
          isMarked: false,
        },
      ],
      createdAt: new Date(),
      studiedCount: 0,
    };

    useVocabStore.setState({
      vocabularyLists: [list],
      currentListId: 'list-1',
      currentQuiz: null,
    });

    useVocabStore.getState().startQuiz('list-1', 'flashcard');
  });

  it('should render flashcard with English word', () => {
    render(<FlashcardView />);

    expect(screen.getByText('Serendipity')).toBeInTheDocument();
    expect(screen.getByText('English Word')).toBeInTheDocument();
  });

  it('should flip card to show translation', async () => {
    const user = userEvent.setup();
    render(<FlashcardView />);

    const card = screen.getByText('Serendipity').closest('div');
    await user.click(card!);

    expect(screen.getByText('Encuentro afortunado')).toBeInTheDocument();
    expect(screen.getByText('Translation')).toBeInTheDocument();
  });

  it('should show progress indicator', () => {
    render(<FlashcardView />);

    expect(screen.getByText(/Card 1 of 2/)).toBeInTheDocument();
    expect(screen.getByText(/Score: 0/)).toBeInTheDocument();
  });

  it('should mark card as correct and move to next', async () => {
    const user = userEvent.setup();
    render(<FlashcardView />);

    const card = screen.getByText('Serendipity').closest('div');
    await user.click(card!);

    const correctButton = screen.getByText('I got it!');
    await user.click(correctButton);

    const nextButton = screen.getByText('Next Card');
    await user.click(nextButton);

    expect(screen.getByText(/Card 2 of 2/)).toBeInTheDocument();
    expect(screen.getByText(/Score: 1/)).toBeInTheDocument();
  });
});
