import React, { useState } from 'react'
import { useStore } from '../state/store'

export default function Flashcard() {
  const { state, dispatch } = useStore()
  const [i, setI] = useState(0)
  const items = state.vocab
  if (!items.length) return <div>No words</div>
  const w = items[i % items.length]
  return (
    <div className="flash">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <div className="kv">
          <div className="small">{i + 1}/{items.length}</div>
          <div style={{ width: 12 }} />
          <div className="small">Progress: {w.progress}%</div>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn smallbtn" onClick={() => setI((s) => Math.max(0, s - 1))}>Prev</button>
          <button className="btn smallbtn" onClick={() => setI((s) => s + 1)}>Next</button>
          <button className={`btn smallbtn ${w.difficult ? 'primary' : ''}`} onClick={() => dispatch({ type: 'TOGGLE_DIFFICULT', id: w.id })}>{w.difficult ? 'Marked' : 'Mark difficult'}</button>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <div className="wordbig">{w.word}</div>
        <div className="mean">{w.meaning}</div>
        <div style={{ height: 8 }} />
        <div className="small">{w.examples[0]}</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={() => dispatch({ type: 'START_QUIZ', mode: 'typing' })}>Practice (typing)</button>
        <button className="btn" onClick={() => dispatch({ type: 'START_QUIZ', mode: 'choices' })}>Practice (MCQ)</button>
      </div>
    </div>
  )
}
