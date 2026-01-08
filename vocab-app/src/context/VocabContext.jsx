import React, { createContext, useContext, useState } from 'react'

const VocabContext = createContext()

export function VocabContextProvider({ children }) {
  const [words, setWords] = useState([
    { id: 1, word: 'aberration', definition: 'a departure from what is normal', example: 'He is an aberration from the norm', difficult: false, learned: false },
    { id: 2, word: 'candid', definition: 'truthful and straightforward', example: 'She was candid about her mistakes', difficult: false, learned: false },
    { id: 3, word: 'draconian', definition: 'extremely harsh', example: 'The new laws were draconian', difficult: false, learned: false },
  ])

  const addWord = (word) => {
    setWords(prev => [...prev, { id: Date.now(), ...word }])
  }

  const markDifficult = (id) => {
    setWords(prev => prev.map(w => (w.id === id ? { ...w, difficult: !w.difficult } : w)))
  }

  const markLearned = (id) => {
    setWords(prev => prev.map(w => (w.id === id ? { ...w, learned: true } : w)))
  }

  const unlearnedWords = () => words.filter(w => !w.learned)

  const difficultWords = () => words.filter(w => w.difficult)

  return (
    <VocabContext.Provider value={{ words, addWord, markDifficult, markLearned, unlearnedWords, difficultWords }}>
      {children}
    </VocabContext.Provider>
  )
}

export function useVocab() {
  return useContext(VocabContext)
}
