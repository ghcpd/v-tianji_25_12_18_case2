import React from 'react'
import { useStore } from '../state/store'

export default function WordList() {
  const { state, dispatch } = useStore()
  return (
    <div>
      <div className="controls">
        <button className="btn" onClick={() => dispatch({ type: 'START_QUIZ', mode: 'typing' })}>Start typing quiz</button>
        <button className="btn" onClick={() => dispatch({ type: 'START_QUIZ', mode: 'choices' })}>Start MCQ quiz</button>
        <div style={{ flex: 1 }} />
        <div className="small">{state.vocab.length} words</div>
      </div>

      <div className="list" data-testid="word-list">
        {state.vocab.map((w) => (
          <div key={w.id} className="word" data-testid={`word-${w.id}`}>
            <div>
              <div style={{ fontWeight: 700 }}>{w.word} <span className="small" style={{ marginLeft: 8 }}>{w.examples[0]}</span></div>
              <div className="meta">{w.meaning}</div>
            </div>

            <div className="kv">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>{w.progress}%</div>
                <div className="small">mastery</div>
              </div>

              <button
                aria-pressed={w.difficult}
                className={`btn smallbtn ${w.difficult ? 'primary' : ''}`}
                onClick={() => dispatch({ type: 'TOGGLE_DIFFICULT', id: w.id })}
              >
                {w.difficult ? 'Marked' : 'Mark difficult'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
