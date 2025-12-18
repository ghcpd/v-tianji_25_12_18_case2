import React from 'react'
import { useVocab } from '../state/vocab'

export default function WordList() {
  const { state, dispatch } = useVocab()

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Word List</h2>
      <ul className="space-y-2">
        {state.words.map(w => (
          <li key={w.id} className="flex items-center justify-between p-3 border rounded">
            <div>
              <div className="font-semibold">{w.term}</div>
              <div className="text-sm text-slate-500">{w.meaning}</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm">Mastery: {w.mastery}%</div>
              <button
                className={`px-2 py-1 border rounded ${w.difficult ? 'bg-rose-400 text-white' : ''}`}
                onClick={() => dispatch({ type: 'markDifficult', id: w.id })}
              >
                {w.difficult ? 'Difficult' : 'Mark Difficult'}
              </button>
              <button className="px-2 py-1 border rounded" onClick={() => dispatch({ type: 'addToReview', id: w.id })}>Add to Review</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
