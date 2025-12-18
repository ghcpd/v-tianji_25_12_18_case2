import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StudyMode } from '../components/StudyMode';
import { useVocabStore } from '../store/vocabStore';
import type { VocabularyList } from '../types';

describe('StudyMode', () => {
  beforeEach(() => {
    const list: VocabularyList = {
      id: 'list-1',
      name: 'Test Vocabulary',
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
      ],
      createdAt: new Date(),
      studiedCount: 0,
    };

    useVocabStore.setState({
      vocabularyLists: [list],
      currentListId: 'list-1',
      currentQuiz: null,
    });
  });

  it('should render study mode options', () => {
    render(<StudyMode />);

    expect(screen.getByText('Study Mode')).toBeInTheDocument();
    expect(screen.getByText('Flashcards')).toBeInTheDocument();
    expect(screen.getByText('Multiple Choice')).toBeInTheDocument();
    expect(screen.getByText('Typing')).toBeInTheDocument();
  });

  it('should display list name', () => {
    render(<StudyMode />);

    expect(screen.getByText(/Test Vocabulary/)).toBeInTheDocument();
  });

  it('should start flashcard quiz', async () => {
    const user = userEvent.setup();
    render(<StudyMode />);

    const flashcardButton = screen.getByRole('button', { name: /Flashcards/ });
    await user.click(flashcardButton);

    const quiz = useVocabStore.getState().currentQuiz;
    expect(quiz?.type).toBe('flashcard');
  });

  it('should start multiple choice quiz', async () => {
    const user = userEvent.setup();
    render(<StudyMode />);

    const multipleChoiceButton = screen.getByRole('button', { name: /Multiple Choice/ });
    await user.click(multipleChoiceButton);

    const quiz = useVocabStore.getState().currentQuiz;
    expect(quiz?.type).toBe('multipleChoice');
  });

  it('should start typing quiz', async () => {
    const user = userEvent.setup();
    render(<StudyMode />);

    const typingButton = screen.getByRole('button', { name: /Typing/ });
    await user.click(typingButton);

    const quiz = useVocabStore.getState().currentQuiz;
    expect(quiz?.type).toBe('typing');
  });

  it('should display word count', () => {
    render(<StudyMode />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(/Total Words/)).toBeInTheDocument();
  });
});
