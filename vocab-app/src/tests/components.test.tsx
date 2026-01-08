import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('App smoke', () => {
  it('renders header and controls', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Vocab Trainer/i })).toBeInTheDocument()
    expect(screen.getAllByText('Word List').length).toBeGreaterThan(0)
  })
})
