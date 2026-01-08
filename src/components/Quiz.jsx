import React, { useState } from 'react'
import { useStore } from '../state/store'

function getChoices(state, correctId) {
  const correct = state.vocab.find((w) => w.id === correctId)
  const others = state.vocab.filter((w) => w.id !== correctId)
  const choices = [correct, ...shuffle(others).slice(0, 3)].map((c) => ({ id: c.id, label: c.word }))
  return shuffle(choices)
}

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}

export default function Quiz() {
  const { state, dispatch } = useStore()
  const quiz = state.quiz
  const [input, setInput] = useState('')
  const [lastResult, setLastResult] = useState(null)

  if (!quiz.active) {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn primary" onClick={() => dispatch({ type: 'START_QUIZ', mode: 'typing' })}>Start Quiz</button>
        <button className="btn" onClick={() => dispatch({ type: 'START_QUIZ', mode: 'choices' })}>Start MCQ</button>
      </div>
    )
  }

  const currentId = quiz.session[quiz.index]
  const current = state.vocab.find((w) => w.id === currentId)
  const choices = quiz.mode === 'choices' ? getChoices(state, currentId) : null

  function submitAnswer(ans) {
    const correct = String(ans).trim().toLowerCase() === current.word.toLowerCase()
    setLastResult(correct)
    dispatch({ type: 'SUBMIT_ANSWER', correct })
    setInput('')
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontWeight: 700 }}>{current.word}</div>
        <div className="small">{current.meaning}</div>
        <div style={{ height: 8 }} />
        {quiz.mode === 'typing' ? (
          <div style={{ display: 'flex', gap: 8 }}>
            <input data-testid="quiz-input" className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type the word here" />
            <button className="btn" onClick={() => submitAnswer(input)}>Check</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            {choices.map((c) => (
              <button key={c.id} className="btn" onClick={() => submitAnswer(c.label)}>{c.label}</button>
            ))}
          </div>
        )}

        <div style={{ marginTop: 8 }}>
          <div className="small">Progress: {current.progress}% • Quiz {quiz.index + 1}/{quiz.session.length} • Score: {quiz.score}</div>
        </div>

        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => { dispatch({ type: 'END_QUIZ' }); setLastResult(null) }}>End</button>
          <button className="btn" onClick={() => dispatch({ type: 'TOGGLE_DIFFICULT', id: current.id })}>{current.difficult ? 'Unmark' : 'Mark difficult'}</button>
        </div>

        {lastResult !== null && (
          <div style={{ marginTop: 10 }} className="small">Last answer: {lastResult ? 'Correct' : 'Incorrect'}</div>
        )}
      </div>
    </div>
  )
}
