import { create } from 'zustand';
import type { Word, VocabularyList, QuizSession, ProgressData, ReviewQueue } from '../types';
import { mockVocabularyLists } from '../data/mockData';

interface VocabStore {
  // Lists
  vocabularyLists: VocabularyList[];
  currentListId: string | null;
  addVocabularyList: (list: VocabularyList) => void;
  setCurrentList: (listId: string) => void;
  deleteVocabularyList: (listId: string) => void;

  // Words
  updateWord: (listId: string, word: Word) => void;
  toggleMarkWord: (listId: string, wordId: string) => void;
  getMarkedWords: (listId: string) => Word[];

  // Quiz
  currentQuiz: QuizSession | null;
  startQuiz: (listId: string, type: 'flashcard' | 'multipleChoice' | 'typing') => void;
  submitAnswer: (answer: string) => void;
  nextQuestion: () => void;
  endQuiz: () => void;

  // Progress
  progress: ProgressData | null;
  calculateProgress: (listId: string) => ProgressData;

  // Review Queue
  reviewQueues: ReviewQueue[];
  addToReviewQueue: (listId: string, words: Word[]) => void;
  completeReview: (queueId: string) => void;
}

export const useVocabStore = create<VocabStore>((set, get) => ({
  vocabularyLists: mockVocabularyLists,
  currentListId: mockVocabularyLists[0]?.id || null,
  currentQuiz: null,
  progress: null,
  reviewQueues: [],

  addVocabularyList: (list) =>
    set((state) => ({
      vocabularyLists: [...state.vocabularyLists, list],
    })),

  setCurrentList: (listId) =>
    set({
      currentListId: listId,
    }),

  deleteVocabularyList: (listId) =>
    set((state) => ({
      vocabularyLists: state.vocabularyLists.filter((list) => list.id !== listId),
    })),

  updateWord: (listId, word) =>
    set((state) => ({
      vocabularyLists: state.vocabularyLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              words: list.words.map((w) => (w.id === word.id ? word : w)),
            }
          : list
      ),
    })),

  toggleMarkWord: (listId, wordId) =>
    set((state) => ({
      vocabularyLists: state.vocabularyLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              words: list.words.map((w) =>
                w.id === wordId ? { ...w, isMarked: !w.isMarked } : w
              ),
            }
          : list
      ),
    })),

  getMarkedWords: (listId) => {
    const state = get();
    const list = state.vocabularyLists.find((l) => l.id === listId);
    return list ? list.words.filter((w) => w.isMarked) : [];
  },

  startQuiz: (listId, type) => {
    const state = get();
    const list = state.vocabularyLists.find((l) => l.id === listId);
    if (!list) return;

    const questions = list.words.map((word) => ({
      wordId: word.id,
      type: type as 'multipleChoice' | 'typing' | 'flashcard',
      question:
        type === 'flashcard'
          ? word.english
          : type === 'typing'
            ? `What is the English word for: ${word.translation}?`
            : `${word.english}: ${word.example}. What does it mean? (in Spanish)`,
      answer:
        type === 'typing'
          ? word.english
          : type === 'flashcard'
            ? word.translation
            : word.translation,
      options:
        type === 'multipleChoice'
          ? [
              word.translation,
              list.words[(list.words.indexOf(word) + 1) % list.words.length]
                .translation,
              list.words[(list.words.indexOf(word) + 2) % list.words.length]
                .translation,
            ].sort(() => Math.random() - 0.5)
          : undefined,
    }));

    set({
      currentQuiz: {
        id: `quiz-${Date.now()}`,
        listId,
        type,
        questions,
        currentIndex: 0,
        score: 0,
        completed: false,
      },
    });
  },

  submitAnswer: (answer) => {
    set((state) => {
      if (!state.currentQuiz) return state;

      const quiz = { ...state.currentQuiz };
      const currentQuestion = quiz.questions[quiz.currentIndex];
      const isCorrect =
        answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim();

      quiz.questions[quiz.currentIndex] = {
        ...currentQuestion,
        userAnswer: answer,
        isCorrect,
      };

      if (isCorrect) {
        quiz.score += 1;
      }

      return { currentQuiz: quiz };
    });
  },

  nextQuestion: () => {
    set((state) => {
      if (!state.currentQuiz) return state;

      const quiz = { ...state.currentQuiz };
      if (quiz.currentIndex < quiz.questions.length - 1) {
        quiz.currentIndex += 1;
      } else {
        quiz.completed = true;
      }

      return { currentQuiz: quiz };
    });
  },

  endQuiz: () => {
    set((state) => {
      if (state.currentQuiz) {
        const listId = state.currentQuiz.listId;
        const newVocabLists = state.vocabularyLists.map((list) =>
          list.id === listId ? { ...list, studiedCount: list.studiedCount + 1 } : list
        );
        return {
          vocabularyLists: newVocabLists,
          currentQuiz: null,
        };
      }
      return state;
    });
  },

  calculateProgress: (listId) => {
    const state = get();
    const list = state.vocabularyLists.find((l) => l.id === listId);

    if (!list) {
      return {
        listId,
        totalWords: 0,
        studiedWords: 0,
        masteredWords: 0,
        difficultWords: 0,
        avgScore: 0,
      };
    }

    const totalWords = list.words.length;
    const difficultWords = list.words.filter((w) => w.difficulty === 'hard').length;
    const masteredWords = list.words.filter((w) => w.difficulty === 'easy').length;
    const studiedWords = list.studiedCount;

    return {
      listId,
      totalWords,
      studiedWords,
      masteredWords,
      difficultWords,
      avgScore: studiedWords > 0 ? Math.round((masteredWords / totalWords) * 100) : 0,
      lastStudied: new Date(),
    };
  },

  addToReviewQueue: (listId, words) =>
    set((state) => ({
      reviewQueues: [
        ...state.reviewQueues,
        {
          id: `review-${Date.now()}`,
          words,
          lastReviewDate: new Date(),
          nextReviewDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      ],
    })),

  completeReview: (queueId) =>
    set((state) => ({
      reviewQueues: state.reviewQueues.filter((q) => q.id !== queueId),
    })),
}));
