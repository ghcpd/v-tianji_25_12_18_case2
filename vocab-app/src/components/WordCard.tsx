import React from 'react'
import { Word } from '../types'
import { useStore } from '../state/store'

export default function WordCard({ word }: { word: Word }) {
  const { dispatch } = useStore()
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">{word.term}</div>
          <div className="text-sm text-gray-600">{word.definition}</div>
        </div>
        <div className="flex flex-col items-end">
          <button
            className={`px-2 py-1 text-sm rounded ${word.difficulty && word.difficulty > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100'}`}
            onClick={() => dispatch({ type: 'toggleDifficult', id: word.id })}
            aria-label={`toggle-difficult-${word.id}`}
          >
            {word.difficulty && word.difficulty > 0 ? 'Difficult' : 'Mark'}
          </button>
          <div className="text-xs text-gray-500 mt-2">Correct: {word.correctCount || 0}/{word.seenCount || 0}</div>
        </div>
      </div>
    </div>
  )
}
