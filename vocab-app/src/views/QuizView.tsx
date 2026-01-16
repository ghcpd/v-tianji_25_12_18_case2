import React, { useState } from 'react'
import { useVocab } from '../state/vocab'

function shuffle<T>(arr: T[]) {
  return arr.slice().sort(() => Math.random() - 0.5)
}

export default function QuizView() {
  const { state, dispatch } = useVocab()
  const [round, setRound] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const words = shuffle(state.words)
  const w = words[round % words.length]

  const options = shuffle(
    [w.meaning].concat(
      ...shuffle(state.words.filter(x => x.id !== w.id).slice(0, 3)).map(x => x.meaning)
    )
  )

  const onChoose = (opt: string) => {
    setShowAnswer(true)
    if (opt === w.meaning) dispatch({ type: 'updateMastery', id: w.id, delta: 15 })
    else {
      dispatch({ type: 'updateMastery', id: w.id, delta: -10 })
      dispatch({ type: 'addToReview', id: w.id })
    }
    setTimeout(() => {
      setRound(r => r + 1)
      setShowAnswer(false)
    }, 600)
  }

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Multiple-choice Quiz</h2>
      <div className="p-6 border rounded">
        <div className="mb-4">What is the meaning of <span className="font-semibold">{w.term}</span>?</div>
        <div className="grid grid-cols-2 gap-3">
          {options.map(opt => (
            <button key={opt} className={`p-3 border rounded text-left ${showAnswer && (opt === w.meaning ? 'bg-emerald-200' : 'bg-rose-100')}`} onClick={() => onChoose(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
