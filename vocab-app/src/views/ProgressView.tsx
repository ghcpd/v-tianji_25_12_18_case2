import React from 'react'
import { useVocab } from '../state/vocab'

export default function ProgressView() {
  const { state } = useVocab()
  const avg = Math.round(state.words.reduce((s, w) => s + w.mastery, 0) / Math.max(1, state.words.length))

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Progress</h2>
      <div className="p-4 border rounded">
        <div className="mb-2">Average mastery</div>
        <div className="w-full bg-slate-200 h-4 rounded overflow-hidden">
          <div className="h-4 bg-emerald-500" style={{ width: `${avg}%` }} />
        </div>
        <div className="mt-2 text-sm text-slate-600">{avg}%</div>
      </div>
    </div>
  )
}
