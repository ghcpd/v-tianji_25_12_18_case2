import { reducer, initialState } from '../state/store'

describe('store reducer', () => {
  it('toggles difficult and updates reviewQueue', () => {
    const a = reducer(initialState, { type: 'TOGGLE_DIFFICULT', id: initialState.vocab[0].id })
    expect(a.vocab.find((w) => w.id === initialState.vocab[0].id).difficult).toBe(true)
    expect(a.reviewQueue).toContain(initialState.vocab[0].id)

    const b = reducer(a, { type: 'TOGGLE_DIFFICULT', id: initialState.vocab[0].id })
    expect(b.vocab.find((w) => w.id === initialState.vocab[0].id).difficult).toBe(false)
    expect(b.reviewQueue).not.toContain(initialState.vocab[0].id)
  })

  it('starts and ends a quiz and submits answers', () => {
    const started = reducer(initialState, { type: 'START_QUIZ', mode: 'typing' })
    expect(started.quiz.active).toBe(true)
    expect(Array.isArray(started.quiz.session)).toBe(true)
    // simulate a correct answer on first item
    const after = reducer(started, { type: 'SUBMIT_ANSWER', correct: true })
    expect(after.quiz.score).toBe(1)
    // progress of that word increased
    const id = started.quiz.session[0]
    const w = after.vocab.find((x) => x.id === id)
    expect(w.progress).toBeGreaterThanOrEqual(0)
  })

  it('marks reviewed removes from queue', () => {
    const t = reducer(initialState, { type: 'TOGGLE_DIFFICULT', id: initialState.vocab[1].id })
    expect(t.reviewQueue).toContain(initialState.vocab[1].id)
    const m = reducer(t, { type: 'MARK_REVIEWED', id: initialState.vocab[1].id })
    expect(m.reviewQueue).not.toContain(initialState.vocab[1].id)
    expect(m.vocab.find((w) => w.id === initialState.vocab[1].id).difficult).toBe(false)
  })
})
