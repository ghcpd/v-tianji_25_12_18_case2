import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { VocabProvider, useVocab, Word } from '../src/state/vocab'
import React from 'react'

function wrapper({ children }: any) {
  return <VocabProvider>{children}</VocabProvider>
}

describe('vocab state', () => {
  beforeEach(() => localStorage.clear())

  it('initializes with mock words', () => {
    const { result } = renderHook(() => useVocab(), { wrapper })
    expect(result.current.state.words.length).toBeGreaterThan(0)
  })

  it('marks word difficult', () => {
    const { result } = renderHook(() => useVocab(), { wrapper })
    const id = result.current.state.words[0].id
    act(() => result.current.dispatch({ type: 'markDifficult', id }))
    expect(result.current.state.words.find(w => w.id === id)?.difficult).toBe(true)
  })

  it('updates mastery and persists', () => {
    const { result } = renderHook(() => useVocab(), { wrapper })
    const id = result.current.state.words[0].id
    act(() => result.current.dispatch({ type: 'updateMastery', id, delta: 20 }))
    expect(result.current.state.words.find(w => w.id === id)?.mastery).toBeGreaterThan(0)
    // ensure localStorage persisted
    const raw = JSON.parse(localStorage.getItem('vocab-state')!)
    expect(raw.words[0].mastery).toBe(result.current.state.words[0].mastery)
  })

  it('adds and removes review items', () => {
    const { result } = renderHook(() => useVocab(), { wrapper })
    const id = result.current.state.words[0].id
    act(() => result.current.dispatch({ type: 'addToReview', id }))
    expect(result.current.state.reviewQueue.includes(id)).toBe(true)
    act(() => result.current.dispatch({ type: 'removeFromReview', id }))
    expect(result.current.state.reviewQueue.includes(id)).toBe(false)
  })
})
