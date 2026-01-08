import React from 'react'
import { useStore } from '../state/store'

export default function ReviewView() {
  const { state } = useStore()
  const review = state.words.filter(w => (w.difficulty || 0) > 0)
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Review Queue</h2>
      {review.length === 0 ? (
        <div className="card">No difficult words. Great job! 🎉</div>
      ) : (
        <div className="grid gap-3">
          {review.map(w => (
            <div className="card" key={w.id}>
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{w.term}</div>
                  <div className="text-sm text-gray-600">{w.definition}</div>
                </div>
                <div className="text-sm text-red-600">Difficulty: {w.difficulty}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
