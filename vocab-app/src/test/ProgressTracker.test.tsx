import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressTracker } from '../components/ProgressTracker';
import { useVocabStore } from '../store/vocabStore';
import type { VocabularyList } from '../types';

describe('ProgressTracker', () => {
  beforeEach(() => {
    const list: VocabularyList = {
      id: 'list-1',
      name: 'Test',
      words: [
        {
          id: 'word-1',
          english: 'Hello',
          translation: 'Hola',
          partOfSpeech: 'interjection',
          example: 'Hello, world!',
          difficulty: 'easy',
          isMarked: false,
        },
        {
          id: 'word-2',
          english: 'Complex',
          translation: 'Complejo',
          partOfSpeech: 'adjective',
          example: 'This is complex.',
          difficulty: 'hard',
          isMarked: false,
        },
      ],
      createdAt: new Date(),
      studiedCount: 2,
    };

    useVocabStore.setState({
      vocabularyLists: [list],
      currentListId: 'list-1',
    });
  });

  it('should render progress title', () => {
    render(<ProgressTracker />);

    expect(screen.getByText('Learning Progress')).toBeInTheDocument();
  });

  it('should display progress statistics', () => {
    render(<ProgressTracker />);

    expect(screen.getByText(/Overall Progress/)).toBeInTheDocument();
    expect(screen.getByText(/2 of 2 sessions completed/)).toBeInTheDocument();
  });

  it('should show word statistics', () => {
    render(<ProgressTracker />);

    expect(screen.getByText(/Total Words/)).toBeInTheDocument();
    expect(screen.getByText('Mastered')).toBeInTheDocument();
    expect(screen.getByText('Difficult')).toBeInTheDocument();
  });

  it('should display mastered percentage', () => {
    render(<ProgressTracker />);

    expect(screen.getByText(/Mastered Words/)).toBeInTheDocument();
    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });
});
