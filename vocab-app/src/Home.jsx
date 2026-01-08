import React from 'react'
import { useVocab } from './context/VocabContext'

export default function Home() {
  const { words } = useVocab()
  const learnedCount = words.filter(w => w.learned).length
  const unlearnedCount = words.filter(w => !w.learned).length
  const difficultCount = words.filter(w => w.difficult).length

  return (
    <section>
      <h1>Welcome to Vocabulary Learner</h1>
      <p>Learn new words and track progress.</p>
      <div className="summary">
        <div>Learned: {learnedCount}</div>
        <div>Unlearned: {unlearnedCount}</div>
        <div>Difficult: {difficultCount}</div>
      </div>
    </section>
  )
}
