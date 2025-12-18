import React from 'react'
import { useVocab } from '../state/vocab'

export default function ReviewView() {
  const { state, dispatch } = useVocab()
  const items = state.reviewQueue.map(id => state.words.find(w => w.id === id)!).filter(Boolean)

  if (items.length === 0) return <div>No review items</div>

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Review Queue</h2>
      <ul className="space-y-2">
        {items.map(w => (
          <li key={w.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-semibold">{w.term}</div>
              <div className="text-sm text-slate-500">{w.meaning}</div>
            </div>
            <div className="flex gap-2">
              <button className="btn" onClick={() => dispatch({ type: 'updateMastery', id: w.id, delta: 10 })}>Mark good</button>
              <button className="btn" onClick={() => dispatch({ type: 'removeFromReview', id: w.id })}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
