import React, { useState } from 'react'
import { useStore } from '../state/store'

function shuffle<T>(arr: T[]) {
  return arr.slice().sort(() => Math.random() - 0.5)
}

export default function QuizView() {
  const { state, dispatch } = useStore()
  const [idx, setIdx] = useState(0)
  const [choiceIdx, setChoiceIdx] = useState<number | null>(null)
  const words = state.words
  const w = words[idx]
  if (!w) return <div>No words</div>

  const choices = React.useMemo(() => {
    const others = words.filter(x => x.id !== w.id)
    const picked = shuffle([w.definition, ...others.slice(0, 3).map(o => o.definition)])
    return picked
  }, [w, words])

  function submit() {
    if (choiceIdx === null) return
    const correct = choices[choiceIdx] === w.definition
    dispatch({ type: 'answer', id: w.id, correct })
    setChoiceIdx(null)
    setIdx(i => (i + 1) % words.length)
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Quiz (Multiple choice)</h2>
      <div className="card">
        <div className="text-lg font-semibold mb-2">{w.term}</div>
        <div className="space-y-2 mb-3">
          {choices.map((c, i) => (
            <button
              key={i}
              className={`w-full text-left p-2 rounded ${choiceIdx === i ? 'bg-indigo-50' : 'bg-gray-50'}`}
              onClick={() => setChoiceIdx(i)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-gray-100 rounded" onClick={() => setIdx((i) => Math.max(0, i - 1))}>Prev</button>
          <button className="px-3 py-2 bg-indigo-500 text-white rounded" onClick={submit}>Submit</button>
        </div>
      </div>
    </section>
  )
}
