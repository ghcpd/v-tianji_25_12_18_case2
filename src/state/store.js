import React, { createContext, useContext, useReducer } from 'react'
import { initialVocab } from './data'

const initialState = {
  vocab: initialVocab.map((v) => ({ ...v, progress: 0, difficult: false })),
  quiz: { active: false, index: 0, score: 0, mode: 'typing', session: [] },
  reviewQueue: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_DIFFICULT': {
      const vocab = state.vocab.map((w) => (w.id === action.id ? { ...w, difficult: !w.difficult } : w))
      const queue = vocab.filter((w) => w.difficult).map((w) => w.id)
      return { ...state, vocab, reviewQueue: queue }
    }
    case 'START_QUIZ': {
      const session = shuffle(state.vocab).slice(0, Math.min(5, state.vocab.length)).map((w) => w.id)
      return { ...state, quiz: { active: true, index: 0, score: 0, mode: action.mode || 'typing', session } }
    }
    case 'END_QUIZ':
      return { ...state, quiz: { ...state.quiz, active: false } }
    case 'SUBMIT_ANSWER': {
      const { correct } = action
      const vocab = state.vocab.map((w) => (w.id === state.quiz.session[state.quiz.index] ? { ...w, progress: Math.max(0, Math.min(100, w.progress + (correct ? 20 : -5))) } : w))
      const nextIndex = state.quiz.index + 1
      const finished = nextIndex >= state.quiz.session.length
      const quiz = { ...state.quiz, score: state.quiz.score + (correct ? 1 : 0), index: nextIndex, active: !finished }
      return { ...state, vocab, quiz }
    }
    case 'MARK_REVIEWED': {
      const vocab = state.vocab.map((w) => (w.id === action.id ? { ...w, difficult: false } : w))
      return { ...state, vocab, reviewQueue: vocab.filter((w) => w.difficult).map((w) => w.id) }
    }
    default:
      return state
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const StoreContext = createContext()

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  // avoid JSX here so file can remain .js without needing transform
  return React.createElement(StoreContext.Provider, { value: { state, dispatch } }, children)
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

export { reducer, initialState }
