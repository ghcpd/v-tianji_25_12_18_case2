import React, { useState } from 'react'
import { useStore } from '../state/store'

export default function StudyView() {
  const { state, dispatch } = useStore()
  const [idx, setIdx] = useState(0)
  const words = state.words
  const w = words[idx]
  if (!w) return <div>No words</div>

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Study (Flashcards)</h2>
      <div className="card">
        <div className="text-2xl font-bold mb-2">{w.term}</div>
        <div className="text-gray-600 mb-4">{w.definition}</div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => setIdx((i) => Math.max(0, i - 1))}>
            Prev
          </button>
          <button
            className="px-3 py-2 bg-gray-100 rounded"
            onClick={() => setIdx((i) => Math.min(words.length - 1, i + 1))}
          >
            Next
          </button>
          <button
            className="px-3 py-2 bg-yellow-100 rounded"
            onClick={() => dispatch({ type: 'toggleDifficult', id: w.id })}
            aria-label="mark-difficult"
          >
            Toggle Difficult
          </button>
        </div>
      </div>
    </section>
  )
}
