import React from 'react'
import { useVocab } from './context/VocabContext'

export default function Review() {
  const { difficultWords, markLearned, markDifficult } = useVocab()

  if (difficultWords().length === 0) {
    return <div>No difficult words to review.</div>
  }

  return (
    <div>
      <h2>Review Difficult Words</h2>
      <ul>
        {difficultWords().map((w) => (
          <li key={w.id} data-testid="review-item">
            <strong>{w.word}</strong> — {w.definition}
            {w.example && <em> ({w.example})</em>}
            <div>
              <button onClick={() => markLearned(w.id)}>Mark Learned</button>
              <button onClick={() => markDifficult(w.id)}>Unmark Difficult</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
