import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { describe, it, expect } from 'vitest'

describe('Interactions', () => {
  it('mark word difficult from list and reflect in review', async () => {
    render(<App />)
    const markButtons = await screen.findAllByText('Mark')
    expect(markButtons.length).toBeGreaterThan(0)
    await userEvent.click(markButtons[0])
    // open Review (click the aside button explicitly)
    await userEvent.click(screen.getByRole('button', { name: 'Review' }))
    expect(await screen.findByText(/Difficulty:/)).toBeInTheDocument()
  })
})
