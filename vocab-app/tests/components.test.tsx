import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'
import React from 'react'

describe('App UI', () => {
  it('renders header and buttons', () => {
    render(<App />)
    expect(screen.getByText('Vocab Coach')).toBeTruthy()
    expect(screen.getByText('Word Lists')).toBeTruthy()
  })
})
