import { describe, it, expect } from 'vitest'
import { reducer, initialState } from '../state/store'

describe('store reducer', () => {
  it('toggles difficult', () => {
    const state = reducer(initialState, { type: 'toggleDifficult', id: '1' })
    expect(state.reviewQueue).toContain('1')
    const state2 = reducer(state, { type: 'toggleDifficult', id: '1' })
    expect(state2.reviewQueue).not.toContain('1')
  })

  it('records answers correctly', () => {
    const state = reducer(initialState, { type: 'answer', id: '2', correct: false })
    const w = state.words.find(w => w.id === '2')!
    expect(w.seenCount).toBe(1)
    expect(w.correctCount).toBe(0)
    expect(w.difficulty).toBeGreaterThan(0)
  })

  it('resets', () => {
    const state = reducer(initialState, { type: 'answer', id: '2', correct: false })
    const s2 = reducer(state, { type: 'reset' })
    expect(s2).toEqual(initialState)
  })
})
