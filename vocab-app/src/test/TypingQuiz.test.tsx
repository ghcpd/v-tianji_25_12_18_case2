import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TypingQuiz } from '../components/TypingQuiz';
import { useVocabStore } from '../store/vocabStore';
import type { VocabularyList } from '../types';

describe('TypingQuiz', () => {
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
      ],
      createdAt: new Date(),
      studiedCount: 0,
    };

    useVocabStore.setState({
      vocabularyLists: [list],
      currentListId: 'list-1',
      currentQuiz: null,
    });

    useVocabStore.getState().startQuiz('list-1', 'typing');
  });

  it('should render typing quiz input', () => {
    render(<TypingQuiz />);

    expect(screen.getByPlaceholderText('Type your answer here...')).toBeInTheDocument();
    expect(screen.getByText('Submit Answer')).toBeInTheDocument();
  });

  it('should type in the input field', async () => {
    const user = userEvent.setup();
    render(<TypingQuiz />);

    const input = screen.getByPlaceholderText('Type your answer here...') as HTMLInputElement;
    await user.type(input, 'Serendipity');

    expect(input.value).toBe('Serendipity');
  });

  it('should submit typed answer', async () => {
    const user = userEvent.setup();
    render(<TypingQuiz />);

    const input = screen.getByPlaceholderText('Type your answer here...');
    await user.type(input, 'Serendipity');

    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);

    expect(screen.getByText('✓ Correct!')).toBeInTheDocument();
  });

  it('should be case-insensitive for correct answers', async () => {
    const user = userEvent.setup();
    render(<TypingQuiz />);

    const input = screen.getByPlaceholderText('Type your answer here...');
    await user.type(input, 'serendipity');

    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);

    expect(screen.getByText('✓ Correct!')).toBeInTheDocument();
  });

  it('should show incorrect answer feedback', async () => {
    const user = userEvent.setup();
    render(<TypingQuiz />);

    const input = screen.getByPlaceholderText('Type your answer here...');
    await user.type(input, 'Wrong Answer');

    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);

    expect(screen.getByText('✗ Incorrect')).toBeInTheDocument();
  });
});
