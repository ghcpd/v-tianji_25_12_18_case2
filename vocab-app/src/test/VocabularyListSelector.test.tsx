import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VocabularyListSelector } from '../components/VocabularyListSelector';
import { useVocabStore } from '../store/vocabStore';
import { mockVocabularyLists } from '../data/mockData';

describe('VocabularyListSelector', () => {
  beforeEach(() => {
    useVocabStore.setState({
      vocabularyLists: mockVocabularyLists,
      currentListId: mockVocabularyLists[0].id,
    });
  });

  it('should render vocabulary lists', () => {
    render(<VocabularyListSelector />);

    expect(screen.getByText('My Vocabulary Lists')).toBeInTheDocument();
    expect(screen.getByText('Common English Words')).toBeInTheDocument();
    expect(screen.getByText('Business Vocabulary')).toBeInTheDocument();
  });

  it('should display word count and study count', () => {
    render(<VocabularyListSelector />);

    const firstListText = screen.getByText(/8 words • Studied 5 times/);
    expect(firstListText).toBeInTheDocument();
  });

  it('should set current list when clicked', async () => {
    const user = userEvent.setup();
    render(<VocabularyListSelector />);

    const businessVocabButton = screen.getByText('Business Vocabulary');
    await user.click(businessVocabButton);

    expect(useVocabStore.getState().currentListId).toBe('list-2');
  });

  it('should highlight selected list', () => {
    render(<VocabularyListSelector />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveClass('border-blue-500', 'bg-blue-50');
  });
});
