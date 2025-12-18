export interface Word {
  id: string;
  english: string;
  translation: string;
  partOfSpeech: string;
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isMarked: boolean;
}

export interface VocabularyList {
  id: string;
  name: string;
  words: Word[];
  createdAt: Date;
  studiedCount: number;
}

export interface QuizSession {
  id: string;
  listId: string;
  type: 'flashcard' | 'multipleChoice' | 'typing';
  questions: QuizQuestion[];
  currentIndex: number;
  score: number;
  completed: boolean;
}

export interface QuizQuestion {
  wordId: string;
  type: 'multipleChoice' | 'typing' | 'flashcard';
  question: string;
  answer: string;
  options?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface ProgressData {
  listId: string;
  totalWords: number;
  studiedWords: number;
  masteredWords: number;
  difficultWords: number;
  avgScore: number;
  lastStudied?: Date;
}

export interface ReviewQueue {
  id: string;
  words: Word[];
  lastReviewDate: Date;
  nextReviewDate: Date;
}
