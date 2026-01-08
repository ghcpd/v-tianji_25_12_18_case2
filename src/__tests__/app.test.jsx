import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('App integration', () => {
  it('renders app and can mark a word difficult and see it in review', () => {
    render(<App />)
    const list = screen.getByTestId('word-list')
    expect(list).toBeInTheDocument()
    const firstMark = screen.getAllByText(/Mark difficult/i)[0]
    fireEvent.click(firstMark)
    // now the review queue should show an item
    const review = screen.getByText(/Review Queue/i)
    expect(review).toBeInTheDocument()
    const inReview = screen.getAllByText(/Mark reviewed/i)[0]
    expect(inReview).toBeInTheDocument()
    fireEvent.click(inReview)
    // after marking reviewed the review list message appears
    expect(screen.getByText(/No items in review/i)).toBeInTheDocument()
  })

  it('can start a quiz and answer (typing mode)', () => {
    render(<App />)
    const start = screen.getAllByText(/Start Quiz/i)[0]
    fireEvent.click(start)
    const input = screen.getByTestId('quiz-input')
    // type an answer that is likely wrong
    fireEvent.change(input, { target: { value: 'nonsense' } })
    const check = screen.getByText(/Check/i)
    fireEvent.click(check)
    expect(screen.getByText(/Last answer:/i)).toBeInTheDocument()
  })
})
