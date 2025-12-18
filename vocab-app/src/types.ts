export type Word = {
  id: string
  term: string
  definition: string
  difficulty?: number // 0-5
  correctCount?: number
  seenCount?: number
}

export type AppState = {
  words: Word[]
  reviewQueue: string[]
}

export type Action =
  | { type: 'toggleDifficult'; id: string }
  | { type: 'answer'; id: string; correct: boolean }
  | { type: 'reset' }
