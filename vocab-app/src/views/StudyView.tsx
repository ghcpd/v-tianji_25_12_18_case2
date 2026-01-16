import React, { useState } from 'react'
import { useVocab } from '../state/vocab'

export default function StudyView() {
  const { state, dispatch } = useVocab()
  const [index, setIndex] = useState(0)
  const words = state.words
  if (words.length === 0) return <div>No words</div>
  const w = words[index]

  const flipNext = (delta: number) => {
    dispatch({ type: 'updateMastery', id: w.id, delta })
    setIndex(i => (i + 1) % words.length)
  }

  return (
    <div className="text-center">
      <h2 className="text-lg font-medium mb-3">Flashcards</h2>
      <div className="p-8 border rounded bg-slate-100">
        <div className="text-2xl font-semibold mb-2">{w.term}</div>
        <div className="text-slate-600 mb-4">{w.meaning}</div>
        <div className="flex gap-3 justify-center">
          <button className="btn" onClick={() => flipNext(-10)}>I forgot</button>
          <button className="btn" onClick={() => flipNext(10)}>I knew it</button>
        </div>
      </div>
    </div>
  )
}
