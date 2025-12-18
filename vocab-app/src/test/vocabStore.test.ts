import { describe, it, expect, beforeEach } from 'vitest';
import { useVocabStore } from '../store/vocabStore';
import type { Word, VocabularyList } from '../types';

describe('Vocabulary Store', () => {
  beforeEach(() => {
    useVocabStore.setState({
      vocabularyLists: [],
      currentListId: null,
      currentQuiz: null,
      progress: null,
      reviewQueues: [],
    });
  });

  describe('List Management', () => {
    it('should add a vocabulary list', () => {
      const newList: VocabularyList = {
        id: 'test-list-1',
        name: 'Test Vocabulary',
        words: [],
        createdAt: new Date(),
        studiedCount: 0,
      };

      useVocabStore.getState().addVocabularyList(newList);
      const state = useVocabStore.getState();

      expect(state.vocabularyLists).toContainEqual(newList);
      expect(state.vocabularyLists.length).toBe(1);
    });

    it('should set current list', () => {
      const list: VocabularyList = {
        id: 'list-1',
        name: 'Test',
        words: [],
        createdAt: new Date(),
        studiedCount: 0,
      };

      useVocabStore.getState().addVocabularyList(list);
      useVocabStore.getState().setCurrentList('list-1');

      expect(useVocabStore.getState().currentListId).toBe('list-1');
    });

    it('should delete a vocabulary list', () => {
      const list: VocabularyList = {
        id: 'list-1',
        name: 'Test',
        words: [],
        createdAt: new Date(),
        studiedCount: 0,
      };

      useVocabStore.getState().addVocabularyList(list);
      useVocabStore.getState().deleteVocabularyList('list-1');

      expect(useVocabStore.getState().vocabularyLists).toHaveLength(0);
    });
  });

  describe('Word Management', () => {
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
        ],
        createdAt: new Date(),
        studiedCount: 0,
      };

      useVocabStore.getState().addVocabularyList(list);
      useVocabStore.getState().setCurrentList('list-1');
    });

    it('should update a word', () => {
      const updatedWord: Word = {
        id: 'word-1',
        english: 'Hello',
        translation: 'Hola Updated',
        partOfSpeech: 'interjection',
        example: 'Hello, world!',
        difficulty: 'medium',
        isMarked: false,
      };

      useVocabStore.getState().updateWord('list-1', updatedWord);
      const list = useVocabStore.getState().vocabularyLists[0];

      expect(list.words[0].translation).toBe('Hola Updated');
      expect(list.words[0].difficulty).toBe('medium');
    });

    it('should toggle mark word', () => {
      useVocabStore.getState().toggleMarkWord('list-1', 'word-1');
      let list = useVocabStore.getState().vocabularyLists[0];

      expect(list.words[0].isMarked).toBe(true);

      useVocabStore.getState().toggleMarkWord('list-1', 'word-1');
      list = useVocabStore.getState().vocabularyLists[0];

      expect(list.words[0].isMarked).toBe(false);
    });

    it('should get marked words', () => {
      useVocabStore.getState().toggleMarkWord('list-1', 'word-1');
      const markedWords = useVocabStore.getState().getMarkedWords('list-1');

      expect(markedWords).toHaveLength(1);
      expect(markedWords[0].id).toBe('word-1');
    });
  });

  describe('Quiz Management', () => {
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
            english: 'Goodbye',
            translation: 'Adiós',
            partOfSpeech: 'interjection',
            example: 'Goodbye, friend!',
            difficulty: 'easy',
            isMarked: false,
          },
        ],
        createdAt: new Date(),
        studiedCount: 0,
      };

      useVocabStore.getState().addVocabularyList(list);
    });

    it('should start a flashcard quiz', () => {
      useVocabStore.getState().startQuiz('list-1', 'flashcard');
      const quiz = useVocabStore.getState().currentQuiz;

      expect(quiz).not.toBeNull();
      expect(quiz?.type).toBe('flashcard');
      expect(quiz?.questions.length).toBe(2);
      expect(quiz?.currentIndex).toBe(0);
      expect(quiz?.score).toBe(0);
      expect(quiz?.completed).toBe(false);
    });

    it('should start a multiple choice quiz', () => {
      useVocabStore.getState().startQuiz('list-1', 'multipleChoice');
      const quiz = useVocabStore.getState().currentQuiz;

      expect(quiz).not.toBeNull();
      expect(quiz?.type).toBe('multipleChoice');
      expect(quiz?.questions[0].options).toBeDefined();
      expect(quiz?.questions[0].options?.length).toBe(3);
    });

    it('should start a typing quiz', () => {
      useVocabStore.getState().startQuiz('list-1', 'typing');
      const quiz = useVocabStore.getState().currentQuiz;

      expect(quiz).not.toBeNull();
      expect(quiz?.type).toBe('typing');
      expect(quiz?.questions.length).toBe(2);
    });

    it('should submit a correct answer', () => {
      useVocabStore.getState().startQuiz('list-1', 'flashcard');
      const initialQuestion = useVocabStore.getState().currentQuiz?.questions[0];

      useVocabStore.getState().submitAnswer(initialQuestion!.answer);
      const quiz = useVocabStore.getState().currentQuiz;

      expect(quiz?.questions[0].userAnswer).toBe(initialQuestion?.answer);
      expect(quiz?.questions[0].isCorrect).toBe(true);
      expect(quiz?.score).toBe(1);
    });

    it('should submit an incorrect answer', () => {
      useVocabStore.getState().startQuiz('list-1', 'flashcard');
      const initialQuestion = useVocabStore.getState().currentQuiz?.questions[0];

      useVocabStore.getState().submitAnswer('Wrong Answer');
      const quiz = useVocabStore.getState().currentQuiz;

      expect(quiz?.questions[0].userAnswer).toBe('Wrong Answer');
      expect(quiz?.questions[0].isCorrect).toBe(false);
      expect(quiz?.score).toBe(0);
    });

    it('should move to next question', () => {
      useVocabStore.getState().startQuiz('list-1', 'flashcard');
      expect(useVocabStore.getState().currentQuiz?.currentIndex).toBe(0);

      useVocabStore.getState().nextQuestion();
      expect(useVocabStore.getState().currentQuiz?.currentIndex).toBe(1);

      useVocabStore.getState().nextQuestion();
      const quiz = useVocabStore.getState().currentQuiz;
      expect(quiz?.completed).toBe(true);
    });

    it('should end quiz and increment studied count', () => {
      useVocabStore.getState().startQuiz('list-1', 'flashcard');
      const initialCount = useVocabStore.getState().vocabularyLists[0].studiedCount;

      useVocabStore.getState().endQuiz();

      const newCount = useVocabStore.getState().vocabularyLists[0].studiedCount;
      expect(newCount).toBe(initialCount + 1);
      expect(useVocabStore.getState().currentQuiz).toBeNull();
    });
  });

  describe('Progress Tracking', () => {
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

      useVocabStore.getState().addVocabularyList(list);
    });

    it('should calculate progress correctly', () => {
      const progress = useVocabStore.getState().calculateProgress('list-1');

      expect(progress.totalWords).toBe(2);
      expect(progress.masteredWords).toBe(1);
      expect(progress.difficultWords).toBe(1);
      expect(progress.studiedWords).toBe(2);
      expect(progress.avgScore).toBe(50);
    });

    it('should return zero progress for non-existent list', () => {
      const progress = useVocabStore.getState().calculateProgress('non-existent');

      expect(progress.totalWords).toBe(0);
      expect(progress.studiedWords).toBe(0);
      expect(progress.masteredWords).toBe(0);
      expect(progress.difficultWords).toBe(0);
      expect(progress.avgScore).toBe(0);
    });
  });

  describe('Review Queue', () => {
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
            difficulty: 'hard',
            isMarked: true,
          },
        ],
        createdAt: new Date(),
        studiedCount: 0,
      };

      useVocabStore.getState().addVocabularyList(list);
    });

    it('should add words to review queue', () => {
      const words = useVocabStore.getState().vocabularyLists[0].words;
      useVocabStore.getState().addToReviewQueue('list-1', words);

      const queues = useVocabStore.getState().reviewQueues;
      expect(queues).toHaveLength(1);
      expect(queues[0].words).toEqual(words);
    });

    it('should complete review and remove from queue', () => {
      const words = useVocabStore.getState().vocabularyLists[0].words;
      useVocabStore.getState().addToReviewQueue('list-1', words);

      let queues = useVocabStore.getState().reviewQueues;
      const queueId = queues[0].id;

      useVocabStore.getState().completeReview(queueId);
      queues = useVocabStore.getState().reviewQueues;

      expect(queues).toHaveLength(0);
    });
  });
});
