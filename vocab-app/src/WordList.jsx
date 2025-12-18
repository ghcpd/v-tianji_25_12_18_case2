import React, { useState } from 'react'
import { useVocab } from './context/VocabContext'

export default function WordList() {
  const { words, addWord, markDifficult, markLearned } = useVocab()
  const [newWord, setNewWord] = useState('')
  const [definition, setDefinition] = useState('')
  const [example, setExample] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    if (newWord && definition) {
      addWord({ word: newWord, definition, example, difficult: false, learned: false })
      setNewWord('')
      setDefinition('')
      setExample('')
    }
  }

  return (
    <div>
      <h2>Word List</h2>
      <form onSubmit={handleAdd} className="add-form">
        <input placeholder="Word" value={newWord} onChange={(e) => setNewWord(e.target.value)} />
        <input placeholder="Definition" value={definition} onChange={(e) => setDefinition(e.target.value)} />
        <input placeholder="Example" value={example} onChange={(e) => setExample(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {words.map((w) => (
          <li key={w.id} data-testid="word-item">
            <strong>{w.word}</strong> — {w.definition}
            {w.example && <em> ({w.example})</em>}
            <div>
              <button onClick={() => markLearned(w.id)} disabled={w.learned}>
                {w.learned ? 'Learned' : 'Mark Learned'}
              </button>
              <button onClick={() => markDifficult(w.id)}>
                {w.difficult ? 'Unmark Difficult' : 'Mark Difficult'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
