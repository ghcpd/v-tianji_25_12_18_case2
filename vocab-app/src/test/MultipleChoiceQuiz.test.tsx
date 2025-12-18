import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultipleChoiceQuiz } from '../components/MultipleChoiceQuiz';
import { useVocabStore } from '../store/vocabStore';
import type { VocabularyList } from '../types';

describe('MultipleChoiceQuiz', () => {
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

    useVocabStore.getState().startQuiz('list-1', 'multipleChoice');
  });

  it('should render multiple choice options', () => {
    render(<MultipleChoiceQuiz />);

    expect(screen.getByText(/Question 1 of 2/)).toBeInTheDocument();
    const options = screen.getAllByRole('button').filter((btn) =>
      !btn.textContent?.includes('Submit') && !btn.textContent?.includes('Next')
    );
    expect(options.length).toBeGreaterThanOrEqual(3);
  });

  it('should select an option', async () => {
    const user = userEvent.setup();
    render(<MultipleChoiceQuiz />);

    const buttons = screen.getAllByRole('button').filter((btn) =>
      !btn.textContent?.includes('Submit') && !btn.textContent?.includes('Next')
    );

    await user.click(buttons[0]);
    expect(buttons[0]).toHaveClass('border-blue-500');
  });

  it('should submit answer and show result', async () => {
    const user = userEvent.setup();
    render(<MultipleChoiceQuiz />);

    const buttons = screen.getAllByRole('button').filter((btn) =>
      !btn.textContent?.includes('Submit') && !btn.textContent?.includes('Next')
    );

    // Get the correct answer from the store
    const quiz = useVocabStore.getState().currentQuiz;
    const correctAnswer = quiz?.questions[0].answer;

    // Find and click the button with the correct answer
    const correctButton = buttons.find((btn) => btn.textContent?.includes(correctAnswer || ''));
    if (correctButton) {
      await user.click(correctButton);
    } else {
      await user.click(buttons[0]);
    }

    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);

    const resultText = screen.getByText(/Correct answer:/);
    expect(resultText).toBeInTheDocument();
  });

  it('should move to next question', async () => {
    const user = userEvent.setup();
    render(<MultipleChoiceQuiz />);

    const buttons = screen.getAllByRole('button').filter((btn) =>
      !btn.textContent?.includes('Submit') && !btn.textContent?.includes('Next')
    );

    await user.click(buttons[0]);

    const submitButton = screen.getByText('Submit Answer');
    await user.click(submitButton);

    const nextButton = screen.getByText('Next Question');
    await user.click(nextButton);

    expect(screen.getByText(/Question 2 of 2/)).toBeInTheDocument();
  });
});
