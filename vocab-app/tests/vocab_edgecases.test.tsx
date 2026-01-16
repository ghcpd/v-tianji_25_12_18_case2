import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { VocabProvider, useVocab } from '../src/state/vocab'
import React from 'react'

function wrapper({ children }: any) {
  return <VocabProvider>{children}</VocabProvider>
}

beforeEach(() => localStorage.clear())

describe('edge cases', () => {
  it('clamps mastery between 0 and 100', () => {
    const { result } = renderHook(() => useVocab(), { wrapper })
    const id = result.current.state.words[0].id
    act(() => result.current.dispatch({ type: 'updateMastery', id, delta: 1000 }))
    expect(result.current.state.words.find(w => w.id === id)?.mastery).toBe(100)
    act(() => result.current.dispatch({ type: 'updateMastery', id, delta: -1000 }))
    expect(result.current.state.words.find(w => w.id === id)?.mastery).toBe(0)
  })

  it('reset returns to initial mock state', () => {
    const { result } = renderHook(() => useVocab(), { wrapper })
    act(() => result.current.dispatch({ type: 'markDifficult', id: result.current.state.words[0].id }))
    act(() => result.current.dispatch({ type: 'reset' }))
    expect(result.current.state.reviewQueue.length).toBe(0)
    expect(result.current.state.words[0].difficult).toBeUndefined()
  })
})
