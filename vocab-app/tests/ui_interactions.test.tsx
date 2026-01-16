import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../src/App'
import React from 'react'

beforeEach(() => localStorage.clear())

describe('UI interactions', () => {
  it('marks word difficult from list', () => {
    render(<App />)
    expect(screen.getByText('Word Lists')).toBeTruthy()
    // ensure Word List view
    fireEvent.click(screen.getByText('Word Lists'))
    const btn = screen.getAllByText(/Mark Difficult|Difficult/)[0]
    fireEvent.click(btn)
    // now the button should say Difficult
    expect(screen.getAllByText('Difficult')[0]).toBeTruthy()
  })

  it('adds to review and shows in review view', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Word Lists'))
    const addBtn = screen.getAllByText('Add to Review')[0]
    fireEvent.click(addBtn)
    fireEvent.click(screen.getByText('Review'))
    expect(screen.getByText('Review Queue')).toBeTruthy()
    expect(screen.getByText(/Remove/)).toBeTruthy()
  })

  it('study increases mastery stored in localStorage', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Study'))
    // initial mastery
    const raw = JSON.parse(localStorage.getItem('vocab-state') || '{}')
    const id = raw?.words?.[0]?.id
    const before = raw?.words?.[0]?.mastery
    fireEvent.click(screen.getByText('I knew it'))
    const afterRaw = JSON.parse(localStorage.getItem('vocab-state') || '{}')
    const after = afterRaw?.words?.find((w: any) => w.id === id)?.mastery
    expect(after).toBeGreaterThanOrEqual(before + 10)
  })
})
