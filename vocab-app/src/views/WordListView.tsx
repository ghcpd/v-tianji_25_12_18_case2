import React from 'react'
import WordCard from '../components/WordCard'
import { useStore } from '../state/store'

export default function WordListView() {
  const { state } = useStore()
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">Word List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {state.words.map(w => (
          <WordCard key={w.id} word={w} />
        ))}
      </div>
    </section>
  )
}
