import React, { createContext, useContext, useReducer, Dispatch } from 'react'
import { AppState, Action } from '../types'
import { MOCK_WORDS } from '../data/mockWords'

const initialState: AppState = {
  words: MOCK_WORDS,
  reviewQueue: []
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'toggleDifficult': {
      const words = state.words.map(w =>
        w.id === action.id ? { ...w, difficulty: (w.difficulty || 0) > 0 ? 0 : 3 } : w
      )
      const reviewQueue = words.filter(w => (w.difficulty || 0) > 0).map(w => w.id)
      return { ...state, words, reviewQueue }
    }
    case 'answer': {
      const words = state.words.map(w => {
        if (w.id !== action.id) return w
        const seenCount = (w.seenCount || 0) + 1
        const correctCount = (w.correctCount || 0) + (action.correct ? 1 : 0)
        let difficulty = w.difficulty || 0
        if (!action.correct) difficulty = Math.min(5, difficulty + 1)
        else difficulty = Math.max(0, difficulty - 1)
        return { ...w, seenCount, correctCount, difficulty }
      })
      const reviewQueue = words.filter(w => (w.difficulty || 0) > 0).map(w => w.id)
      return { ...state, words, reviewQueue }
    }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const StoreContext = createContext<{ state: AppState; dispatch: Dispatch<Action> } | undefined>(undefined)

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

// Export reducer for tests
export { reducer, initialState }
