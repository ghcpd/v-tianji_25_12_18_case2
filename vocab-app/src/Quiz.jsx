import React, { useState, useEffect } from 'react'
import { useVocab } from './context/VocabContext'

export default function Quiz() {
  const { unlearnedWords, markLearned } = useVocab()
  const [words, setWords] = useState([])
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    setWords(unlearnedWords())
  }, [unlearnedWords])

  if (words.length === 0) {
    return <div>No words to quiz. Learn more words first.</div>
  }

  const current = words[index]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (answer.trim().toLowerCase() === current.word.toLowerCase()) {
      markLearned(current.id)
      setFeedback('Correct!')
    } else {
      setFeedback(`Incorrect. Answer: ${current.word}`)
    }
    setAnswer('')
    setTimeout(() => {
      setFeedback('')
      setIndex((i) => (i + 1) % words.length)
    }, 1000)
  }

  return (
    <div>
      <h2>Quiz</h2>
      <div data-testid="quiz-question">Definition: {current.definition}</div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Your answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {feedback && <div data-testid="quiz-feedback">{feedback}</div>}
    </div>
  )
}
