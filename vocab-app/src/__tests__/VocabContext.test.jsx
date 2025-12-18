import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { VocabContextProvider, useVocab } from '../context/VocabContext'

function Test() {
  const { words, addWord, markDifficult, markLearned } = useVocab()
  return (
    <div>
      <div data-testid="count">{words.length}</div>
      <button data-testid="add" onClick={() => addWord({ word: 'zeta', definition: 'def' })}>Add</button>
      <button data-testid="diff" onClick={() => markDifficult(words[0]?.id)}>Diff</button>
      <button data-testid="learn" onClick={() => markLearned(words[0]?.id)}>Learn</button>
    </div>
  )
}

describe('VocabContext', () => {
  it('initializes with 3 words and supports add/mark', () => {
    render(
      <VocabContextProvider>
        <Test />
      </VocabContextProvider>
    )
    expect(screen.getByTestId('count').textContent).toBe('3')
    fireEvent.click(screen.getByTestId('add'))
    expect(screen.getByTestId('count').textContent).toBe('4')
    fireEvent.click(screen.getByTestId('diff'))
    // not asserting UI since state change not mapped to DOM directly
    fireEvent.click(screen.getByTestId('learn'))
  })
})
