import React, { createContext, useContext, useReducer, useEffect } from 'react'

export type Word = {
  id: string
  term: string
  meaning: string
  mastery: number // 0-100
  difficult?: boolean
}

export type State = {
  words: Word[]
  reviewQueue: string[]
}

const mockWords: Word[] = [
  { id: '1', term: 'apple', meaning: 'A fruit', mastery: 20 },
  { id: '2', term: 'house', meaning: 'A building', mastery: 40 },
  { id: '3', term: 'run', meaning: 'To move fast', mastery: 10 },
  { id: '4', term: 'blue', meaning: 'A color', mastery: 60 }
]

const initialState: State = {
  words: mockWords,
  reviewQueue: []
}

type Action =
  | { type: 'markDifficult'; id: string }
  | { type: 'updateMastery'; id: string; delta: number }
  | { type: 'addToReview'; id: string }
  | { type: 'removeFromReview'; id: string }
  | { type: 'reset' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'markDifficult':
      return {
        ...state,
        words: state.words.map(w => (w.id === action.id ? { ...w, difficult: !w.difficult } : w))
      }
    case 'updateMastery':
      return {
        ...state,
        words: state.words.map(w => (w.id === action.id ? { ...w, mastery: Math.max(0, Math.min(100, w.mastery + action.delta)) } : w))
      }
    case 'addToReview':
      return { ...state, reviewQueue: state.reviewQueue.includes(action.id) ? state.reviewQueue : [...state.reviewQueue, action.id] }
    case 'removeFromReview':
      return { ...state, reviewQueue: state.reviewQueue.filter(i => i !== action.id) }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const VocabContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined)

export function VocabProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, init => {
    try {
      const raw = localStorage.getItem('vocab-state')
      return raw ? (JSON.parse(raw) as State) : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem('vocab-state', JSON.stringify(state))
  }, [state])

  return <VocabContext.Provider value={{ state, dispatch }}>{children}</VocabContext.Provider>
}

export function useVocab() {
  const ctx = useContext(VocabContext)
  if (!ctx) throw new Error('useVocab must be used within VocabProvider')
  return ctx
}
